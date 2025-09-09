"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;

      try {
        const q = query(collection(db, "wishlist"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        const wishListData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setWishlist(wishListData);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [userId]);

  const removeFromWishlist = async (itemId) => {
    try {
      await deleteDoc(doc(db, "wishlist", itemId));
      setWishlist(wishlist.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <section className="wishlistPage mb-5">
      <div className="breadcrumbWrapper">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/account">My Account</Link></li>
            <li>Wishlist</li>
          </ul>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card shadow p-4">
          <h3>My Wishlist</h3>

          {wishlist.length === 0 ? (
            <p>No items in wishlist.</p>
          ) : (
            <ul className="list-group">
              {wishlist.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.productName}
                  <button className="btn btn-sm btn-danger" onClick={() => removeFromWishlist(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;
