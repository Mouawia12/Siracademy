"use client";

import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

const AppProviders = ({ children }) => {
  return (
    <HelmetProvider>
      {children}
      <Toaster position="top-right" />
    </HelmetProvider>
  );
};

export default AppProviders;
