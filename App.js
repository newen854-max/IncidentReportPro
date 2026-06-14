import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "./src/screens/Dashboard";
import Incidents from "./src/screens/Incidents";
import Reports from "./src/screens/Reports";

const Tab = createBottomTabNavigator();

/* =========================
   MAIN APP TABS (SAFE MODE)
========================= */
function MainTabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />

      <Tab.Screen
        name="Incidents"
        component={Incidents}
      />

      <Tab.Screen
        name="Reports"
        component={Reports}
      />

    </Tab.Navigator>
  );
}

/* =========================
   APP ROOT
========================= */
export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
