import React from 'react';
import { Image, SafeAreaView, Text, View } from '@/ui';
import { Box } from './box';
import { useCartStore } from '@/core/cartStore';

export const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <SafeAreaView className={`flex-1 ${cartItems.length> 0 ? 'justify-start' : 'justify-center'}`}>
      {cartItems.length > 0 ? (
        <View>
          <Text className='text-3xl m-6 font-semibold'>Cart</Text>
          {cartItems.map((item, index) => (
            <Box key={index} {...item} />
          ))}
          
        </View>
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
