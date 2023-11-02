import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchTopRatedContent } from '../api/api';

const TopRatedScreen = ({ navigation }) => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await fetchTopRatedContent('movie');
        setTopRatedMovies(movies);

        const series = await fetchTopRatedContent('tv');
        setTopRatedSeries(series);
      } catch (error) {
        console.error('Error setting top rated movies and series:', error);
      }
    };

    fetchData();
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', { movieId: item.id })}>
      <View style={styles.card}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Rated Movies</Text>
      <FlatList
        data={topRatedMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Top Rated Series</Text>
      <FlatList
        data={topRatedSeries}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  card: {
    marginHorizontal: 10,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    marginTop: 5,
  },
});

export default TopRatedScreen;
