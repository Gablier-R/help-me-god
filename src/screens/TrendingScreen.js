// TrendingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchTopTrendingMovies } from '../api/api';

const TrendingScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await fetchTopTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error('Error setting trending movies:', error);
      }
    };

    fetchData();
  }, []);

  const handleMoviePress = (movieId) => {
    // Navegue para a tela de detalhes com o ID do filme
    navigation.navigate('MovieDetailsScreen', { movieId });
  };

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
      <View style={styles.card}>
        <View style={styles.categoriesContainer}>
          {item.genres && item.genres.map((genre) => (
            <Text key={genre.id} style={styles.category}>{genre.name}</Text>
          ))}
        </View>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} style={styles.banner} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trendingMovies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  card: {
    marginBottom: 15,
  },
  categoriesContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  category: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5,
  },
  banner: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TrendingScreen;
