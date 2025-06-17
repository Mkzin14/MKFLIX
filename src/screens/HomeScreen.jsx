import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Text,
  Title,
  TextInput,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const API_KEY = 'f1e8fa0272423671d5528de396569e53';
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

  useEffect(() => {
    buscarFilmes();
    carregarFavoritos();
  }, []);

  const buscarFilmes = async () => {
    try {
      const response = await axios.get(API_URL);
      setFilmes(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setCarregando(false);
    }
  };

  const carregarFavoritos = async () => {
    try {
      const dados = await AsyncStorage.getItem('favoritos');
      if (dados) {
        setFavoritos(JSON.parse(dados));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const toggleFavorito = async (filme) => {
    const jaExiste = favoritos.find((f) => f.id === filme.id);

    let novosFavoritos;
    if (jaExiste) {
      novosFavoritos = favoritos.filter((f) => f.id !== filme.id);
    } else {
      const novoFilme = {
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        vote_average: filme.vote_average,
      };
      novosFavoritos = [...favoritos, novoFilme];
    }

    setFavoritos(novosFavoritos);
    await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
  };

  const estaNosFavoritos = (id) => {
    return favoritos.some((f) => f.id === id);
  };

  const filmesFiltrados = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>🎬 MKFLIX - Filmes Populares</Title>

      <TextInput
        label="Pesquisar filme..."
        value={busca}
        onChangeText={setBusca}
        mode="outlined"
        style={styles.input}
        placeholder="Digite o nome do filme"
        placeholderTextColor="#FFCDD2"
      />

      {carregando ? (
        <ActivityIndicator animating size="large" style={{ marginTop: 40 }} color="#D32F2F" />
      ) : (
        filmesFiltrados.map((filme) => (
          <Card key={filme.id} style={styles.card}>
            {filme.poster_path && (
              <Card.Cover
                source={{ uri: `https://image.tmdb.org/t/p/w500${filme.poster_path}` }}
                style={styles.image}
              />
            )}
            <Card.Content>
              <Text style={styles.movieTitle}>{filme.title}</Text>
              <Text style={styles.movieSub}>Lançamento: {filme.release_date || 'Data desconhecida'}</Text>
            </Card.Content>

            <IconButton
              icon={estaNosFavoritos(filme.id) ? 'heart' : 'heart-outline'}
              color={estaNosFavoritos(filme.id) ? 'red' : '#FFCDD2'}
              size={26}
              onPress={() => toggleFavorito(filme)}
              style={{ alignSelf: 'center' }}
            />
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    color: '#FFF',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  image: {
    height: 400,
    resizeMode: 'cover',
  },
  movieTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  movieSub: {
    color: '#FFCDD2',
    textAlign: 'center',
  },
});
