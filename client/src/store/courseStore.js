import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const useCourseStore = create((set) => ({
  courses: [],

  fetchCourses: async () => {
    try {
      const { data } = await axiosInstance.get(`/course`);
      return data.courses;
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "Failed to fetch courses");
    }
  },

  getCourseById: async (id) => {
    try {
      const { data } = await axiosInstance.get(`/course/${id}`);
      return data.course;
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "Failed to fetch course");
    }
  },

  handleEnrollment: async (courseId) => {
    try {
      const { data } = await axiosInstance.post(`/user/${courseId}`);
      toast.success(data.msg);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Enrollment failed");
    }
  },
}));
