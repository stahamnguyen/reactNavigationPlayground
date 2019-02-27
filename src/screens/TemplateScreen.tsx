import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import globalStyles from 'config/GlobalStyles';
import NavigationRoutes from 'config/NavigationRoutes';
import { getRandomColor } from 'helpers/Generators';

const { deep1 } = NavigationRoutes;

interface Props {
  hideTabBar?: (callback?: () => void) => void;
  navigation?: any;
  screenProps?: {
    label: string;
  };
  showTabBar?: (callback?: () => void) => void;
}

interface State {}

class TemplateScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const {
      screenProps: { label },
    } = this.props;

    return (
      <View style={[
        globalStyles.center,
        styles.container,
        { backgroundColor: getRandomColor() },
      ]}>
        <TouchableOpacity
          onPress={this.onPress}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onPress = (): void => {
    const {
      screenProps: { label },
    } = this.props;

    if (label === deep1) {
      this.props.navigation.goBack();
      this.props.showTabBar();
    } else {
      this.props.hideTabBar(this.navigateBack);
    }
  }

  private navigateBack = (): void => {
    this.props.navigation.navigate(deep1);
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
});

export default TemplateScreen;