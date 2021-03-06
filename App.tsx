import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";

import { LoginProvider } from "./src/hooks/login";

import theme from "./src/global/styles/theme";

import { AppRoutes } from "./src/routes/app.routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <AppRoutes />
        </NavigationContainer>
      </LoginProvider>
    </ThemeProvider>
  );
}
