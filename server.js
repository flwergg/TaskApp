const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// --- Datos en memoria (intencional) ---
let tasks = [];
let loggedIn = false;

// --- Login ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validación débil a propósito
  if (email && password) {
    loggedIn = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// --- Middleware de autenticación ---
app.use((req, res, next) => {
  if (!loggedIn && req.path !== '/login') {
    return res.status(403).json({ message: 'No autorizado' });
  }
  next();
});

// --- Crear tarea ---
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Título requerido' });
  }

  tasks.push(title);
  res.json({ success: true });
});

// --- Listar tareas ---
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// --- Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});