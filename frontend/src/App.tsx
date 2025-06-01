import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ title: 'Travel Assistant' }}
              />
              <Stack.Screen 
                name="Map" 
                component={MapScreen}
                options={{ title: 'Explore' }}
              />
              <Stack.Screen 
                name="Itinerary" 
                component={ItineraryScreen}
                options={{ title: 'My Itinerary' }}
              />
              <Stack.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{ title: 'My Profile' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App; 