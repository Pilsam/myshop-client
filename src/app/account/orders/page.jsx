"use client";
import React from "react";
import Link from "next/link";

const OrdersPage = () => {
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
          <p>Here you can see all your orders and their status.</p>
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
              <tr>
                <td>#12345</td>
                <td>2025-09-08</td>
                <td>Delivered</td>
                <td>KSh 2,500</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>2025-09-07</td>
                <td>Processing</td>
                <td>KSh 5,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
