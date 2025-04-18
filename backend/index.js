require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const {User} = require("./model/user");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;


const app = express();

app.use(cors());
app.use(bodyParser.json());

// 

// ---------- POST Signup ----------
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ username, email, password }); // You can add bcrypt later for hashing
    await newUser.save();

    // Response can include user info or token
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Server error during signup" });
  }
});

//Login 
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});


// ---------- GET Holdings ----------
app.get("/api/holdings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find();
    res.json(holdings);
  } catch (error) {
    console.error("❌ Error fetching holdings:", error);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// ---------- GET Positions ----------
app.get("/api/positions", async (req, res) => {
  try {
    const positions = await PositionsModel.find();
    res.json(positions);
  } catch (err) {
    console.error("❌ Error fetching positions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------- POST New Order (Buy/Sell) ----------
app.post('/api/newOrder', async (req, res) => {
  const { name, qty, price, mode } = req.body;

  try {
    // Step 1: Save Order
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();
    console.log("📥 New order saved:", newOrder);

    // Step 2: BUY Mode
    if (mode === "BUY") {
      let existing = await HoldingsModel.findOne({ name });

      if (existing) {
        const totalQty = existing.qty + qty;
        const totalInvestment = (existing.qty * existing.avg) + (qty * price);
        const newAvg = totalInvestment / totalQty;

        existing.qty = totalQty;
        existing.avg = newAvg;
        existing.price = price;

        await existing.save();
        console.log("🟢 Updated existing holding:", existing);
      } else {
        const newHolding = new HoldingsModel({
          name,
          qty,
          avg: price,
          price,
          net: "+0.00%",
          day: "+0.00%",
        });

        await newHolding.save();
        console.log("🆕 New holding created:", newHolding);
      }

    // Step 3: SELL Mode
    } else if (mode === "SELL") {
      let existing = await HoldingsModel.findOne({ name });

      if (!existing) {
        console.log("❌ Cannot sell. Holding not found.");
        return res.status(404).send("❌ Holding not found to sell.");
      }

      if (qty > existing.qty) {
        return res.status(400).send("❌ Cannot sell more than you hold.");
      }

      const remainingQty = existing.qty - qty;

      if (remainingQty === 0) {
        await HoldingsModel.deleteOne({ name });
        console.log(`🗑️ Entire holding sold and deleted: ${name}`);
      } else {
        const totalInvestment = (existing.qty * existing.avg) - (qty * price);
        const newAvg = totalInvestment / remainingQty;

        existing.qty = remainingQty;
        existing.avg = newAvg;
        existing.price = price;

        await existing.save();
        console.log("🔻 Holding after sell updated:", existing);
      }
    }

    res.send("✅ Order placed and holdings updated.");
  } catch (error) {
    console.error("🔥 Error in /newOrder:", error);
    res.status(500).send("❌ Server error while processing order.");
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
});


// ---------- DB Connection + Server Start ----------
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
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
  