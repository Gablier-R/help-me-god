// MovieBanner.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const MovieBanner = ({ backdropPath }) => (
  <Image
    source={{ uri: `https://image.tmdb.org/t/p/w500${backdropPath}` }}
    style={styles.movieBanner}
  />
);

const styles = StyleSheet.create({
  movieBanner: {
    width: 300,
    height: 150,
    margin: 10,
    borderRadius: 10,
  },
});

export default MovieBanner;
