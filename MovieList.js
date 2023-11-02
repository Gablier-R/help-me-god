// MovieList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const MovieList = ({ data, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    marginLeft: 10,
  },
  card: {
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 180,
  },
});

export default MovieList;
