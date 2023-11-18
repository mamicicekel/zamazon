import { Dimensions } from 'react-native'
import React from 'react'
import { View, Image, Text } from '@/ui'

export const QuadrupleBox = () => {
  const width = Dimensions.get('window').width;

  return (
    <View className='w-1/2'>
      <Image source={require('../../../assets/home-carousel-1.jpeg')} className="h-40 w-auto rounded-md mr-2"/>
      <Text>Product Name</Text>
      <Text>$36.50</Text>
    </View>
  )
}
