import React from "react";
import { useRoutes } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import "./i18n";
import routes from "./routes";

import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { LayoutProvider } from "./contexts/LayoutContext";


const App = () => {
  const content = useRoutes(routes);

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s |- React Admin Test"
        defaultTitle=" - React Admin & Dashboard Template"
      />
      <ThemeProvider>
        <SidebarProvider>
          <LayoutProvider>
            {content}
          </LayoutProvider>
        </SidebarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
