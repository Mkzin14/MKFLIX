import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  Surface,
  Menu,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgendaForm({ navigation, route }) {
  const filme = route.params?.filme || {};
  const [dataPlanejada, setDataPlanejada] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState('');
  const [comentario, setComentario] = useState('');

  const [menuPrioridadeVisible, setMenuPrioridadeVisible] = useState(false);
  const [menuStatusVisible, setMenuStatusVisible] = useState(false);

  const prioridades = ['Alta', 'Média', 'Baixa'];
  const statusList = ['Não iniciado', 'Em andamento', 'Assistido'];

  function validarData(data) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(data)) return false;

    const [dia, mes, ano] = data.split('/').map(Number);
    const dataObj = new Date(ano, mes - 1, dia);
    return (
      dataObj.getFullYear() === ano &&
      dataObj.getMonth() === mes - 1 &&
      dataObj.getDate() === dia
    );
  }

  async function salvarAgenda() {
    if (!dataPlanejada || !prioridade || !status) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    if (!validarData(dataPlanejada)) {
      Alert.alert('Erro', 'Data inválida. Use o formato DD/MM/AAAA.');
      return;
    }

    const novaAgenda = {
      id: filme.id,
      title: filme.title,
      poster_path: filme.poster_path,
      dataPlanejada,
      prioridade,
      status,
      comentario,
    };

    try {
      const armazenado = await AsyncStorage.getItem('agenda');
      const lista = armazenado ? JSON.parse(armazenado) : [];

      const duplicado = lista.some(item => item.id === novaAgenda.id);
      if (duplicado) {
        Alert.alert('Aviso', 'Este filme já está agendado.');
        return;
      }

      lista.push(novaAgenda);
      await AsyncStorage.setItem('agenda', JSON.stringify(lista));
      Alert.alert('Sucesso', 'Filme agendado com sucesso!');
      navigation.goBack();
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'Não foi possível salvar a agenda.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Surface style={styles.surface}>
        <Card style={styles.card}>
          <Card.Title
            title="Agendar Filme"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text variant="titleMedium" style={styles.titulo}>
              {filme.title || 'Filme não encontrado'}
            </Text>

            <TextInput
              label="Data Planejada (DD/MM/AAAA)"
              mode="outlined"
              value={dataPlanejada}
              onChangeText={setDataPlanejada}
              style={styles.input}
              keyboardType="numeric"
              activeOutlineColor="#D32F2F"
              placeholderTextColor="#B71C1C"
            />

            {/* Prioridade com Menu */}
            <Menu
              visible={menuPrioridadeVisible}
              onDismiss={() => setMenuPrioridadeVisible(false)}
              anchor={
                <TextInput
                  label="Prioridade"
                  mode="outlined"
                  value={prioridade}
                  style={styles.input}
                  onFocus={() => setMenuPrioridadeVisible(true)}
                  activeOutlineColor="#D32F2F"
                  placeholderTextColor="#B71C1C"
                />
              }
            >
              {prioridades.map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setPrioridade(item);
                    setMenuPrioridadeVisible(false);
                  }}
                  title={item}
                  titleStyle={{ color: '#D32F2F' }}
                />
              ))}
            </Menu>

            {/* Status com Menu */}
            <Menu
              visible={menuStatusVisible}
              onDismiss={() => setMenuStatusVisible(false)}
              anchor={
                <TextInput
                  label="Status"
                  mode="outlined"
                  value={status}
                  style={styles.input}
                  onFocus={() => setMenuStatusVisible(true)}
                  activeOutlineColor="#D32F2F"
                  placeholderTextColor="#B71C1C"
                />
              }
            >
              {statusList.map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setStatus(item);
                    setMenuStatusVisible(false);
                  }}
                  title={item}
                  titleStyle={{ color: '#D32F2F' }}
                />
              ))}
            </Menu>

            <TextInput
              label="Comentário (opcional)"
              mode="outlined"
              value={comentario}
              onChangeText={setComentario}
              style={styles.input}
              multiline
              activeOutlineColor="#D32F2F"
              placeholderTextColor="#B71C1C"
            />

            <Button
              mode="contained"
              onPress={salvarAgenda}
              buttonColor="#D32F2F"
              style={styles.botaoSalvar}
              textColor="#FFF"
            >
              Salvar Agenda
            </Button>
          </Card.Content>
        </Card>
      </Surface>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF0F0', // fundo claro com tom vermelho suave
  },
  card: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFF', // branco para contraste
  },
  cardTitle: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  titulo: {
    marginBottom: 10,
    color: '#B71C1C',
    fontWeight: '600',
  },
  input: {
    marginBottom: 12,
    color: '#000',
  },
  botaoSalvar: {
    marginTop: 10,
  },
});
