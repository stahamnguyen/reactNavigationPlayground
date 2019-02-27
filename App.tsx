import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>hello</Text>
        <Text>To get started, edit App.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
