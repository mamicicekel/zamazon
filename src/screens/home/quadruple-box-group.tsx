import { Dimensions } from 'react-native'
import React from 'react'
import { View, Text } from '@/ui'
import { QuadrupleBox } from './quadruple-box';

export const QuadrupleBoxGroup = () => {
  const width = Dimensions.get('window').width;

  return (
    <View className='flex-1 justify-center items-center pl-2'>
      <Text className='self-start text-xl font-semibold mt-10 mb-3'>Sana Özel Fırsatlar</Text>
      <View className='flex-row'>
        <QuadrupleBox/>
        <QuadrupleBox/>
      </View>
      <View className='flex-row mt-5'>
        <QuadrupleBox/>
        <QuadrupleBox/>
      </View>
    </View>
  )
}
