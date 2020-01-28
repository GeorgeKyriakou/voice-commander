import React from "react";
import "./App.css";
import AuthState from "./context/auth/auth.state";
import { MainComponent } from "./components/main/main.component";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles";

const App: React.FC = () => {
  return (
    <AuthState>
      <ThemeProvider theme={theme}>
        <MainComponent />
      </ThemeProvider>
    </AuthState>
  );
};

export default App;
