const express = require("express");
const cors = require("cors");
const connection = require('./db');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// ============ ENDPOINTS PARA RESERVACIONES ============

// Obtener todas las reservaciones
app.get('/reservaciones', (req, res) => {
  const sql = `SELECT * FROM Reservaciones ORDER BY Fecha DESC, Hora DESC`;

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al obtener reservaciones" });
    }
    res.status(200).json(result);
  });
});

// Obtener una reservación por ID
app.get('/reservaciones/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Reservaciones WHERE ID_reservacion = ?`;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al consultar reservación" });
    }
    if (result.length === 0) {
      return res.status(404).json({ mensaje: "Reservación no encontrada" });
    }
    res.status(200).json(result[0]);
  });
});

// Guardar nueva reservación
app.post('/reservaciones', (req, res) => {
  const { Nombre_completo, Telefono, Fecha, Hora, Numero_de_personas, Notas_adicionales } = req.body;
  const sql = `INSERT INTO Reservaciones(Nombre_completo, Telefono, Fecha, Hora, Numero_de_personas, Notas_adicionales)
               VALUES(?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [Nombre_completo, Telefono, Fecha, Hora, Numero_de_personas, Notas_adicionales], (err, result) => {
    if (err) {
      console.error('Error al insertar reservación:', err);
      return res.status(500).json({ mensaje: 'Error al guardar reservación' });
    }
    console.log('Reservación guardada correctamente.');
    res.status(201).json({
      mensaje: 'Reservación guardada exitosamente',
      id: result.insertId
    });
  });
});

// ============ ENDPOINTS PARA MESEROS ============

// Obtener todos los meseros activos
app.get('/meseros', (req, res) => {
  const sql = `SELECT * FROM Meseros WHERE Active = 1 ORDER BY Nombre`;

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al obtener meseros" });
    }
    res.status(200).json(result);
  });
});

// Obtener un mesero por ID
app.get('/meseros/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Meseros WHERE ID_mesero = ?`;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al consultar mesero" });
    }
    if (result.length === 0) {
      return res.status(404).json({ mensaje: "Mesero no encontrado" });
    }
    res.status(200).json(result[0]);
  });
});

// Guardar nuevo mesero
app.post('/meseros', (req, res) => {
  const { Nombre, Apellidos, Telefono, Horario, Salario_mensual } = req.body;
  const sql = `INSERT INTO Meseros(Nombre, Apellidos, Telefono, Horario, Salario_mensual, Active)
               VALUES(?, ?, ?, ?, ?, 1)`;

  connection.query(sql, [Nombre, Apellidos, Telefono, Horario, Salario_mensual], (err, result) => {
    if (err) {
      console.error('Error al insertar mesero:', err);
      return res.status(500).json({ mensaje: 'Error al guardar mesero' });
    }
    console.log('Mesero guardado correctamente.');
    res.status(201).json({
      mensaje: 'Mesero guardado exitosamente',
      id: result.insertId
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
