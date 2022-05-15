import React from "react";

interface AuthContextProps {
  user: User | null;
  setUser: (user: User) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  setUser: (_: User) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
