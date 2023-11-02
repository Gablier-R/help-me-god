// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  useEffect(() => {
    // Lógica para buscar os filmes mais bem avaliados
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=pt-BR'
        );
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    // Lógica para buscar as séries mais bem avaliadas
    const fetchTopRatedSeries = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/tv/top_rated?api_key=YOUR_API_KEY&language=pt-BR'
        );
        setTopRatedSeries(response.data.results);
      } catch (error) {
        console.error('Error fetching top-rated series:', error);
      }
    };

    fetchTopRatedMovies();
    fetchTopRatedSeries();
  }, []);

  const renderMovieCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Top Rated Movies</Text>
      <FlatList
        data={topRatedMovies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.sectionTitle}>Top Rated Series</Text>
      <FlatList
        data={topRatedSeries}
        renderItem={renderMovieCard}
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
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
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

export default HomeScreen;
