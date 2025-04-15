import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme";

export function Provider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        {children}
    </ThemeProvider>
  );
}
