import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fetchTopRatedContent, fetchMoviesByGenre } from '../api/api';

const TopRatedScreen = ({ navigation }) => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [fantasyMovies, setFantasyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [thrillerMovies, setThrillerMovies] = useState([]);
  const [warMovies, setWarMovies] = useState([]);
  const [westernMovies, setWesternMovies] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const topRatedMoviesData = await fetchTopRatedContent('movie');
        setTopRatedMovies(topRatedMoviesData);

        const actionMoviesData = await fetchMoviesByGenre(28); // ID do gênero de Ação
        setActionMovies(actionMoviesData);

        const comedyMoviesData = await fetchMoviesByGenre(35); // ID do gênero de Comédia
        setComedyMovies(comedyMoviesData);

        const dramaMoviesData = await fetchMoviesByGenre(18); // ID do gênero de Drama
        setDramaMovies(dramaMoviesData);

        const fantasyMoviesData = await fetchMoviesByGenre(14); // ID do gênero de Fantasia
        setFantasyMovies(fantasyMoviesData);

        const horrorMoviesData = await fetchMoviesByGenre(27); // ID do gênero de Horror
        setHorrorMovies(horrorMoviesData);

        const romanceMoviesData = await fetchMoviesByGenre(10749); // ID do gênero de Romance
        setRomanceMovies(romanceMoviesData);

        const sciFiMoviesData = await fetchMoviesByGenre(878); // ID do gênero de Ficção Científica
        setSciFiMovies(sciFiMoviesData);

        const thrillerMoviesData = await fetchMoviesByGenre(53); // ID do gênero de Thriller
        setThrillerMovies(thrillerMoviesData);

        const warMoviesData = await fetchMoviesByGenre(10752); // ID do gênero de Guerra
        setWarMovies(warMoviesData);

        const westernMoviesData = await fetchMoviesByGenre(37); // ID do gênero de Western
        setWesternMovies(westernMoviesData);

      } catch (error) {
        console.error('Error setting movies data:', error);
      }
    };

    fetchTopRated();
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', { movieId: item.id })}>
      <View style={styles.card}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Top Rated Movies</Text>
      <FlatList
        data={topRatedMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Action Movies</Text>
      <FlatList
        data={actionMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Comedy Movies</Text>
      <FlatList
        data={comedyMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Drama Movies</Text>
      <FlatList
        data={dramaMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Fantasy Movies</Text>
      <FlatList
        data={fantasyMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Horror Movies</Text>
      <FlatList
        data={horrorMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Romance Movies</Text>
      <FlatList
        data={romanceMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Science Fiction Movies</Text>
      <FlatList
        data={sciFiMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Thriller Movies</Text>
      <FlatList
        data={thrillerMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>War Movies</Text>
      <FlatList
        data={warMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      <Text style={styles.header}>Western Movies</Text>
      <FlatList
        data={westernMovies}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

    </ScrollView>
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
