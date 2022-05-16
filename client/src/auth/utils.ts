import { useContext } from "react";
import { AuthContext } from "./states";

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth context", context);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const handleSignOut = () => {
    context.setUser(null);
  };

  return { ...context, handleSignOut };
};
