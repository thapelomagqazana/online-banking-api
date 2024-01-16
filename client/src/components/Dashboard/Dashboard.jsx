import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        // Fetch user's account balance from the server
        const fetchBalance = async () => {
            try
            {   const token = localStorage.getItem("authToken");
                
                const response = await fetch("http://localhost:5000/account/balance", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok)
                {
                    const balanceData = await response.json();
                    setBalance(balanceData.balance);
                }
                else 
                {
                    console.error('Failed to fetch account balance:', response.status);
                    // Handle error case, setBalance to an appropriate default value
                    setBalance(0);   
                }
            }
            catch (error)
            {
                console.error('Error during account balance fetch:', error.message);
                // Handle error case, setBalance to an appropriate default value
                setBalance(0);
            }
        };
        fetchBalance();

    }, []); // Empty dependency array to run the effect only once on component mount

    return (
      <div className="dashboard">
        {/* Account Balance Section */}
        <div className="account-balance">
          <h2>Account Balance</h2>
          {balance !== null ? (
                <p>R {balance}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
  
        {/* Quick Links Section */}
        <div className="quick-links">
          <h2>Quick Links</h2>
        
          <Link to="/view-transactions"><button className="quick-link-button">View Transactions</button></Link>
            
{/* //             <li> */}
{/* //               <Link to="/transfer-funds">Transfer Funds</Link>
//             </li>
//             <li>
//               <Link to="/pay-bills">Pay Bills</Link>
//             </li> */}
          {/* <button className="quick-link-button">Transfer Money</button>
          <button className="quick-link-button">Pay Bills</button> */}
          {/* Add more quick links as needed */}
        </div>
  
        {/* Notifications Section */}
        <div className="notifications">
          <h2>Notifications</h2>
          <div className="notification-item">
            <p>New Transaction: $100.00 received</p>
            <span className="notification-badge">New</span>
          </div>
          <div className="notification-item">
            <p>Payment due for Credit Card</p>
            <span className="notification-badge">Due</span>
          </div>
          {/* Add more notification items as needed */}
        </div>
  
        {/* Data Visualization (Example: Bar Chart) */}
        <div className="bar-chart">
          {/* Placeholder for data visualization component */}
          {/* You can integrate a chart library or your custom visualization here */}
        </div>
      </div>
    );
    // return (
    //     <div className="dashboard">
    //       <header>
    //         <h1>Dashboard</h1>
    //       </header>
    //       <main>
    //         <section>
    //           <h2>Account Balance</h2>
    //           {balance !== null ? (
    //             <p>R {balance}</p>
    //         ) : (
    //             <p>Loading...</p>
    //         )}
    //         </section>
    //         <section>
    //           <h2>Quick Links</h2>
    //           <ul>
    //             <li>
    //               <Link to="/transactions">View Transactions</Link>
    //             </li>
    //             <li>
    //               <Link to="/transfer-funds">Transfer Funds</Link>
    //             </li>
    //             <li>
    //               <Link to="/pay-bills">Pay Bills</Link>
    //             </li>
    //           </ul>
    //         </section>
    //         <section>
    //           <h2>Notifications</h2>
    //           <p>No new notifications</p>
    //         </section>
    //       </main>
    //     </div>
    //   );
};

export default Dashboard;