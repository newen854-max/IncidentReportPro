import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IncidentDetail from "./src/screens/IncidentDetail";
import Incidents from "./src/screens/Incidents";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "./src/screens/Dashboard";
import Incidents from "./src/screens/Incidents";
import Actions from "./src/screens/Actions";
import Reports from "./src/screens/Reports";
import Settings from "./src/screens/Settings";

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Incidents" component={Incidents} />
      <Tab.Screen name="Actions" component={Actions} />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
 const Stack = createNativeStackNavigator();

function IncidentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IncidentsList" component={Incidents} />
      <Stack.Screen name="IncidentDetail" component={IncidentDetail} />
    </Stack.Navigator>
  );
} return (
    <PaperProvider>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </PaperProvider>
  );
}
