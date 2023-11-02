import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe o hook de navegação
import { fetchActorDetails, fetchActorMoviesAndSeries } from '../api/api';

const ActorDetailsScreen = ({ route }) => {
  const navigation = useNavigation(); // Inicialize o hook de navegação

  const [actorDetails, setActorDetails] = useState(null);
  const [actorMovies, setActorMovies] = useState({ movies: [], series: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchActorDetails(route.params.actorId);
        setActorDetails(details);

        const moviesAndSeries = await fetchActorMoviesAndSeries(route.params.actorId);
        setActorMovies(moviesAndSeries);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    };

    fetchData();
  }, [route.params.actorId]);

  const navigateToMovieDetails = (movieId) => {
    // Navegue para a tela de detalhes do filme
    navigation.navigate('MovieDetailsScreen', { movieId });
  };

  const navigateToSeriesDetails = (seriesId) => {
    // Navegue para a tela de detalhes da série
    navigation.navigate('SeriesDetailsScreen', { seriesId });
  };

  if (!actorDetails || !actorMovies) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${actorDetails.profile_path}` }} style={styles.actorImage} />
      <Text style={styles.actorName}>{actorDetails.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.subtitle}>{`Birthday: ${actorDetails.birthday}`}</Text>
        <Text style={styles.subtitle}>{`Place of Birth: ${actorDetails.place_of_birth}`}</Text>
        <Text style={styles.biography}>{actorDetails.biography}</Text>

        <Text style={styles.moviesTitle}>Movies:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesContainer}>
          {actorMovies.movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieContainer}
              onPress={() => navigateToMovieDetails(movie.id)}
            >
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }} style={styles.movieImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.moviesTitle}>Series:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesContainer}>
          {actorMovies.series.map((series) => (
            <TouchableOpacity
              key={series.id}
              style={styles.movieContainer}
              onPress={() => navigateToSeriesDetails(series.id)}
            >
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${series.poster_path}` }} style={styles.movieImage} />
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
      backgroundColor: 'black',
      padding: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    loadingText: {
      color: 'white',
      fontSize: 18,
    },
    actorImage: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    actorName: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
    },
    detailsContainer: {
      padding: 15,
    },
    subtitle: {
      color: '#B0B0B0',
      fontSize: 16,
      marginBottom: 10,
    },
    biography: {
      color: 'white',
      fontSize: 16,
      marginBottom: 20,
    },
    moviesTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    moviesContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    movieContainer: {
      marginRight: 10,
    },
    movieImage: {
      width: 100,
      height: 150,
      borderRadius: 10,
      resizeMode: 'cover',
    },
  });

export default ActorDetailsScreen;
