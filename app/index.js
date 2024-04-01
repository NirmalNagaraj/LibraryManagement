// index.js or your main component
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';
import Dashboard from './dashboard';

import DashboardWrapper from '../components/DashboardWrapper';
import StudentDashboard from './studentdashboard';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} /> 
      <Stack.Screen name="DashboardWrapper" component={DashboardWrapper} /> 

      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default Index;