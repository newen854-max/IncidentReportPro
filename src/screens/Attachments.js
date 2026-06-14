import React, { useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Card, Text, Button } from "react-native-paper";

export default function Attachments() {

  const [note, setNote] = useState("");
  const [list, setList] = useState([]);

  const addNote = () => {
    setList([...list, note]);
    setNote("");
  };

  return (
    <ScrollView style={{ padding: 15 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Attachments / Evidence
      </Text>

      <Card style={{ marginVertical: 10 }}>
        <Card.Content>

          <TextInput
            placeholder="Add Evidence Note (photo/video reference)"
            value={note}
            onChangeText={setNote}
            style={{ borderWidth: 1 }}
          />

          <Button onPress={addNote}>
            Add Evidence
          </Button>

        </Card.Content>
      </Card>

      {list.map((item, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Card.Content>
            <Text>{item}</Text>
          </Card.Content>
        </Card>
      ))}

    </ScrollView>
  );
}
