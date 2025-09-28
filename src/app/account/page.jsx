"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "src/firebase.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const q = query(collection(db, "orders"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        const orderList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <section className="ordersPage mb-5">
      <div className="breadcrumbWrapper">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/account">My Account</Link></li>
            <li>Orders</li>
          </ul>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card shadow p-4">
          <h3>Order Tracking</h3>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date || "N/A"}</td>
                    <td>{order.status || "Pending"}</td>
                    <td>KSh {order.total || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
