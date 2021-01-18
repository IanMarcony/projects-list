import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import api from "./services/api";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    api.get("projects").then((res) => setProjects(res.data));
  }, []);

  async function handlePressAddProject() {
    if (owner === "" && title === "") return alert("Preencha os campos");
    const response = await api.post("projects", { title, owner });
    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar backgroundColor="#7159c1" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de projetos</Text>
        {projects.length > 0 ? (
          <FlatList
            keyExtractor={(project) => project.id}
            data={projects}
            renderItem={({ item }) => (
              <Text style={styles.project}>
                Nome do projeto: {item.title} - Proprietário: {item.owner}
              </Text>
            )}
          />
        ) : (
          <Text style={styles.project}>Sem Projetos no Backend</Text>
        )}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Insira o Nome do Projeto"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            value={owner}
            placeholder="Insira o Autor do Projeto"
            onChangeText={(text) => setOwner(text)}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={() => handlePressAddProject()}
          >
            <Text style={styles.buttonText}>Adicionar Projeto</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
  },
  project: {
    color: "#FFF",
    fontSize: 20,
    margin: 5,
  },

  form: {
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#FFF",
    color: "#333",
    alignSelf: "stretch",
    margin: 20,
    borderRadius: 4,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    borderRadius: 4,

    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default App;
