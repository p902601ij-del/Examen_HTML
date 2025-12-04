const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'salle123',
    database: 'Examen'
});

connection.connect((err) =>{
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectando a MySQL');
});

module.exports = connection;