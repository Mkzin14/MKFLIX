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
  IconButton,
  useTheme,
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

  const theme = useTheme();

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
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Surface style={styles.surface}>
        <Card style={styles.card} elevation={4}>
          <Card.Title
            title="Agendar Filme"
            titleStyle={styles.cardTitle}
            left={(props) => <IconButton {...props} icon="calendar-clock" color="#D32F2F" />}
          />
          <Card.Content>
            <Text variant="titleLarge" style={styles.titulo}>
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
              left={<TextInput.Icon name="calendar" color="#D32F2F" />}
              placeholder="Ex: 25/12/2024"
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
                  right={<TextInput.Icon name="menu-down" color="#D32F2F" />}
                  placeholder="Selecione prioridade"
                  placeholderTextColor="#B71C1C"
                  showSoftInputOnFocus={false} // evita teclado
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
                  right={<TextInput.Icon name="menu-down" color="#D32F2F" />}
                  placeholder="Selecione status"
                  placeholderTextColor="#B71C1C"
                  showSoftInputOnFocus={false}
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
              style={[styles.input, { minHeight: 80 }]}
              multiline
              activeOutlineColor="#D32F2F"
              placeholder="Deixe suas observações aqui..."
              placeholderTextColor="#B71C1C"
              left={<TextInput.Icon name="note-text" color="#D32F2F" />}
            />

            <Button
              mode="contained"
              onPress={salvarAgenda}
              buttonColor="#D32F2F"
              style={styles.botaoSalvar}
              textColor="#FFF"
              icon="check-circle"
              contentStyle={{ flexDirection: 'row-reverse' }}
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
    padding: 20,
    backgroundColor: '#F9F9F9', // fundo claro neutro
  },
  card: {
    borderRadius: 14,
    backgroundColor: '#FFF',
  },
  cardTitle: {
    color: '#D32F2F',
    fontWeight: '700',
    fontSize: 22,
  },
  titulo: {
    marginBottom: 16,
    color: '#B71C1C',
    fontWeight: '600',
    fontSize: 18,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    fontSize: 16,
  },
  botaoSalvar: {
    marginTop: 20,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
});
