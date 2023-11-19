import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Categories, ProductsList } from '@/screens';

export type CategoryStackParamList = {
  Categories: undefined;
  ProductsList: undefined;
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const CategoryNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Categories" component={Categories} options={{
          headerShown: true,
        }}/>
        <Stack.Screen name="ProductsList" component={ProductsList} options={{
          headerShown: true,
        }}/>
    </Stack.Navigator>
  );
};
