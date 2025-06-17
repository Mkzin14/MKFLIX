import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Surface,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    const dados = await AsyncStorage.getItem('usuarios');
    if (dados) setUsuarios(JSON.parse(dados));
  };

  const validarData = (data) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(data)) return false;

    const [dia, mes, ano] = data.split('/').map(Number);
    const dataObj = new Date(ano, mes - 1, dia);
    return (
      dataObj.getFullYear() === ano &&
      dataObj.getMonth() === mes - 1 &&
      dataObj.getDate() === dia
    );
  };

  const salvar = async () => {
    if (!nome || !email || !telefone || !nascimento || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    if (!validarData(nascimento)) {
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato DD/MM/AAAA.');
      return;
    }

    let novaLista;
    if (editandoId !== null) {
      novaLista = usuarios.map(u =>
        u.id === editandoId
          ? { id: editandoId, nome, email, telefone, nascimento, senha }
          : u
      );
      setEditandoId(null);
    } else {
      const novoUsuario = {
        id: Date.now(),
        nome,
        email,
        telefone,
        nascimento,
        senha,
      };
      novaLista = [...usuarios, novoUsuario];
    }

    setUsuarios(novaLista);
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista));
    limparCampos();
  };

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setNascimento('');
    setSenha('');
    setEditandoId(null);
  };

  const editar = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setTelefone(usuario.telefone);
    setNascimento(usuario.nascimento);
    setSenha(usuario.senha);
    setEditandoId(usuario.id);
  };

  const excluir = async (id) => {
    const novaLista = usuarios.filter(u => u.id !== id);
    setUsuarios(novaLista);
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Surface style={styles.surface}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Card style={styles.cardForm}>
            {/* Aqui removi o acesso fonts.medium.fontFamily */}
            <Card.Title title="Cadastro de Usuários" titleStyle={styles.title} />
            <Card.Content>
              <TextInput
                label="Nome"
                mode="outlined"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
                placeholderTextColor="#D32F2F"
              />
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#D32F2F"
              />
              <TextInput
                label="Telefone"
                mode="outlined"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#D32F2F"
              />
              <TextInput
                label="Data de Nascimento"
                mode="outlined"
                value={nascimento}
                onChangeText={setNascimento}
                placeholder="DD/MM/AAAA"
                style={styles.input}
                placeholderTextColor="#D32F2F"
              />
              <TextInput
                label="Senha"
                mode="outlined"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#D32F2F"
              />

              <Button mode="contained" onPress={salvar} style={styles.botao}>
                {editandoId ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </Card.Content>
          </Card>

          <FlatList
            data={usuarios}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Title
                  title={item.nome}
                  subtitle={item.email}
                  titleStyle={{ color: '#D32F2F' }}
                  subtitleStyle={{ color: '#9A0007' }}
                />
                <Card.Content>
                  <Text style={{ color: '#4A0000' }}>Telefone: {item.telefone}</Text>
                  <Text style={{ color: '#4A0000' }}>Nascimento: {item.nascimento}</Text>
                  <Text style={{ color: '#4A0000' }}>Senha: {item.senha}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button textColor="#D32F2F" onPress={() => editar(item)}>Editar</Button>
                  <Button textColor="#D32F2F" onPress={() => excluir(item.id)}>Excluir</Button>
                </Card.Actions>
              </Card>
            )}
          />
        </ScrollView>
      </Surface>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    backgroundColor: '#FFEBEE', // vermelho claro suave para fundo
    padding: 10,
  },
  scroll: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#D32F2F', // vermelho forte
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    borderColor: '#D32F2F',
  },
  botao: {
    marginTop: 10,
    backgroundColor: '#D32F2F',
  },
  card: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#D32F2F',
    borderWidth: 1,
  },
  cardForm: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    paddingBottom: 10,
    borderColor: '#D32F2F',
    borderWidth: 1,
  },
});
