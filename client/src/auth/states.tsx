import React from "react";

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

// export const AuthContext = React.createContext<AuthContextProps>({
//   user: null,
//   setUser: (_: User) => {},
// });
export const AuthContext = React.createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (user) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  React.useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
