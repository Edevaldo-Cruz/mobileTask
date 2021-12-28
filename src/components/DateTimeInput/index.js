import React from "react";
import { Platform } from "react-native";

import DateTimesInputAndroid from "./index.android";
import DateTimesInputIOS from "./index.ios";

export default function DateTimeInput() {
  return Platform.OS === "android" ? (
    <DateTimesInputAndroid />
  ) : (
    <DateTimesInputIOS />
  );
}
