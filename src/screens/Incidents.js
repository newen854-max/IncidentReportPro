import React, { useState } from "react";
import { View, ScrollView, TextInput, Text } from "react-native";
import { Button, Card } from "react-native-paper";

export default function Incidents() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveIncident = () => {
    alert("Incident Saved (SQLite integration will be added next step)");
  };

  return (
    <ScrollView style={{ padding: 15 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Incidents
      </Text>

      {/* TITLE */}
      <Card style={{ marginTop: 15 }}>
        <Card.Content>

          <Text>Incident Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginTop: 5
            }}
          />

        </Card.Content>
      </Card>

      {/* DESCRIPTION */}
      <Card style={{ marginTop: 15 }}>
        <Card.Content>

          <Text>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginTop: 5,
              height: 100
            }}
          />

        </Card.Content>
      </Card>

      {/* BUTTON */}
      <Card style={{ marginTop: 15 }}>
        <Card.Content>

          <Button mode="contained" onPress={saveIncident}>
            Save Incident
          </Button>

        </Card.Content>
      </Card>

    </ScrollView>
  );
}
