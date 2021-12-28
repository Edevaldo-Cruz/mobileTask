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
} from "react-native";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import typeIcons from "../../utils/typeIcons";
import DateTimeInput from "../../components/DateTimeInput/index.android";

import styles from "./styles";
import { useState } from "react/cjs/react.development";

export default function Task() {
  const [done, setDone] = useState(false);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Header ShowBack={true} />
      <ScrollView style={{ width: "100%" }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {typeIcons.map(
            (icon) =>
              icon != null && (
                <TouchableOpacity>
                  <Image source={icon} style={styles.imageIcon} />
                </TouchableOpacity>
              )
          )}
        </ScrollView>
        <Text style={styles.label}>Titulo</Text>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder="Lembre-me de fazer ..."
        />
        <Text style={styles.label}>Detalhes</Text>
        <TextInput
          style={styles.inputArea}
          maxLength={200}
          multiline={true}
          placeholder="Detalhes da atividade que tenho que lembrar..."
        />

        <DateTimeInput type={"date"} />
        <DateTimeInput type={"hour"} />

        <View style={styles.inLine}>
          <View style={styles.inputInline}>
            <Switch
              onValueChange={() => setDone(!done)}
              value={done}
              thumbColor={done ? "#00761B" : "#EE6B26"}
            />
            <Text style={styles.swtichLabel}>Concluído</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.removeLabel}>EXCLUIR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer icon={"save"} />
    </KeyboardAvoidingView>
  );
}
