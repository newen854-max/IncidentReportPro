import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "./src/screens/Dashboard";
import Incidents from "./src/screens/Incidents";
import IncidentDetail from "./src/screens/IncidentDetail";
import Actions from "./src/screens/Actions";
import Reports from "./src/screens/Reports";
import Attachments from "./src/screens/Attachments";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* =========================
   INCIDENT STACK
========================= */
function IncidentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IncidentsList" component={Incidents} />
      <Stack.Screen name="IncidentDetail" component={IncidentDetail} />
    </Stack.Navigator>
  );
}

/* =========================
   MAIN TABS
========================= */
function MainTabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen name="Dashboard" component={Dashboard} />

      <Tab.Screen name="Incidents" component={IncidentStack} />

      <Tab.Screen name="Actions" component={Actions} />

      <Tab.Screen name="Reports" component={Reports} />

      <Tab.Screen name="Attachments" component={Attachments} />

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
