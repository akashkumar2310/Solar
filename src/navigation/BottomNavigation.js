import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Dashboard from '../screen/Dashboard';
import Colors from '../constant/Colors';


const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#5856D6" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: 'flex',
            position: 'absolute',
            bottom: 10,
            left: 15,
            right: 15,
            elevation: 5,
            backgroundColor: 'green',
            borderRadius: 30,
            height: 60,
          },
          tabBarShowLabel: false,
          headerShown: false,
        })}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="home"
                  size={30}
                  color={focused ? 'white' : '#9594e5'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="inbox"
                  size={30}
                  color={focused ? 'white' : '#9594e5'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="message1"
                  size={30}
                  color={focused ? 'white' : '#9594e5'}
                />
              </View>
            ),
          }}
        />
        {/* <Tab.Screen
          name="Create"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? -10 : -20,
                  width: Platform.OS === 'ios' ? 50 : 60,
                  height: Platform.OS === 'ios' ? 50 : 60,
                  borderRadius: Platform.OS === 'ios' ? 25 : 30,
                  backgroundColor: '#F24A4A',
                }}>
                <Icon
                  name="home"
                  size={Platform.OS === 'ios' ? 30 : 40}
                  color={focused ? 'white' : 'gray'}
                  style={{ alignSelf: 'center', marginTop: 8 }}
                />
              </View>
            ),
            tabBarIconStyle: {},
          }}
        /> */}
        <Tab.Screen
          name="Statistics"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="setting"
                  size={30}
                  color={focused ? 'white' : '#9594e5'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="infocirlceo"
                  size={30}
                  color={focused ? 'white' : '#9594e5'}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>

  );
}