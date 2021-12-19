import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Header: {
    width: "100%",
    height: 120,
    backgroundColor: "#20295f",
    borderBottomWidth: 5,
    borderColor: "#EE6B26",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  logo: {
    width: 100,
    height: 30,
  },
  notification: {
    position: "absolute",
    right: 20,
    paddingTop: 30,
  },
  notificationImage: {
    width: 30,
    height: 35,
  },
  notificationText: {
    fontWeight: "bold",
    color: "#EE6B26",
  },
  circle: {
    width: 25,
    height: 25,
    backgroundColor: "#FFF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 13,
    bottom: 13,
  },
  leftIcon: {
    position: "absolute",
    left: 20,
    paddingTop: 30,
  },
  leftIconImage: {
    width: 30,
    height: 30,
  },
});

export default styles;
