import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Home, Search, ProductList, Product } from '@/screens';

export type CategoryStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductList: undefined;
  Product: undefined;
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
        <Stack.Screen name="ProductList" component={ProductList} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Product" component={Product} options={{
          headerShown: false,
        }}/>
    </Stack.Navigator>
  );
};
