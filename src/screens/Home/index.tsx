import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/participant";
import React from "react";

export function Home() {
  const [participants, setPartcipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState<string>("");

  function handleParticipantAdd() {
    const newTrimmedParticipant = newParticipant.trim();
    if (newTrimmedParticipant.length === 0) {
      return Alert.alert("Campo não pode ser vazio.");
    }
    if (participants.includes(newTrimmedParticipant)) {
      return Alert.alert("Participante já existe na lista");
    }
    setPartcipants((prevState) => [...prevState, newTrimmedParticipant]);
    setNewParticipant("");
  }
  function handleParticipantRemove(name: string) {
    if (!participants.includes(name)) {
      return Alert.alert("Participante não encontrado na lista");
    }

    const remainParticipants = participants.filter(
      (participantName) => participantName !== name
    );
    Alert.alert("Remover", `Deseja mesmo remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          setPartcipants(remainParticipants);
          Alert.alert("Participante deletado.");
        },
      },
      { text: "Não", style: "cancel" },
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sábado, 16 de março de 2024.</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setNewParticipant}
          value={newParticipant}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
      />
      {/* {participants.map((i) => (
        <Participant
          key={i}
          name={i}
          onRemove={() => handleParticipantRemove(i)}
        />
      ))} */}
    </View>
  );
}
