import React, { useEffect, useState } from "react";
import { View, ScrollView, TextInput, Alert } from "react-native";
import { Provider as PaperProvider, Card, Text, Button } from "react-native-paper";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

const db = SQLite.openDatabase("incident_pro.db");

export default function App() {

  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });

  const [severity, setSeverity] = useState("Major");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    initDB();
    loadIncidents();
  }, []);

  // ================= DATABASE =================
  const initDB = () => {
    db.transaction(tx => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS incidents (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          incident_no TEXT,
          severity TEXT,
          description TEXT,
          location TEXT,
          status TEXT,
          date TEXT
        );
      `);
    });
  };

  // ================= ADD INCIDENT =================
  const addIncident = () => {
    if (!description || !location) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    const incidentNo = "INC-" + Math.floor(Math.random() * 999999);

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO incidents (incident_no, severity, description, location, status, date)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [incidentNo, severity, description, location, "Open", new Date().toISOString()],
        () => {
          setDescription("");
          setLocation("");
          loadIncidents();
        }
      );
    });
  };

  // ================= LOAD =================
  const loadIncidents = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM incidents ORDER BY id DESC",
        [],
        (_, { rows }) => {
          setIncidents(rows._array);

          const total = rows._array.length;
          const open = rows._array.filter(i => i.status === "Open").length;
          const closed = rows._array.filter(i => i.status === "Closed").length;

          setStats({ total, open, closed });
        }
      );
    });
  };

  // ================= CLOSE INCIDENT =================
  const closeIncident = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE incidents SET status='Closed' WHERE id=?",
        [id],
        () => loadIncidents()
      );
    });
  };

  return (
    <PaperProvider>
      <StatusBar style="auto" />

      <ScrollView style={{ padding: 15 }}>

        {/* HEADER */}
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Incident Report Pro
        </Text>

        {/* DASHBOARD */}
        <Card style={{ marginBottom: 10 }}>
          <Card.Content>
            <Text>Total: {stats.total}</Text>
            <Text>Open: {stats.open}</Text>
            <Text>Closed: {stats.closed}</Text>
          </Card.Content>
        </Card>

        {/* FORM */}
        <Card style={{ marginBottom: 10 }}>
          <Card.Content>

            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Create Incident
            </Text>

            <TextInput
              placeholder="Severity"
              value={severity}
              onChangeText={setSeverity}
              style={{ borderWidth: 1, marginBottom: 5, padding: 5 }}
            />

            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={{ borderWidth: 1, marginBottom: 5, padding: 5 }}
            />

            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              style={{ borderWidth: 1, marginBottom: 5, padding: 5 }}
            />

            <Button mode="contained" onPress={addIncident}>
              Save Incident
            </Button>

          </Card.Content>
        </Card>

        {/* LIST */}
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Incidents
        </Text>

        {incidents.map(item => (
          <Card key={item.id} style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text>#{item.incident_no}</Text>
              <Text>Severity: {item.severity}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Location: {item.location}</Text>

              {item.status === "Open" && (
                <Button onPress={() => closeIncident(item.id)}>
                  Close
                </Button>
              )}
            </Card.Content>
          </Card>
        ))}

      </ScrollView>
    </PaperProvider>
  );
              }
