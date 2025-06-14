import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Surface, Divider } from 'react-native-paper';

const actionMovies = [
  {
    title: 'John Wick',
    image: 'https://m.media-amazon.com/images/I/71s88U3x0fL._AC_SY679_.jpg',
  },
  {
    title: 'Mad Max: Fury Road',
    image: 'https://m.media-amazon.com/images/I/71C7QR7r3IL._AC_SY679_.jpg',
  },
  {
    title: 'The Dark Knight',
    image: 'https://m.media-amazon.com/images/I/51k0qa9dK6L._AC_.jpg',
  },
  {
    title: 'Gladiator',
    image: 'https://m.media-amazon.com/images/I/51A1G0NN6QL._AC_.jpg',
  },
];

const comedyMovies = [
  {
    title: 'Deadpool',
    image: 'https://m.media-amazon.com/images/I/71znlKLqDfL._AC_SY679_.jpg',
  },
  {
    title: 'Superbad',
    image: 'https://m.media-amazon.com/images/I/81b6N2FvXtL._AC_SY679_.jpg',
  },
  {
    title: 'The Hangover',
    image: 'https://m.media-amazon.com/images/I/81g6bXL3vXL._AC_SY679_.jpg',
  },
  {
    title: 'Zootopia',
    image: 'https://m.media-amazon.com/images/I/81UZfSUHGLL._AC_SY679_.jpg',
  },
];

const romanceMovies = [
  {
    title: 'The Notebook',
    image: 'https://m.media-amazon.com/images/I/51V8UDUKE9L._AC_.jpg',
  },
  {
    title: 'La La Land',
    image: 'https://m.media-amazon.com/images/I/81z4U5xA41L._AC_SY679_.jpg',
  },
  {
    title: 'Pride & Prejudice',
    image: 'https://m.media-amazon.com/images/I/51ecVEy+rxL._AC_.jpg',
  },
  {
    title: 'A Star is Born',
    image: 'https://m.media-amazon.com/images/I/71kq2tlyuaL._AC_SY679_.jpg',
  },
];

const horrorMovies = [
  {
    title: 'It',
    image: 'https://m.media-amazon.com/images/I/51CbkC4YLzL._AC_.jpg',
  },
  {
    title: 'Get Out',
    image: 'https://m.media-amazon.com/images/I/91O8rPq+l4L._AC_SY679_.jpg',
  },
  {
    title: 'A Quiet Place',
    image: 'https://m.media-amazon.com/images/I/71hfqJtBFVL._AC_SY679_.jpg',
  },
  {
    title: 'The Conjuring',
    image: 'https://m.media-amazon.com/images/I/51ngYoMx07L._AC_.jpg',
  },
];

const dramaMovies = [
  {
    title: 'Forrest Gump',
    image: 'https://m.media-amazon.com/images/I/71HrO9mHrXL._AC_SY679_.jpg',
  },
  {
    title: 'The Shawshank Redemption',
    image: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg',
  },
  {
    title: 'Fight Club',
    image: 'https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg',
  },
  {
    title: 'The Godfather',
    image: 'https://m.media-amazon.com/images/I/51rggtPgmRL._AC_.jpg',
  },
];

const fictionMovies = [
  {
    title: 'Inception',
    image: 'https://m.media-amazon.com/images/I/51s+GhwR6NL._AC_.jpg',
  },
  {
    title: 'Interstellar',
    image: 'https://m.media-amazon.com/images/I/71n4P8F7YWL._AC_SY679_.jpg',
  },
  {
    title: 'Blade Runner 2049',
    image: 'https://m.media-amazon.com/images/I/71kL8MWrVWL._AC_SY679_.jpg',
  },
  {
    title: 'The Matrix',
    image: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
  },
];

const categories = ['Ação', 'Comédia', 'Romance', 'Terror', 'Drama', 'Ficção'];

