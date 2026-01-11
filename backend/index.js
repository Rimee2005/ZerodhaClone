// Polyfill for SlowBuffer (removed in Node.js v25+)
if (typeof Buffer.SlowBuffer === 'undefined') {
  Buffer.SlowBuffer = Buffer;
}

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;


const app = express();

const authRoute = require('./routes/auth');
const verifyToken = require('./middleware/auth');

// CORS configuration - allow all origins for development and production
app.use(cors({
  origin: '*', // Allow all origins (you can restrict this to specific domains in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true
}));
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/user', authRoute);


// ---------- GET Holdings (Protected) ----------
app.get("/api/holdings", verifyToken, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find();
    res.json(holdings);
  } catch (error) {
    console.error("❌ Error fetching holdings:", error);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// ---------- GET Positions (Protected) ----------
app.get("/api/positions", verifyToken, async (req, res) => {
  try {
    const positions = await PositionsModel.find();
    res.json(positions);
  } catch (err) {
    console.error("❌ Error fetching positions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------- POST New Order (Buy/Sell) (Protected) ----------
app.post('/api/newOrder', verifyToken, async (req, res) => {
  const { name, qty, price, mode } = req.body;
  
  console.log("📥 New order request received");
  console.log("📥 Request body:", { name, qty, price, mode });
  console.log("📥 User from token:", req.user);
  console.log("📥 User ID:", req.user?.userId || req.user?.id);

  // Validation
  if (!name || !qty || !price || !mode) {
    console.error("❌ Validation failed: Missing required fields");
    return res.status(400).json({ 
      error: "Missing required fields",
      message: "Name, quantity, price, and mode are required"
    });
  }

  if (qty <= 0 || price <= 0) {
    console.error("❌ Validation failed: Invalid values");
    return res.status(400).json({ 
      error: "Invalid values",
      message: "Quantity and price must be greater than 0"
    });
  }

  // Validate and normalize mode
  const upperMode = mode.toUpperCase();
  if (!['BUY', 'SELL'].includes(upperMode)) {
    return res.status(400).json({ 
      error: "Invalid mode",
      message: "Mode must be either 'BUY' or 'SELL'"
    });
  }

  try {
    // Verify OrdersModel is a constructor before using it
    if (typeof OrdersModel !== 'function') {
      console.error("❌ OrdersModel is not a constructor. Type:", typeof OrdersModel);
      throw new Error("OrdersModel initialization error. Please restart the server.");
    }

    // Step 1: Save Order
    console.log("💾 Creating new order...");
    const newOrder = new OrdersModel({ 
      name: name.trim().toUpperCase(), 
      qty: parseFloat(qty), 
      price: parseFloat(price), 
      mode: upperMode 
    });
    await newOrder.save();
    console.log("✅ Order saved successfully:", newOrder._id);

    // Step 2: BUY Mode - Update Holdings
    if (upperMode === "BUY") {
      let existing = await HoldingsModel.findOne({ name: name.trim().toUpperCase() });

      if (existing) {
        const totalQty = existing.qty + parseFloat(qty);
        const totalInvestment = (existing.qty * existing.avg) + (parseFloat(qty) * parseFloat(price));
        const newAvg = totalInvestment / totalQty;

        existing.qty = totalQty;
        existing.avg = newAvg;
        existing.price = parseFloat(price);

        await existing.save();
        console.log("🟢 Updated existing holding:", existing.name);
      } else {
        const newHolding = new HoldingsModel({
          name: name.trim().toUpperCase(),
          qty: parseFloat(qty),
          avg: parseFloat(price),
          price: parseFloat(price),
          net: "+0.00%",
          day: "+0.00%",
        });

        await newHolding.save();
        console.log("🆕 New holding created:", newHolding.name);
      }

    // Step 3: SELL Mode - Update Holdings
    } else if (upperMode === "SELL") {
      let existing = await HoldingsModel.findOne({ name: name.trim().toUpperCase() });

      if (!existing) {
        return res.status(404).json({ 
          error: "Holding not found",
          message: "Cannot sell. You don't have this stock in your holdings."
        });
      }

      if (parseFloat(qty) > existing.qty) {
        return res.status(400).json({ 
          error: "Insufficient quantity",
          message: `Cannot sell ${qty} shares. You only have ${existing.qty} shares.`
        });
      }

      const remainingQty = existing.qty - parseFloat(qty);

      if (remainingQty === 0) {
        await HoldingsModel.deleteOne({ name: name.trim().toUpperCase() });
        console.log(`🗑️ Entire holding sold and deleted: ${name}`);
      } else {
        const totalInvestment = (existing.qty * existing.avg) - (parseFloat(qty) * parseFloat(price));
        const newAvg = totalInvestment / remainingQty;

        existing.qty = remainingQty;
        existing.avg = newAvg;
        existing.price = parseFloat(price);

        await existing.save();
        console.log("🔻 Holding after sell updated:", existing.name);
      }
    }

    // Success response
    res.status(200).json({ 
      message: "Order placed and holdings updated successfully",
      order: {
        id: newOrder._id,
        name: newOrder.name,
        qty: newOrder.qty,
        price: newOrder.price,
        mode: newOrder.mode,
        createdAt: newOrder.createdAt
      },
      mode: upperMode
    });
  } catch (error) {
    console.error("🔥 Error in /newOrder endpoint:");
    console.error("🔥 Error name:", error.name);
    console.error("🔥 Error message:", error.message);
    console.error("🔥 Error stack:", error.stack);
    
    // More detailed error information
    if (error.name === 'ValidationError') {
      console.error("🔥 Validation errors:", error.errors);
      return res.status(400).json({ 
        error: "Validation error",
        message: error.message,
        details: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }
    
    if (error.name === 'MongoServerError' || error.name === 'MongoError') {
      console.error("🔥 MongoDB error code:", error.code);
      return res.status(500).json({ 
        error: "Database error",
        message: "Failed to save order to database",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    res.status(500).json({ 
      error: "Server error while processing order",
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ---------- GET Orders (Protected) ----------
app.get("/api/orders", verifyToken, async (req, res) => {
  try {
    console.log("📥 Fetching orders for user:", req.user?.id);
    
    // Check if OrdersModel is properly initialized
    if (!OrdersModel) {
      console.error("❌ OrdersModel is not initialized");
      return res.status(500).json({ error: "OrdersModel not initialized" });
    }
    
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(500).json({ error: "Database not connected" });
    }
    
    const orders = await OrdersModel.find().sort({ createdAt: -1 });
    console.log("✅ Found orders:", orders.length);
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    console.error("❌ Error stack:", err.stack);
    console.error("❌ Error name:", err.name);
    console.error("❌ Error message:", err.message);
    res.status(500).json({ 
      error: "Server error while fetching orders",
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});


// ---------- DB Connection + Server Start ----------
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected");
    // Bind to 0.0.0.0 for Render and other cloud platforms
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("\n📋 Troubleshooting steps:");
    console.error("1. Check if your IP address is whitelisted in MongoDB Atlas");
    console.error("   Go to: https://cloud.mongodb.com → Network Access → Add IP Address");
    console.error("   For development/deployment, you can temporarily allow all IPs: 0.0.0.0/0");
    console.error("2. Verify your MONGO_URL in .env file is correct");
    console.error("3. Check your internet connection");
    console.error("4. Ensure your MongoDB Atlas cluster is running");
    console.error("5. For Render deployment, ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)\n");
    // Don't exit in production - let the server try to reconnect
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  });


// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
//     { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
//     { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
//     { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
//     { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
//     { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
//     { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
//     { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
//     { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
//     { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
//     { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
//     { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
//     { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
//   ];

//   try {
//     for (const item of tempHoldings) {
//       let newHolding = new HoldingsModel({
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//         isLoss: item.isLoss !== undefined ? item.isLoss : item.net.startsWith("-"),
//       });
//     //   await newHolding.save(); 
//     }
//     res.send("✅ Holdings added successfully!");
//   } catch (error) {
//     console.error("❌ Error adding holdings:", error);
//     res.status(500).send("Error saving holdings");
//   }
// });


// app.get("/addPositions", async (req, res) => {
//     let tempPositions = [
//       {
//         product: "CNC",
//         name: "EVEREADY",
//         qty: 2,
//         avg: 316.27,
//         price: 312.35,
//         net: "+0.58%",
//         day: "-1.24%",
//         isLoss: true,
//       },
//       {
//         product: "CNC",
//         name: "JUBLFOOD",
//         qty: 1,
//         avg: 3124.75,
//         price: 3082.65,
//         net: "+10.04%",
//         day: "-1.35%",
//         isLoss: true,
//       },
//     ];
  
//     try {
//       for (const item of tempPositions) {
//         let newPosition = new PositionsModel({
//           product: item.product, // ✅ Include 'product'
//           name: item.name,
//           qty: item.qty,
//           avg: item.avg,
//           price: item.price,
//           net: item.net,
//           day: item.day,
//           isLoss: item.isLoss,
//         });
//         await newPosition.save(); // ✅ Save data to DB
//       }
//       res.send("✅ Positions added successfully!");
//     } catch (err) {
//       console.error("❌ Error adding positions:", err);
//       res.status(500).send("❌ Server error, check logs.");
//     }
//   });
  