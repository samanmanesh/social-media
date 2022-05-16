import { useContext } from "react";
import { AuthContext } from "./states";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const handleSignOut = () => {
    context.setUser(null);
    localStorage.removeItem("user");
  };

  return { ...context, handleSignOut };
};