export default function Home({ navigation }) {
  // Função para ir para a tela Filmes passando a categoria clicada
  function handleCategoryPress(category) {
    navigation.navigate('Filmes', { categoria: category });
  }

  return (
    <Surface style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Bem-vindo ao MKFLIX 🎬
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Organize seus filmes favoritos, agende quando assistir e gerencie seu perfil com facilidade!
            </Text>
          </Card.Content>

          <Card.Cover
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2989/2989837.png' }}
            style={styles.image}
          />
        </Card>

        <Divider style={{ marginVertical: 12, backgroundColor: '#B71C1C' }} />

        <View style={styles.buttonsArea}>
          <Button
            icon="account-circle-outline"
            mode="contained"
            onPress={() => navigation.navigate('Usuário')}
            style={styles.button}
            buttonColor="#B71C1C"
            textColor="#FFF"
          >
            Meu Perfil
          </Button>

          <Button
            icon="calendar-range"
            mode="contained"
            onPress={() => navigation.navigate('Agenda')}
            style={styles.button}
            buttonColor="#B71C1C"
            textColor="#FFF"
          >
            Agendar Filme
          </Button>

          <Button
            icon="star"
            mode="contained"
            onPress={() => navigation.navigate('Favoritos')}
            style={styles.button}
            buttonColor="#B71C1C"
            textColor="#FFF"
          >
            Favoritos
          </Button>

          <Button
            icon="playlist-check"
            mode="outlined"
            onPress={() => navigation.navigate('Agenda')}
            style={styles.button}
            textColor="#B71C1C"
            buttonColor="#000"
            borderColor="#B71C1C"
          >
            Meus Agendamentos
          </Button>
        </View>

        <Divider style={{ marginVertical: 16, backgroundColor: '#B71C1C' }} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Categorias Populares
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {categories.map((item, index) => (
            <Card
              key={index}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(item)}
            >
              <Card.Content>
                <Text style={styles.categoryText}>{item}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <Divider style={{ marginVertical: 20, backgroundColor: '#B71C1C' }} />

        {/* Renderizar carrosséis para cada categoria */}

        <Text variant="titleMedium" style={styles.sectionTitle}>Ação</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {actionMovies.map((movie, index) => (
            <Card key={index} style={styles.movieCard}>
              <Card.Cover source={{ uri: movie.image }} style={styles.movieImage} />
              <Card.Content>
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <Text variant="titleMedium" style={styles.sectionTitle}>Comédia</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {comedyMovies.map((movie, index) => (
            <Card key={index} style={styles.movieCard}>
              <Card.Cover source={{ uri: movie.image }} style={styles.movieImage} />
              <Card.Content>
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <Text variant="titleMedium" style={styles.sectionTitle}>Romance</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {romanceMovies.map((movie, index) => (
            <Card key={index} style={styles.movieCard}>
              <Card.Cover source={{ uri: movie.image }} style={styles.movieImage} />
              <Card.Content>
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <Text variant="titleMedium" style={styles.sectionTitle}>Terror</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {horrorMovies.map((movie, index) => (
            <Card key={index} style={styles.movieCard}>
              <Card.Cover source={{ uri: movie.image }} style={styles.movieImage} />
              <Card.Content>
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <Text variant="titleMedium" style={styles.sectionTitle}>Drama</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {dramaMovies.map((movie, index) => (
            <Card key={index} style={styles.movieCard}>
              <Card.Cover source={{ uri: movie.image }} style={styles.movieImage} />
              <Card.Content>
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <Text variant="titleMedium" style={styles.sectionTitle}>Ficção</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {fictionMovies.map((movie, index) => (
            <Card key={index} style={styles.movieCard}>
              <Card.Cover source={{ uri: movie.image }} style={styles.movieImage} />
              <Card.Content>
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // preto quase total
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#B71C1C', // vermelho escuro
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    color: '#FFF', // branco para destacar no vermelho
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#FFCDD2', // vermelho claro
  },
  image: {
    marginTop: 16,
    resizeMode: 'contain',
    height: 150,
    backgroundColor: 'transparent',
  },
  buttonsArea: {
    gap: 10,
    marginTop: 8,
  },
  button: {
    marginVertical: 4,
  },
  sectionTitle: {
    color: '#B71C1C',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  carousel: {
    flexDirection: 'row',
  },
  categoryCard: {
    marginRight: 10,
    backgroundColor: '#B71C1C',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  categoryText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  movieCard: {
    marginRight: 12,
    width: 140,
    borderRadius: 12,
    backgroundColor: '#000', // fundo preto para destacar
  },
  movieImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 200,
  },
  movieTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
  },
});
