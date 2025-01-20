import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:5224/api/Wishlist/GetWishlist/${userId}`);

        setWishlist(response.data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  });

  const addToWishlist = async (item) => {
    if (!userId) return;
    try {
      const response = await axios.post(`http://localhost:5224/api/Wishlist/AddToWishlist/${userId}`, item);
      setWishlist((prev) => [...prev, response.data]); // Append the newly added item
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    if (!userId) return;
    try {
      await axios.delete(`http://localhost:5224/api/Wishlist/RemoveFromWishlist/${userId}/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
