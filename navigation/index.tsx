/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DrinkDetail from '../screens/DrinkDetail';
import DrinkList from '../screens/DrinkList';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabHomeScreen from '../screens/TabHomeScreen';
import TabShoppingCartScreen from '../screens/TabShoppingCartScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Cadastro from '../screens/Cadastro';
import Constants from 'expo-constants'


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHomeScreen"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint, tabBarShowLabel: false }}
    >

      <BottomTab.Screen
        name="TabHomeScreen"
        component={TabHomeScreenNavigator}
        options={{
          title: 'Home', tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="TabShoppingCartScreen"
        component={TabShoppingCartScreenNavigator}
        options={{
          title: 'Carrinho', tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="LoginScreen"
        component={LoginScreenNavigator}
        options={{
          title: 'Usuario', tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab



export type TabHomeParamList = {
  TabHomeScreen: undefined;
  DrinkDetail: undefined;
  DrinkList: undefined;
  LoginScreen: undefined;
}

const TabHomeStack = createNativeStackNavigator<TabHomeParamList>();

function TabHomeScreenNavigator() {
  return (
    <TabHomeStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <TabHomeStack.Screen name="TabHomeScreen" component={TabHomeScreen} options={{ headerTitle: '', headerShown: false }} />
      <TabHomeStack.Screen name="DrinkDetail" component={DrinkDetail} options={{ headerTitle: '' }} />
      <TabHomeStack.Screen name="DrinkList" component={DrinkList} options={{ headerTitle: '' }} />
    </TabHomeStack.Navigator>
  );
}

export type TabShoppingCartParamList = {
  TabShoppingCartScreen: undefined;
  LoginScreen: undefined;
}

const TabShoppingCart = createNativeStackNavigator<TabShoppingCartParamList>();

function TabShoppingCartScreenNavigator() {
  return (
    <TabShoppingCart.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <TabShoppingCart.Screen name="TabShoppingCartScreen" component={TabShoppingCartScreen} options={{ headerTitle: '', headerShown: false }} />

    </TabShoppingCart.Navigator>
  );
}

export type LoginScreenParamList = {
  LoginScreen: undefined;
  Cadastro: undefined;
}

const Login = createNativeStackNavigator<LoginScreenParamList>();

function LoginScreenNavigator() {
  return (
    <Login.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Login.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: '', headerShown: false }} />
      <Login.Screen name="Cadastro" component={Cadastro} options={{ headerTitle: 'Cadastro' }} />
    </Login.Navigator>
  );
}