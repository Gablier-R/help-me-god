// MovieDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchMovieDetails } from '../api/api';

const MovieDetailsScreen = ({ route, navigation }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchMovieDetails(route.params.movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchData();
  }, [route.params.movieId]);

  const handleActorPress = (actorId) => {
    navigation.navigate('ActorDetails', { actorId });
  };

  if (!movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` }} style={styles.banner} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movieDetails.title}</Text>
        <Text style={styles.subtitle}>{`Released: ${movieDetails.release_date}`}</Text>
        <Text style={styles.subtitle}>{`Director: ${movieDetails.director}`}</Text>
        <Text style={styles.categories}>{`Genres: ${movieDetails.genres.join(', ')}`}</Text>
        <Text style={styles.summary}>{movieDetails.overview}</Text>
        <Text style={styles.castTitle}>Cast:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castContainer}>
          {movieDetails.cast.map((actor) => (
            <TouchableOpacity
              key={actor.id}
              style={styles.actorContainer}
              onPress={() => handleActorPress(actor.id)}
            >
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}` }} style={styles.actorImage} />
              <Text style={styles.actorName}>{actor.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#B0B0B0',
    fontSize: 16,
    marginBottom: 10,
  },
  categories: {
    color: '#B0B0B0',
    fontSize: 14,
    marginBottom: 10,
  },
  summary: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  castTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  castContainer: {
    marginTop: 10,
  },
  actorContainer: {
    marginRight: 10,
  },
  actorImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    resizeMode: 'cover',
  },
  actorName: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});

export default MovieDetailsScreen;
