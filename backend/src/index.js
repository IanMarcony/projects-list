const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");
const app = express();

var projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.log("1");
  console.time(logLabel);

  next(); // Próximo Middleware
  console.log("2");

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id))
    return response.status(404).json({ error: "Invalidate project ID." });

  return next();
}

app.use(express.json());
app.use(cors());
app.use(logRequests);
app.use("/projects/:id", validateProjectId);

app.get("/projects", (req, res) => {
  console.log("3");

  const { title } = req.query;

  const result = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.status(200).json(result);
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);
  return res.status(201).json(project);
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0)
    return res.status(404).json({ error: "Project Not Found" });

  const p = projects[projectIndex];

  return res.status(200).json(p);
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0)
    return res.status(404).json({ error: "Project Not Found" });

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(3333, () => console.log("Server rodando em http://localhost:3333/"));
