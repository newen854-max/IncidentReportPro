import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("hse.db");

export default function Incidents() {
  const navigation = useNavigation();

  const [list, setList] = useState([]);

  const [form, setForm] = useState({
    severity: "",
    description: "",
    location: ""
  });

  /* ================= INIT DB ================= */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS incidents (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          incident_no TEXT,
          severity TEXT,
          description TEXT,
          location TEXT,
          status TEXT
        );
      `);
    });

    loadData();
  }, []);

  /* ================= LOAD ================= */
  const loadData = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM incidents ORDER BY id DESC",
        [],
        (_, { rows }) => setList(rows._array)
      );
    });
  };

  /* ================= CREATE ================= */
  const addIncident = () => {

    if (!form.description || !form.location) {
      Alert.alert("Fill all fields");
      return;
    }

    const incNo = "INC-" + Math.floor(Math.random() * 99999);

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO incidents
        (incident_no, severity, description, location, status)
        VALUES (?, ?, ?, ?, ?)`,
        [incNo, form.severity, form.description, form.location, "Open"],
        () => {
          setForm({ severity: "", description: "", location: "" });
          loadData();
        }
      );
    });
  };

  /* ================= CLOSE ================= */
  const closeIncident = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE incidents SET status='Closed' WHERE id=?",
        [id],
        () => loadData()
      );
    });
  };

  return (
    <ScrollView style={{ padding: 15 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Incident Management
      </Text>

      {/* FORM */}
      <Card style={{ marginVertical: 10 }}>
        <Card.Content>

          <TextInput
            placeholder="Severity"
            value={form.severity}
            onChangeText={(t) => setForm({ ...form, severity: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Description"
            value={form.description}
            onChangeText={(t) => setForm({ ...form, description: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Location"
            value={form.location}
            onChangeText={(t) => setForm({ ...form, location: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <Button mode="contained" onPress={addIncident}>
            Save Incident
          </Button>

        </Card.Content>
      </Card>

      {/* LIST */}
      <Card
  onPress={() =>
    navigation.navigate("IncidentDetail", { incident: item })
  }
>
        <Card key={item.id} style={{ marginBottom: 10 }}>
          <Card.Content>

            <Text>{item.incident_no}</Text>
            <Text>Severity: {item.severity}</Text>
            <Text>Status: {item.status}</Text>
            <Text>{item.location}</Text>

            {item.status === "Open" && (
              <Button onPress={() => closeIncident(item.id)}>
                Close
              </Button>
            )}

          </Card.Content>
        </Card>
      ))}

    </ScrollView>
  );
}
