import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

import styles from "./styles";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Network from "expo-network";

export default function QrCode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  async function getIpAddress() {
    await Network.getIpAddressAsync().then((mac) => {
      Alert.alert(`Seu número é: ${mac}`);
    });
  }

  useEffect(() => {
    async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if (data == "getmacaddress") getIpAddress();
    else Alert.alert("QrCode Inválido!");
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Conectar com minha conta na web.</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.textButton}>VOLTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={scanned ? styles.buttonScanActive : styles.buttonScanInative}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.textButton}>SCAN NOVAMENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
