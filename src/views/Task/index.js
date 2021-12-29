import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import * as Network from "expo-network";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import typeIcons from "../../utils/typeIcons";
import DateTimeInput from "../../components/DateTimeInput";

import api from "../../services/api";

import styles from "./styles";

export default function Task({ navigation }) {
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState();
  const [load, setLoad] = useState(true);

  async function SaveTask() {
    //Alert.alert(`${date}T${hour}.000`);
    if (!title) return Alert.alert("Defina o nome da tarefa!");
    if (!description) return Alert.alert("Defina a descrição da tarefa!");
    if (!type) return Alert.alert("Defina o tipo da tarefa!");
    if (!date) return Alert.alert("Defina a data da tarefa!");
    if (!hour) return Alert.alert("Defina a hora da tarefa!");

    if (id) {
      await api
        .put(`/task/${id}`, {
          macaddress,
          done,
          type,
          title,
          description,
          when: `${date}T${hour}.000`,
        })
        .then(() => {
          navigation.navigate("Home");
        });
    } else {
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
  }

  async function LoadTask() {
    await api.get(`task/${id}`).then((response) => {
      setLoad(true);
      setDone(response.data.done);
      setType(response.data.type);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(response.data.when);
      setHour(response.data.when);
    });
  }

  // Macaddress obsoleto procurar outra solução!!!

  async function getMacAddress() {
    await Network.getIpAddressAsync().then((mac) => {
      setMacaddress(mac);
      setLoad(false);
    });
  }

  async function DeleteTask() {
    await api.delete(`/task/${id}`).then(() => {
      navigation.navigate("Home");
    });
  }

  async function Remove() {
    Alert.alert(
      "Remover Tarefa",
      "Deseja realmente remover essa tarefa?",
      [{ text: "Cancelar" }, { text: "Confimar", onPress: () => DeleteTask() }],
      { cancelable: true }
    );
  }

  useEffect(() => {
    getMacAddress();
    if (navigation.state.params) {
      setId(navigation.state.params.idTask);
      LoadTask().then(() => setLoad(false));
    }
  }, [macaddress]);

  function Back() {
    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Header ShowBack={true} onPress={Back} />

      {load ? (
        <ActivityIndicator
          size={50}
          color="#EE6B26"
          style={{ marginTop: 150 }}
        />
      ) : (
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

          <DateTimeInput type={"date"} save={setDate} date={date} />
          <DateTimeInput type={"hour"} save={setHour} hour={hour} />

          {id && (
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
                <Text style={styles.removeLabel} onPress={Remove}>
                  EXCLUIR
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      <Footer icon={"save"} onPress={SaveTask} />
    </KeyboardAvoidingView>
  );
}
