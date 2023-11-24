import { Dimensions, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, Input, Text, View } from '@/ui';
import { fetchProducts } from '@/api';
import { QuadrupleBox } from '../home/quadruple-box';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type ProductListRouteParams = {
  searchQuery: string;
};

interface Product {
  id: number;
  title: any;
  price: number;
  thumbnail: string;
  rating: number;
}

export const ProductList = () => {
  const route = useRoute<RouteProp<Record<string, ProductListRouteParams>, string>>();
  const searchQuery = route.params?.searchQuery || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const renderItem = ({ item }: { item: Product }) => (
    <QuadrupleBox title={item.title} price={item.price} thumbnail={item.thumbnail} rating={item.rating} />
  );

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap:'wrap'}}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <View key={index} style={{ marginHorizontal: 10 }}>
          <View style={{ width: Dimensions.get('screen').width/2.5, height: 160, borderRadius: 10 }} />
          <View style={{ marginTop: 8, width: 100, height: 16, borderRadius: 8 }} />
          <View style={{ marginTop: 4, width: 80, height: 16, borderRadius: 8 }} />
          <View style={{ marginTop: 4, width: 60, height: 16, borderRadius: 8 }} />
        </View>
      ))}
    </View>
  </SkeletonPlaceholder>
  );

  return (
    <SafeAreaView className='flex-1'>
      <Input value={searchQuery} onFocus={() => navigation.navigate('Search')} />
      {loading ? (
        renderSkeleton()
      ) : filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 10 }}
        />
      ) : (
        <View className='justify-center items-center flex-1'>
          <Text className='text-2xl'>{`No products found for "${searchQuery}"`}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
