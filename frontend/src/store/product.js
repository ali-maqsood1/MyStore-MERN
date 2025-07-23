import { create } from "zustand";
import api from "../utils/api";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch products");
      }

      set({ products: data.data });
      console.log("✅ Fetched products:", data.data);
    } catch (err) {
      console.error("❌ fetchProducts error:", err.message);
    }
  },

  createProduct: async (newProduct) => {
    const token = localStorage.getItem("token");

    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await api.post("/products", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      if (!data._id) {
        throw new Error(data.message || "Failed to create product");
      }

      set((state) => ({
        products: [...state.products, data],
      }));

      return { success: true, message: "Product created successfully" };
    } catch (err) {
      console.error("❌ createProduct error:", err.message);
      return { success: false, message: err.message };
    }
  },

  deleteProduct: async (pid) => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.delete(`/products/${pid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to delete product");
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (err) {
      console.error("❌ deleteProduct error:", err.message);
      return { success: false, message: err.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.put(`/products/${pid}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to update product");
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (err) {
      console.error("❌ updateProduct error:", err.message);
      return { success: false, message: err.message };
    }
  },
}));
