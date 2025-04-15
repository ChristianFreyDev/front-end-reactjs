import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider"
import { AppBarProvider } from "./contexts/AppBarContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>      
      <Provider>
        <AppBarProvider>
          <App />
        </AppBarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);