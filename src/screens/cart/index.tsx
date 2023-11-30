import React from 'react';
import { Button, Image, SafeAreaView, ScrollView, Text, View } from '@/ui';
import { Box } from './box';
import { useCartStore } from '@/core/cartStore';

export const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity*item.price, 0)


  return (
    <SafeAreaView className={`flex-1 ${cartItems.length> 0 ? 'justify-start' : 'justify-center'}`}>
      {cartItems.length > 0 ? (
        <>
          <Text className='text-3xl m-6 font-semibold'>Cart</Text>
          <ScrollView>
          {cartItems.map((item, index) => (
            <Box key={index} {...item}/>
          ))}
          </ScrollView>
          <View className='flex-row justify-between mx-4 mb-4 items-center'>
            <View>
              <Text className='text-primary-900'>Selected products({cartItems.length})</Text>
              <Text className='font-semibold text-3xl'>${totalPrice}</Text>
            </View>
            <Button label='Done' variant='secondary'/>
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png' }} className='w-full h-64' />
          <Text className='text-3xl text-center'>Your cart is empty</Text>
          <Text className='text-xl text-neutral-500 text-center m-8'>Looks like you haven't made your choice yet...</Text>
        </>
      )}
    </SafeAreaView>
  );
};
