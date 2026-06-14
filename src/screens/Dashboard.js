import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("hse.db");

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    db.transaction(tx => {

      tx.executeSql("SELECT * FROM incidents", [], (_, { rows }) => {
        const data = rows._array;

        setStats({
          total: data.length,
          open: data.filter(i => i.status === "Open").length,
          closed: data.filter(i => i.status === "Closed").length
        });
      });

    });
  };

  return (
    <View style={{ padding: 15 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        HSE Dashboard
      </Text>

      <Card style={{ marginTop: 10 }}>
        <Card.Content>
          <Text>Total Incidents: {stats.total}</Text>
          <Text>Open: {stats.open}</Text>
          <Text>Closed: {stats.closed}</Text>
        </Card.Content>
      </Card>

    </View>
  );
}
