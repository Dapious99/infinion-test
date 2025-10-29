/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axiosInstance";

export const api = {
  async get(url: string) {
    const res = await axiosInstance.get(url);
    return res.data;
  },

  async post(url: string, data: any) {
    const res = await axiosInstance.post(url, data);
    return res.data;
  },

  async put(url: string, data: any) {
    const res = await axiosInstance.put(url, data);
    return res.data;
  },

  async delete(url: string) {
    const res = await axiosInstance.delete(url);
    return res.data;
  },
};
