import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  calc: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "black",
    flexDirection: "column",
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 0,
    paddingBottom: 10,
    marginBottom: 20,
  },

  output: {
    height: "20%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "relative",
    flexDirection: "row",
    padding: 15,
  },

  output_text: {
    fontSize: 50,
    color: "white",
  },

  buttons: {
    height: "100%",
    flexDirection: "column",
    marginTop: 15,
  },

  key: {
    position: "relative",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    fontSize: 26,
  },

  long_key: {
    width: 160,
  },

  key_separate: {
    fontSize: 30,
    paddingBottom: 5,
  },

  dark_gray: {
    backgroundColor: "#222222",
    color: "#ffffff",
  },

  gray: {
    backgroundColor: "gray",
  },

  orange: {
    backgroundColor: "orange",
  },

  btnText: {
    fontSize: 32,
    color: "white",
  },

  memo: {
    color: "red",
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 8,
  },
});

export default styles;
