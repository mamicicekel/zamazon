import React from 'react'
import { View, Image, Text, Button } from '@/ui'
import TapRating from 'react-native-ratings/dist/TapRating';

interface ProductItemProps {
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export const QuadrupleBox: React.FC<ProductItemProps> = ({title, price, thumbnail, rating}) => {

  return (
    <View className='w-auto mx-4 max-w-[180px]'>
      <Image source={{uri: thumbnail}} className="h-32 rounded-md object-cover"/>
      <TapRating
      isDisabled={true}
      defaultRating={rating}
      size={18}
      starContainerStyle={{marginBottom:15, alignSelf:'flex-start'}}
      />
      <Text className='text-gray-700 font-semibold' numberOfLines={1}>{title}</Text>
      <Text className='text-green-700 font-bold'> ${price}</Text>
      <Button label='Sepete Ekle' variant='outlineAdd'/>
    </View>
  )
}
