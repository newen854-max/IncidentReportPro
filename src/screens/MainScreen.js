import React, { useState } from "react";
import { ScrollView, View, TextInput } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("incident_pro.db");

export default function MainScreen() {

  const [incidents, setIncidents] = useState([]);

  const [form, setForm] = useState({
    severity: "Major",
    type: "Near Miss",
    hazard: "Electrical",
    description: "",
    location: ""
  });

  // INIT TABLES
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS incidents (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          incident_no TEXT,
          severity TEXT,
          type TEXT,
          hazard TEXT,
          description TEXT,
          location TEXT,
          status TEXT
        );
      `);
    });

    loadData();
  }, []);

  const loadData = () => {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM incidents ORDER BY id DESC", [], (_, { rows }) => {
        setIncidents(rows._array);
      });
    });
  };

  const addIncident = () => {

    const id = "INC-" + Math.floor(Math.random() * 999999);

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO incidents
        (incident_no, severity, type, hazard, description, location, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          form.severity,
          form.type,
          form.hazard,
          form.description,
          form.location,
          "Open"
        ],
        () => {
          loadData();
        }
      );
    });
  };

  return (
    <ScrollView style={{ padding: 15 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        HSE Incident System
      </Text>

      {/* FORM */}
      <Card style={{ marginVertical: 10 }}>
        <Card.Content>

          <TextInput
            placeholder="Severity (Minor / Major / Critical)"
            onChangeText={(t) => setForm({ ...form, severity: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Incident Type (Near Miss / Injury / LTI)"
            onChangeText={(t) => setForm({ ...form, type: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Hazard (Electrical / Chemical / etc)"
            onChangeText={(t) => setForm({ ...form, hazard: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Description"
            onChangeText={(t) => setForm({ ...form, description: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Location"
            onChangeText={(t) => setForm({ ...form, location: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <Button mode="contained" onPress={addIncident}>
            Save Incident
          </Button>

        </Card.Content>
      </Card>

      {/* LIST */}
      {incidents.map(item => (
        <Card key={item.id} style={{ marginBottom: 10 }}>
          <Card.Content>
            <Text>{item.incident_no}</Text>
            <Text>Severity: {item.severity}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Hazard: {item.hazard}</Text>
            <Text>Status: {item.status}</Text>
          </Card.Content>
        </Card>
      ))}

    </ScrollView>
  );
}
