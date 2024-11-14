import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

type AppContextType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const Layout: React.FC = () => {
  const [category, setCategory] = useState("");

  return (
    <AppContext.Provider value={{ category, setCategory }}>
      <React.Fragment>
        <NavigationBar />
        <Outlet />
      </React.Fragment>
    </AppContext.Provider>
  );
};

export default Layout;
