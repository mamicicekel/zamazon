import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView } from '@/ui';
import { FlatList, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { QuadrupleBox } from '../home/quadruple-box';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type RootStackParamList = {
  ProductsList: { selectedCategory: string, displayCategory: string };
};

type ProductsListRouteProp = RouteProp<RootStackParamList, 'ProductsList'>;

type ProductsListProps = {
  route: ProductsListRouteProp;
};
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}
export const ProductsList: React.FC<ProductsListProps> = ({ route }) => {
  const selectedCategory = route.params?.selectedCategory;
  const displayCategory = route.params?.displayCategory;

  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: displayCategory,
    });
  }, [selectedCategory, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${selectedCategory}`);
          setProducts(response.data.products);
          setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  

  const renderItem = ({ item }: { item: Product }) => {
      return <QuadrupleBox title={item.title} price={item.price} thumbnail={item.thumbnail} rating={item.rating} />;
  };

  return (
    <ScrollView className='py-4'>
      {
        loading ? <SkeletonPlaceholder>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap:'wrap'}}>
          {[0, 1, 2, 3, 4, 5 ,6,7 ,8].map((_, index) => (
            <View key={index} style={{ marginHorizontal: 10 }}>
              <View style={{ width: Dimensions.get('screen').width/2.3, height: 160, borderRadius: 10 }} />
              <View style={{ marginTop: 8, width: 100, height: 16, borderRadius: 8 }} />
              <View style={{ marginTop: 4, width: 80, height: 16, borderRadius: 8 }} />
              <View style={{ marginTop: 4, width: 60, height: 16, borderRadius: 8, marginBottom:10 }} />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder> : <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10 }}
      />
      }
    </ScrollView>
  );
};