import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const server = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      registerUser: async (details) => {
        try {
          set({ loading: true });

          const { data } = await axios.post(`${server}/signupuser`, details);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });
          toast.success("Account created successfully");
          return { success: true };
        } catch (error) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "Signup failed");
          return { success: false };
        }
      },

      login: async (details) => {
        try {
          set({ loading: true });

          const { data } = await axios.post(`${server}/loginuser`, details, {
            withCredentials: true,
          });
          console.log("Login response:", data);
          set({
            user: data.user,
            token: data?.token?.accessToken,
            isAuthenticated: true,
            loading: false,
          });
          toast.success("Login successful");
          return { success: true };
        } catch (error) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "Login failed");
          return { success: false };
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post(`/logout`);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Logout failed");
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          toast.success("Logged out successfully");
        }
      },

      userDetails: async () => {
        try {
          set({ loading: true });
          const { data } = await axiosInstance.get(`/user`);
          set({ loading: false });
          return data.user;
        } catch (error) {
          set({ loading: false });
          toast.error(
            error?.response?.data?.message || "Failed to fetch user details",
          );
        }
      },
    }),
    { name: "auth-storage" },
  ),
);
