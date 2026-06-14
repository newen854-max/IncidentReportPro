import React from "react";
import { View, Text } from "react-native";

export default function Dashboard() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>HSE Dashboard</Text>
      <Text>Total Incidents: --</Text>
      <Text>Open: --</Text>
      <Text>Closed: --</Text>
      <Text>LTI / MTC / FAC: --</Text>
    </View>
  );
}
