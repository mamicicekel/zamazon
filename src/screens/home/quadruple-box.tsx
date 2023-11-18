import { Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { View, Image, Text, Button } from '@/ui'
import { fetchSmartPhones } from '@/api';
import TapRating from 'react-native-ratings/dist/TapRating';

interface ProductItemProps {
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export const QuadrupleBox: React.FC<ProductItemProps> = ({title, price, thumbnail, rating}) => {
  const width = Dimensions.get('window').width;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await fetchSmartPhones(); // api.js dosyasındaki fetchData fonksiyonunu kullan
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View className='w-auto mx-4'>
      <Image source={{uri: thumbnail}} className="h-40  rounded-md "/>
      <TapRating
      isDisabled={true}
      defaultRating={rating}
      size={18}
      starContainerStyle={{marginBottom:15, alignSelf:'flex-start'}}
      />
      <Text className='text-gray-700 font-semibold'>{title}</Text>
      <Text className='text-green-700 font-bold'> ${price}</Text>
      <Button label='Sepete Ekle' variant='outlineAdd'/>
    </View>
  )
}
