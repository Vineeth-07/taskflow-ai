import { createContext, useContext, useState } from "react";

const TopbarContext = createContext<any>(null);

export const TopbarProvider = ({ children }: any) => {
  const [title, setTitle] = useState("");

  return (
    <TopbarContext.Provider value={{ title, setTitle }}>
      {children}
    </TopbarContext.Provider>
  );
};

export const useTopbar = () => useContext(TopbarContext);
