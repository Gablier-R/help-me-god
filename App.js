// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchMovies } from './api/api';
import MovieList from './MovieList';

const App = () => {
  const [topTrendingMovies, setTopTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      const data = await fetchMovies(endpoint);
      setter(data);
    };

    fetchData('/trending/movie/week', setTopTrendingMovies);
    fetchData('/movie/top_rated', setTopRatedMovies);
    fetchData('/tv/top_rated', setTopRatedShows);
  }, []);

  return (
    <View style={styles.container}>
      <MovieList data={topTrendingMovies} title="Top Trending Movies" />
      <MovieList data={topRatedMovies} title="Top Rated Movies" />
      <MovieList data={topRatedShows} title="Top Rated Shows" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'black',
  },
});

export default App;
