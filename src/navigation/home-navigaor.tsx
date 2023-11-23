import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Home, Search } from '@/screens';

export type CategoryStackParamList = {
  Home: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
        }}/>
         <Stack.Screen name="Search" component={Search} options={{
          headerShown: false,
        }}/>
    </Stack.Navigator>
  );
};
