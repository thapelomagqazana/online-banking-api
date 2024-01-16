import React, { useEffect, useState } from "react";

const ViewTransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch user's transactions from the server
        const fetchTransactions = async () => {
            try
            {
                const response = await fetch("http://localhost:5000/transaction/history", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
    
                if (response.ok)
                {
                    const data = await response.json();
                    setTransactions(data.transactions);
                }
                else{
                    // Handle authorized or expired token
                    // You can use the handleTokenExpiration function here
                }
            }
            catch (error)
            {
                console.error("Error fetching transactions: "+ error);
            }
        };
    
        fetchTransactions();
    }, []);

    
        return (
            <div>
                <h1>View Transactions</h1>
                {transactions.length === 0 ? (
                    <p>No transactions history</p>
                ) : (
                    <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                        {transaction.description} - ${transaction.amount}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        );
    };

export default ViewTransactionsPage;