import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import typeIcons from "../../utils/typeIcons";
import DateTimeInput from "../../components/DateTimeInput";

import api from "../../services/api";

import styles from "./styles";
import { useState } from "react/cjs/react.development";

export default function Task({ navigation }) {
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState("11:11:11:11:11:11");

  async function New() {
    //Alert.alert(`${date}T${hour}.000`);
    if (!title) return Alert.alert("Defina o nome da tarefa!");
    if (!description) return Alert.alert("Defina a descrição da tarefa!");
    if (!type) return Alert.alert("Defina o tipo da tarefa!");
    if (!date) return Alert.alert("Defina a data da tarefa!");
    if (!hour) return Alert.alert("Defina a hora da tarefa!");

    await api
      .post("/task", {
        macaddress,
        type,
        title,
        description,
        when: `${date}T${hour}.000`,
      })
      .then(() => {
        navigation.navigate("Home");
      });
  }

  function Back() {
    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Header ShowBack={true} onPress={Back} />
      <ScrollView style={{ width: "100%" }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {typeIcons.map(
            (icon, index) =>
              icon != null && (
                <TouchableOpacity onPress={() => setType(index)}>
                  <Image
                    source={icon}
                    style={[
                      styles.imageIcon,
                      type && type != index && styles.typeIconInactive,
                    ]}
                  />
                </TouchableOpacity>
              )
          )}
        </ScrollView>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder="Lembre-me de fazer ..."
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <Text style={styles.label}>Detalhes</Text>
        <TextInput
          style={styles.inputArea}
          maxLength={200}
          multiline={true}
          placeholder="Detalhes da atividade que tenho que lembrar..."
          onChangeText={(text) => setDescription(text)}
          value={description}
        />

        <DateTimeInput type={"date"} save={setDate} />
        <DateTimeInput type={"hour"} save={setHour} />

        <View style={styles.inLine}>
          <View style={styles.inputInline}>
            <Switch
              onValueChange={() => setDone(!done)}
              value={done}
              thumbColor={done ? "#00761B" : "#EE6B26"}
            />
            <Text style={styles.switchLabel}>Concluído</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.removeLabel}>EXCLUIR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer icon={"save"} onPress={New} />
    </KeyboardAvoidingView>
  );
}
