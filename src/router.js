import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionScreen } from "./screens/ActionScreen";
import { MainScreen } from "./screens/MainScreen";
import { WebViewScreen } from "./screens/WebViewScreen";
import { storeData, retrieveData } from "./utils";
import { AppDataContext } from "./context";

export const AppRouter = () => {
  const Stack = createNativeStackNavigator();
  const [data, setData] = useState([]);

  // Get data from local storage and populate context provider (if data is available)
  useEffect(() => {
    const data = retrieveData();
    if (data) {
      console.log(data);
      setData(data);
    }
  }, []);

  // Set data to local storage whenever app data is modified
  useEffect(() => {
    storeData(data);
  }, [data]);

  return (
    <AppDataContext.Provider value={{ data, setData }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainScreen">
            {(props) => <MainScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="ActionScreen">
            {(props) => <ActionScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="WebViewScreen">
            {(props) => <WebViewScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppDataContext.Provider>
  );
};
