/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/solkaz/react-native-template-ts-detox-jest
 *
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

interface Props {}

interface State {
  text: string;
}

export default class App extends Component<Props, State> {
  public state = {
    text: "",
  };

  public render() {
    const { text } = this.state;
    return (
      <View testID="welcome" style={styles.container}>
        <Text style={styles.welcome}>TypeScript Detox Example</Text>
        <Button testID="button" title="Tap Me!" onPress={this.displayAlert} />
        <Text>Type some stuff below</Text>
        <TextInput
          testID="textInput"
          value={text}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={this.updateText}
        />
        <Text>The above but reversed: {"\n"}</Text>
        <Text testID="reversedText" style={styles.reversedText}>
          {this.reverseText(text)}
        </Text>
      </View>
    );
  }

  private displayAlert = () => Alert.alert("Hello World!");

  private updateText = (text: string) => this.setState({ text });

  private reverseText = (text: string): string => {
    return text
      .split("")
      .reverse()
      .join("");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  textInput: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  reversedText: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
