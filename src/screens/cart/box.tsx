import React from 'react'
import { View, Image, Text, Button } from '@/ui'

interface ProductItemProps {
  title: string;
  price: number;
  thumbnail: string;
}

export const Box: React.FC<ProductItemProps> = ({title, price, thumbnail}) => {

  return (
    <View className='w-full flex-row  items-center px-6'>
      <Image source={require('../../../assets/skincare.png')} className="h-24 w-24 rounded-md object-cover"/>
      <View className='w-full ml-10'>
        <Text className='text-gray-600 font-semibold mb-4'>{title}</Text>
        <View className='flex-row'>
          <Text className='text-green-700 font-bold'> ${price}</Text>
          <View className='flex-row bg-slate-100 rounded-3xl w-16 justify-evenly ml-4'>
            <Text>-</Text>
            <Text>0</Text>
            <Text>+</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
