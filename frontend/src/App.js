import React, { useState, useEffect } from "react";
import "./styles/global.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  function requestAllProject() {
    api.get("/projects").then((res) => {
      console.log(res.data);
      setProjects(res.data);
    });
  }

  async function handleAddProject() {
    const response = await api.post("/projects", {
      title,
      owner,
    });
    const project = response.data;
    console.log(project);

    setProjects([...projects, project]);
  }

  //Pegando os Projetos da API
  useEffect(() => {
    requestAllProject();
  }, []);

  return (
    <div>
      <header>
        <h1>Projects From Backend</h1>
      </header>

      <main style={{ padding: 10 }}>
        <section style={{ margin: "0 auto" }}>
          <ul>
            {projects.map((project) => (
              <li key={project.id} style={{ color: "#f25" }}>
                Projeto: {project.title} - Proprietário: {project.owner}
              </li>
            ))}
          </ul>
        </section>

        <fieldset
          style={{
            width: "2rem",
            height: "max-content",
            margin: "0 auto",
            marginTop: 10,
            padding: 5,
          }}
        >
          <form style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="Insira o nome do projeto"
              defaultValue={""}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              style={{ padding: 5 }}
            />
            <input
              type="text"
              placeholder="Insira o nome do proprietário"
              defaultValue={""}
              value={owner}
              onChange={({ target }) => setOwner(target.value)}
              style={{ padding: 5 }}
            />
            <button type="button" onClick={handleAddProject}>
              Salvar
            </button>
          </form>
        </fieldset>
      </main>
    </div>
  );
}

export default App;
