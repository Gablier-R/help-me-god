import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TrendingScreen from '../screens/TrendingScreen';
import TopRatedScreen from '../screens/TopRatedScreen';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MoviesDetailsScreen';
import ActorDetailsScreen from '../screens/ActorDetailsScreen';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator(); // Adicionei uma pilha principal

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
    <MainStack.Screen name="ActorDetails" component={ActorDetailsScreen} options={{ title: 'Actor Details' }} />
    <MainStack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} options={{ title: 'Movie Details' }} />
  </MainStack.Navigator>
);

const TabNavigator = () => (
<Tab.Navigator initialRouteName="TrendingScreen">
  <Tab.Screen name="TrendingScreen" component={TrendingScreen} options={{ title: 'Trending Movies' }} />
  <Tab.Screen name="TopRatedScreen" component={TopRatedScreen} options={{ title: 'Top Rated' }} />
  <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
</Tab.Navigator>


);

const Navigation = () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
);

export default Navigation;
