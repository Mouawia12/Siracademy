"use client";

import axios from "axios";
import { getAuthToken } from "@/libs/auth";

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX || "/api";

export const apiClient = axios.create({
  baseURL: `${apiBase}${apiPrefix}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
