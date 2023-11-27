import React, {useState} from 'react'
import { View, Image, Text, Button } from '@/ui'
import { useCartStore, useQuantity } from '@/core/cartStore';
import { Trash } from '@/ui';

interface ProductItemProps {
  title: string;
  price: number;
  thumbnail: string;
}

export const Box: React.FC<ProductItemProps> = ({title, price, thumbnail}) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const quantity = useQuantity(title);
  
  return (
    <View className='w-full flex-row  items-center px-6 mb-4'>
      <Image source={thumbnail} className="h-24 w-24 rounded-md object-cover"/>
      <View className='w-full ml-10'>
        <Text className='text-gray-600 font-semibold mb-4'>{title}</Text>
        <View className='flex-row items-center'>
          <Text className='text-green-700 font-bold'> ${price*quantity}</Text>
          <View className='flex-row bg-slate-100 rounded-3xl w-16 justify-evenly ml-4'>
            <Text onPress={() => decreaseQuantity({ title, price, thumbnail })}>-</Text>
            <Text >{quantity}</Text>
            <Text onPress={() => increaseQuantity({ title, price, thumbnail })}>+</Text>
          </View>
          <View className='ml-24'>
          <Trash onPress={() => removeFromCart({title, price, thumbnail})} />
          </View>
        </View>
      </View>
    </View>
  )
}
