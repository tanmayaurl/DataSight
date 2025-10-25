import React from "react";

export const AuroraText = ({ children }) => {
  return (
    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
      {children}
    </span>
  );
};
