import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("hse.db");

export default function IncidentDetail({ route, navigation }) {

  const { incident } = route.params;

  const [severity, setSeverity] = useState(incident.severity);
  const [description, setDescription] = useState(incident.description);
  const [location, setLocation] = useState(incident.location);

  // UPDATE INCIDENT
  const updateIncident = () => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE incidents 
         SET severity=?, description=?, location=? 
         WHERE id=?`,
        [severity, description, location, incident.id],
        () => {
          Alert.alert("Updated Successfully");
          navigation.goBack();
        }
      );
    });
  };

  // DELETE INCIDENT
  const deleteIncident = () => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM incidents WHERE id=?",
        [incident.id],
        () => {
          Alert.alert("Deleted");
          navigation.goBack();
        }
      );
    });
  };

  return (
    <View style={{ padding: 15 }}>

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Incident Detail
      </Text>

      <Card style={{ marginVertical: 10 }}>
        <Card.Content>

          <TextInput value={severity} onChangeText={setSeverity} style={{ borderWidth: 1, marginBottom: 5 }} />
          <TextInput value={description} onChangeText={setDescription} style={{ borderWidth: 1, marginBottom: 5 }} />
          <TextInput value={location} onChangeText={setLocation} style={{ borderWidth: 1, marginBottom: 5 }} />

          <Button mode="contained" onPress={updateIncident}>
            Update Incident
          </Button>

          <Button textColor="red" onPress={deleteIncident}>
            Delete Incident
          </Button>

        </Card.Content>
      </Card>

    </View>
  );
}
