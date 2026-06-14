import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView, Alert } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("hse.db");

export default function Actions() {

  const [actions, setActions] = useState([]);

  const [form, setForm] = useState({
    action: "",
    responsible: "",
    department: "",
    status: "Open"
  });

  // CREATE TABLE
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS actions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          action TEXT,
          responsible TEXT,
          department TEXT,
          status TEXT
        );
      `);
    });

    loadActions();
  }, []);

  // LOAD ACTIONS
  const loadActions = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM actions ORDER BY id DESC",
        [],
        (_, { rows }) => setActions(rows._array)
      );
    });
  };

  // ADD ACTION
  const addAction = () => {
    if (!form.action || !form.responsible) {
      Alert.alert("Fill all fields");
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO actions (action, responsible, department, status) VALUES (?, ?, ?, ?)",
        [form.action, form.responsible, form.department, "Open"],
        () => {
          setForm({ action: "", responsible: "", department: "", status: "Open" });
          loadActions();
        }
      );
    });
  };

  // CLOSE ACTION
  const closeAction = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE actions SET status='Closed' WHERE id=?",
        [id],
        () => loadActions()
      );
    });
  };

  return (
    <ScrollView style={{ padding: 15 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Corrective Actions
      </Text>

      {/* FORM */}
      <Card style={{ marginVertical: 10 }}>
        <Card.Content>

          <TextInput
            placeholder="Action Description"
            value={form.action}
            onChangeText={(t) => setForm({ ...form, action: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Responsible Person"
            value={form.responsible}
            onChangeText={(t) => setForm({ ...form, responsible: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <TextInput
            placeholder="Department"
            value={form.department}
            onChangeText={(t) => setForm({ ...form, department: t })}
            style={{ borderWidth: 1, marginBottom: 5 }}
          />

          <Button mode="contained" onPress={addAction}>
            Add Action
          </Button>

        </Card.Content>
      </Card>

      {/* LIST */}
      {actions.map(item => (
        <Card key={item.id} style={{ marginBottom: 10 }}>
          <Card.Content>

            <Text>Action: {item.action}</Text>
            <Text>Responsible: {item.responsible}</Text>
            <Text>Dept: {item.department}</Text>
            <Text>Status: {item.status}</Text>

            {item.status === "Open" && (
              <Button onPress={() => closeAction(item.id)}>
                Mark Closed
              </Button>
            )}

          </Card.Content>
        </Card>
      ))}

    </ScrollView>
  );
}
