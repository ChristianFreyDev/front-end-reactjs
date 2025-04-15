import { createContext, useContext, useState } from "react";

const AppBarContext = createContext();

export const useAppBar = () => useContext(AppBarContext);

export const AppBarProvider = ({ children }) => {
  const [title, setTitle] = useState("");

  return (
    <AppBarContext.Provider value={{ title, setTitle }}>
      {children}
    </AppBarContext.Provider>
  );
};
