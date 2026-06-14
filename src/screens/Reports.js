import React from "react";
import { View, ScrollView } from "react-native";
import { Card, Text, Button } from "react-native-paper";

export default function Reports() {

  const generateReport = () => {
    alert("Report generated (PDF will be added in final APK stage)");
  };

  return (
    <ScrollView style={{ padding: 15 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Reports
      </Text>

      {/* REPORT CARD */}
      <Card style={{ marginTop: 15 }}>
        <Card.Content>

          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            HSE INCIDENT REPORT
          </Text>

          <Text>System: Incident Report Pro</Text>
          <Text>Status: Ready for export</Text>

        </Card.Content>
      </Card>

      {/* BUTTON */}
      <Card style={{ marginTop: 15 }}>
        <Card.Content>

          <Button mode="contained" onPress={generateReport}>
            Generate Report
          </Button>

        </Card.Content>
      </Card>

    </ScrollView>
  );
}
