import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Input, SafeAreaView, View, Text } from '@/ui';
import { useNavigation } from '@react-navigation/native';
import { PrevQueryBox } from './prevQueryBox';

interface Search {
  id: number;
  query: string;
}

export const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<Search[]>([]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const newSearch: Search = {
        id: searchHistory.length + 1,
        query: searchQuery,
      };
      setSearchHistory([newSearch, ...searchHistory]);
      navigation.navigate('ProductList', { searchQuery: searchQuery });
    }
  };

  return (
    <SafeAreaView>
      <View className="mx-4 flex flex-row">
        <Text onPress={() => navigation.goBack()} className="text-3xl mt-2">
          {'<'}
        </Text>
        <View className="flex-1 ml-4">
          <Input
            placeholder="Search products"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      <Text className="mx-4 text-xl font-semibold">Arama Geçmişi</Text>
      
      <FlatList
        data={searchHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PrevQueryBox query={item.query}/>
        )}
        numColumns={3}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{gap:10}}
        style={{margin:10}}
      />
    </SafeAreaView>
  );
};
