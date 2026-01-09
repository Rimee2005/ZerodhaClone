import React from "react";

const Summary = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";

  return (
    <div style={{ padding: "0" }}>
      <div className="username" style={{ marginBottom: "32px" }}>
        <h2 style={{ 
          fontSize: "1.75rem", 
          fontWeight: "600", 
          color: "#212529", 
          margin: "0 0 8px 0" 
        }}>
          Hi, {username}! 👋
        </h2>
        <p style={{ color: "#6c757d", fontSize: "0.9rem", margin: 0 }}>
          Here's your portfolio overview
        </p>
        <hr className="divider" style={{ marginTop: "16px" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {/* Equity Card */}
        <div className="section" style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ 
              fontSize: "0.75rem", 
              fontWeight: "600", 
              textTransform: "uppercase", 
              letterSpacing: "0.5px",
              opacity: 0.9,
              margin: "0 0 8px 0"
            }}>
              Equity
            </p>
          </div>
          <div className="data">
            <div className="first" style={{ marginBottom: "20px" }}>
              <h3 style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700", 
                color: "white",
                margin: "0 0 8px 0"
              }}>
                ₹3.74k
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem", margin: 0 }}>
                Margin available
              </p>
            </div>
            <div className="second" style={{ 
              paddingTop: "16px", 
              borderTop: "1px solid rgba(255, 255, 255, 0.2)" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "0.875rem" }}>
                  Margins used
                </p>
                <span style={{ fontWeight: "600", color: "white" }}>₹0</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "0.875rem" }}>
                  Opening balance
                </p>
                <span style={{ fontWeight: "600", color: "white" }}>₹3.74k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Card */}
        <div className="section" style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ 
              fontSize: "0.75rem", 
              fontWeight: "600", 
              textTransform: "uppercase", 
              letterSpacing: "0.5px",
              opacity: 0.9,
              margin: "0 0 8px 0"
            }}>
              Holdings (13)
            </p>
          </div>
          <div className="data">
            <div className="first" style={{ marginBottom: "20px" }}>
              <h3 style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700", 
                color: "white",
                margin: "0 0 8px 0"
              }}>
                ₹1.55k <small style={{ fontSize: "1rem", opacity: 0.9 }}>+5.20%</small>
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem", margin: 0 }}>
                P&L
              </p>
            </div>
            <div className="second" style={{ 
              paddingTop: "16px", 
              borderTop: "1px solid rgba(255, 255, 255, 0.2)" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "0.875rem" }}>
                  Current Value
                </p>
                <span style={{ fontWeight: "600", color: "white" }}>₹31.43k</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "0.875rem" }}>
                  Investment
                </p>
                <span style={{ fontWeight: "600", color: "white" }}>₹29.88k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="section" style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ 
              fontSize: "0.75rem", 
              fontWeight: "600", 
              textTransform: "uppercase", 
              letterSpacing: "0.5px",
              opacity: 0.9,
              margin: "0 0 8px 0"
            }}>
              Quick Stats
            </p>
          </div>
          <div className="data">
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "0.875rem" }}>
                  Total Orders
                </p>
                <span style={{ fontWeight: "600", color: "white", fontSize: "1.1rem" }}>24</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "0.875rem" }}>
                  Active Positions
                </p>
                <span style={{ fontWeight: "600", color: "white", fontSize: "1.1rem" }}>5</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "0.875rem" }}>
                  Watchlist
                </p>
                <span style={{ fontWeight: "600", color: "white", fontSize: "1.1rem" }}>13/50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;