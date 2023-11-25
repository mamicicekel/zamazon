import React from 'react';
import { View, Image, Text, Button, TouchableOpacity } from '@/ui';
import TapRating from 'react-native-ratings/dist/TapRating';
import { useNavigation } from '@react-navigation/native';

interface ProductItemProps {
  id: number;
  title: string;
  description: string
  price: number;
  discountPercentage: number
  rating: number;
  stock:number
  brand: string
  category: string
  thumbnail: string;
  images: string[];
}

export const QuadrupleBox: React.FC<ProductItemProps> = ({ title, price, description, thumbnail, rating, images,discountPercentage, stock, brand, category }) => {
  const navigation = useNavigation();

  const goToProductPage = () => {
    navigation.navigate('Product', {
      title, price, description, thumbnail, rating, images,discountPercentage, stock, brand, category
    });
  };

  return (
    <TouchableOpacity onPress={goToProductPage}>
      <View className='w-auto mx-4 max-w-[180px]'>
        <Image source={{ uri: thumbnail }} className="h-32 rounded-md object-cover" />
        <TapRating
          isDisabled={true}
          defaultRating={rating}
          size={18}
          starContainerStyle={{ marginBottom: 15, alignSelf: 'flex-start' }}
          showRating={false}
        />
        <Text className='text-gray-700 font-semibold' numberOfLines={1}>
          {title}
        </Text>
        <Text className='text-green-700 font-bold'> ${price}</Text>
        <Button label='Sepete Ekle' variant='outlineAdd' />
      </View>
    </TouchableOpacity>
  );
};
