import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { AppBarProvider } from "./contexts/AppBarContext";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider>
          <AppBarProvider>
            <App />
          </AppBarProvider>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
