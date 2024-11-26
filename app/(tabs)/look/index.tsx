import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const data = [
  {
    title: '2024년 10월',
    looks: [
      {
        id: '1',
        image: 'https://via.placeholder.com/150', // 이미지 URL
        description: '한강공원 러닝',
      },
      {
        id: '2',
        image: 'https://via.placeholder.com/150',
        description: '한강공원 러닝',
      },
      {
        id: '3',
        image: 'https://via.placeholder.com/150',
        description: '한강공원 러닝',
      },
      {
        id: '4',
        image: 'https://via.placeholder.com/150',
        description: '한강공원 러닝',
      },
    ],
  },
  {
    title: '2024년 9월',
    looks: [
      {
        id: '5',
        image: 'https://via.placeholder.com/150',
        description: '한강공원 러닝',
      },
      {
        id: '6',
        image: 'https://via.placeholder.com/150',
        description: '한강공원 러닝',
      },
    ],
  },
];

const LookbookScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = (screenWidth - 40) / 2;
  const containerHeight = containerWidth * 1.5; // 전체 컨테이너 높이
  const descriptionHeight = containerHeight / 4.5; // description 높이를 전체 높이의 1/4.5로 설정

  const renderLook = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={[styles.imageContainer, { width: containerWidth, height: containerHeight - descriptionHeight }]}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
        />
      </View>
      <View style={[styles.description, { height: descriptionHeight }]}>
        <Text style={styles.descriptionText}>🏃 {item.description}</Text>
      </View>
    </View>
  );

  const renderSection = ({ item }: { item: any }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <FlatList
        data={item.looks}
        renderItem={renderLook}
        keyExtractor={(look) => look.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={renderSection}
        keyExtractor={(section) => section.title}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5FCE8',
  },
  container: {
    backgroundColor: '#F5FCE8',
    padding: 10,
    paddingTop: 60,
  },
  section: {
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: (Dimensions.get('window').width - 40) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    borderColor: '#121212',
    borderWidth: 2,
  },
  imageContainer: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // 이미지 로딩 전 배경색
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  description: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  descriptionText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
  },
});

export default LookbookScreen;
