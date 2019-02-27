import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import { createMaterialTopTabNavigator, createStackNavigator, SafeAreaView } from 'react-navigation';

import TemplateScreen from './TemplateScreen';

import NavigationRoutes from 'config/NavigationRoutes';
import globalStyles from 'config/GlobalStyles';

const { deep1, deep2 } = NavigationRoutes;

interface TabMetadata {
  id: string;
  label: string;
}

const tabs: TabMetadata[] = [{
  label: 'First',
  id: 'first',
}, {
  label: 'Second',
  id: 'second',
}, {
  label: 'Third',
  id: 'third',
}];

const createTabs = (): Object => {

  let Stacks: Object = {};

  tabs.forEach((tabMetadata: TabMetadata) => {
    const { id, label } = tabMetadata;

    const tabBar = {
      [id]: ({ navigation }) => (
        <TemplateScreen
          hideTabBar={hideTabBar}
          key={id}
          navigation={navigation}
          screenProps={{label}}
        />
      ),
    };

    Stacks[id] = createStackNavigator(Object.assign({}, tabBar, {
      [deep1]: ({ navigation }) => (
        <TemplateScreen
          key={id}
          navigation={navigation}
          screenProps={{ label: deep1 }}
          showTabBar={showTabBar}
        />
      ),
      [deep2]: ({ navigation }) => (
        <TemplateScreen
          key={id}
          navigation={navigation}
          screenProps={{ label: deep2 }}
        />
      ),
    }), {
      headerMode: 'none',
      navigationOptions: ({ navigation }) => {
        let tabBarVisible: boolean = true;

        const { routes } = navigation.state;
        const topRoute = routes.length === 0 ? {} as { routeName: string } : routes[routes.length - 1];
        const topRouteName = topRoute.routeName || '';

        if (
          topRouteName === deep1 ||
          topRouteName === deep2
        ) tabBarVisible = false;

        return {
          ...getLabel(tabMetadata),
          tabBarVisible,
        };
      },
      transitionConfig,
    });
  });

  return Stacks;
};

const getLabel = (item: TabMetadata): Object => ({
  tabBarLabel: ({ focused }) => {

    return (
      <Animated.View
        style={{
          height: tabBarHeight,
          transform: [
            { translateY: tabBarTranslateY },
          ],
        }}
      >
        <SafeAreaView style={[styles.tab, globalStyles.center]}>
          <Text
            style={[
              styles.tabLabel,
              { color: focused ? '#FAB' : 'black' },
            ]}
          >
            {item.label}
          </Text>
        </SafeAreaView>
      </Animated.View>
    );
  },

  tabBarOnPress: ({ navigation }) => {
    const { routeName } = navigation.state;
    navigation.navigate(routeName);
  },
});

const transitionConfig = () => ({
  transitionSpec: {
    duration: 240,
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [0, 1],
    });

    return { transform: [ { scale } ] };
  },
});

const TabBar = createMaterialTopTabNavigator(createTabs(), {
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    indicatorStyle: {
      opacity: 0,
    },
    upperCaseLabel: false,
    style: {
      backgroundColor: 'white',
      borderTopColor: 'transparent',
    },
    labelStyle: {
      backgroundColor: 'transparent',
      fontSize: 14,
      fontFamily: 'System',
      fontWeight: 'bold',
      color: 'black',
    },
    tabStyle: {
      padding: 0,
    },
  },
});

const hideTabBar = (callback?: () => void): void => {
  Animated.parallel([
    Animated.timing(
      tabBarTranslateY,
      {
        toValue: -100,
        duration: 500,
      }
    ),
    Animated.timing(
      tabBarHeight,
      {
        toValue: 0,
        duration: 500,
      }
    ),
  ]).start(callback);
};

const showTabBar = (callback?: () => void): void => {
  Animated.parallel([
    Animated.timing(
      tabBarTranslateY,
      {
        toValue: 20,
        duration: 500,
      }
    ),
    Animated.timing(
      tabBarHeight,
      {
        toValue: 100,
        duration: 500,
      }
    ),
  ]).start(callback);
};

const tabBarTranslateY = new Animated.Value(0);
const tabBarHeight = new Animated.Value(100);

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TabBar;