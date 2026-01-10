# Zerodha Clone

A full-stack trading platform clone inspired by Zerodha, built with React and Node.js. This application provides a comprehensive trading dashboard with portfolio management, order tracking, holdings visualization, and real-time market data.

## 🚀 Features

### Frontend
- **Landing Page**: Modern, responsive landing page with hero section, pricing, education, and awards
- **User Authentication**: Secure signup and login with JWT token-based authentication
- **Dashboard**: 
  - Real-time market indices (NIFTY 50, SENSEX)
  - Portfolio overview with equity, holdings, and quick stats
  - Interactive watchlist with buy/sell functionality
  - Order management system
  - Holdings and positions tracking
- **Data Visualization**: 
  - Chart.js integration for holdings value distribution
  - Profit & Loss charts
  - Watchlist price trends and daily changes
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

### Backend
- **RESTful API**: Express.js backend with MongoDB
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: API endpoints secured with JWT middleware
- **Order Management**: Buy/sell order processing
- **Portfolio Tracking**: Holdings and positions management

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** 7.5.1 - Client-side routing
- **Chart.js** 4.5.1 & **react-chartjs-2** 5.3.1 - Data visualization
- **Material-UI** 7.0.2 - UI components
- **Axios** 1.8.4 - HTTP client
- **CSS3** - Styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.21.2 - Web framework
- **MongoDB** with **Mongoose** 8.13.2 - Database
- **JWT** (jsonwebtoken 9.0.2) - Authentication
- **bcryptjs** 3.0.2 - Password hashing
- **Joi** (@hapi/joi 17.1.1) - Input validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher, tested with v25.2.1)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB instance)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rimee2005/Zerodha-Clone.git
   cd Zerodha-Clone
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Example:**
```env
PORT=3002
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/zerodha?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=https://zerodhaclone-backend-zzco.onrender.com
```

For local development:
```env
REACT_APP_API_URL=http://localhost:3002
```

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. **Important for Deployment**: Whitelist IP address `0.0.0.0/0` in Network Access to allow connections from anywhere (required for cloud deployments like Render)
5. Update `MONGO_URL` in `.env`

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:3002`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend in Production**
   ```bash
   cd backend
   npm start
   # or
   npm run prod
   ```

## 🌐 Deployment

### Live Backend
Backend is deployed at: **https://zerodhaclone-backend-zzco.onrender.com/**

### Deploying to Render

#### Backend Deployment
1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: `Node`
4. Add Environment Variables:
   - `PORT` (Render will set this automatically, but you can override)
   - `MONGO_URL` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Your JWT secret key
5. **Important**: In MongoDB Atlas, whitelist `0.0.0.0/0` in Network Access to allow Render's IPs

#### Frontend Deployment
1. Create a new **Static Site** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
4. Add Environment Variable:
   - `REACT_APP_API_URL` - Your backend URL (e.g., `https://zerodhaclone-backend-zzco.onrender.com`)

### MongoDB Atlas Configuration for Deployment
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Network Access**
3. Click **Add IP Address**
4. For cloud deployments, add `0.0.0.0/0` to allow all IPs (or add specific Render IPs)
5. Click **Confirm**

## 📡 API Endpoints

### Base URL
- **Production**: `https://zerodhaclone-backend-zzco.onrender.com`
- **Development**: `http://localhost:3002`

### Authentication
- `POST /api/user/register` - Register a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- `POST /api/user/login` - Login user
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- `GET /api/user/verify` - Verify JWT token (Protected)

### Protected Routes (Require JWT Token)
All protected routes require JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

- `GET /api/holdings` - Get user holdings
- `GET /api/positions` - Get user positions
- `GET /api/orders` - Get user orders
- `POST /api/newOrder` - Create new order (Buy/Sell)
  ```json
  {
    "name": "string",
    "qty": "number",
    "price": "number",
    "mode": "BUY" | "SELL"
  }
  ```

## 📁 Project Structure

```
ZerodhaClone/
├── backend/
│   ├── index.js              # Main server file
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── model/                # Mongoose models
│   │   ├── user.js
│   │   ├── HoldingsModel.js
│   │   ├── OrdersModel.js
│   │   └── PositionsModel.js
│   ├── routes/
│   │   └── auth.js           # Authentication routes
│   ├── schemas/              # Mongoose schemas
│   ├── validation.js        # Input validation schemas
│   └── package.json
│
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── Holdings.js
│   │   │   ├── Orders.js
│   │   │   ├── WatchList.js
│   │   │   └── ...
│   │   ├── landing_page/     # Landing page components
│   │   ├── data/             # Static data
│   │   ├── config/           # Configuration files
│   │   │   └── api.js        # API base URL configuration
│   │   ├── index.js          # App entry point
│   │   └── index.css         # Global styles
│   └── package.json
│
└── README.md
```

## 🔐 Authentication Flow

1. User registers/logs in through frontend
2. Backend validates credentials and generates JWT token
3. Frontend stores token in localStorage
4. Token is sent in `Authorization` header for protected routes
5. Backend middleware verifies token before processing requests

## 📊 Features in Detail

### Dashboard
- **Summary Page**: Overview of equity, holdings, and quick stats
- **Orders**: View and track all buy/sell orders
- **Holdings**: Portfolio holdings with charts (value distribution, P&L)
- **Positions**: Current trading positions
- **Funds**: Available funds and margin
- **Watchlist**: Stock watchlist with price trends and charts

### Charts
- **Holdings Charts**: 
  - Doughnut chart for value distribution
  - Bar chart for profit & loss analysis
- **Watchlist Charts**:
  - Line chart for price trends
  - Bar chart for daily percentage changes

## 🐛 Troubleshooting

### MongoDB Connection Issues
- **For Local Development**: Ensure your IP is whitelisted in MongoDB Atlas
- **For Deployment (Render)**: Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Verify the connection string in `.env` or Render environment variables
- Check if the cluster is running
- Ensure username and password in connection string are correct

### Port Already in Use
```bash
# Find process using port 3002
lsof -ti:3002

# Kill the process
kill -9 <process_id>
```

### Render Deployment Issues
- **No open ports detected**: Ensure server binds to `0.0.0.0` (already configured)
- **MongoDB connection fails**: Whitelist `0.0.0.0/0` in MongoDB Atlas
- **Environment variables**: Ensure all variables are set in Render dashboard
- **Build fails**: Check build logs in Render dashboard

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env` or Render environment variables
- Check token expiration (default: 7 days)
- Verify token is sent in correct header format: `Authorization: Bearer <token>`

### Frontend API Connection Issues
- Ensure `REACT_APP_API_URL` is set in frontend `.env` file
- For production, use the deployed backend URL: `https://zerodhaclone-backend-zzco.onrender.com`
- Check browser console for CORS errors
- Verify backend is running and accessible

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Rimjhim**
- GitHub: [@Rimee2005](https://github.com/Rimee2005)

## 🙏 Acknowledgments

- Inspired by [Zerodha](https://zerodha.com/)
- Built with React and Node.js
- Charts powered by Chart.js

---

**Note**: This is a clone project for educational purposes. Not affiliated with Zerodha.
