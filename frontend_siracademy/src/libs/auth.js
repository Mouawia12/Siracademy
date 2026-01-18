"use client";

export const AUTH_EVENT = "auth:changed";
const AUTH_COOKIE = "auth_token";
const ROLE_COOKIE = "auth_role";

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

const setCookie = (name, value, maxAgeDays = 7) => {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value || ""
  )}; path=/; max-age=${maxAge}; samesite=lax`;
};

const clearCookie = (name) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
};

export const isLoggedIn = () => Boolean(getAuthToken() || getCookie(AUTH_COOKIE));

export const setAuth = (token, user) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("auth_token", token);
    setCookie(AUTH_COOKIE, token);
  }
  if (user) {
    localStorage.setItem("auth_user", JSON.stringify(user));
    const role = user?.roles?.[0];
    if (role) {
      setCookie(ROLE_COOKIE, role);
    }
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuth = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  clearCookie(AUTH_COOKIE);
  clearCookie(ROLE_COOKIE);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getDashboardPath = (user) => {
  const roles = user?.roles || [];
  if (roles.includes("admin")) return "/dashboards/admin-dashboard";
  if (roles.includes("instructor")) return "/dashboards/instructor-dashboard";
  return "/dashboards/student-dashboard";
};

export const isActiveMember = (user) => user?.status === "active";
