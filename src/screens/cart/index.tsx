import { Dimensions } from 'react-native'
import React from 'react'
import { Image, SafeAreaView, Text } from '@/ui'

export const Cart = () => {
  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Image source={{uri:'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png'}} className='w-full h-64'/> 
      <Text className='text-3xl'>Your cart is empty</Text>
      <Text className='text-xl text-neutral-500 text-center m-8'>Looks like you haven't made your choice yet...</Text>

    </SafeAreaView>
  )
}