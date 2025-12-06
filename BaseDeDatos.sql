create DATABASE Examen;
use Examen;


CREATE TABLE Reservaciones (
    ID_reservacion INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_completo VARCHAR(150) NOT NULL,
    Telefono VARCHAR(20),
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    Numero_de_personas INT NOT NULL,
    Notas_adicionales TEXT
) ENGINE=InnoDB;

INSERT INTO Reservaciones (Nombre_completo, Telefono, Fecha, Hora, Numero_de_personas, Notas_adicionales) VALUES
('Juan Pérez García', '555-123-4567', '2025-12-10', '19:30:00', 4, 'Mesa cerca de la ventana.'),
('María López Ruiz', '555-987-6543', '2025-12-10', '21:00:00', 2, NULL),
('Carlos Sánchez Torres', '555-333-1111', '2025-12-11', '14:00:00', 6, 'Cumpleaños, traer pastel.'),
('Ana Rodríguez Castro', '555-777-2222', '2025-12-11', '20:30:00', 3, 'Necesita silla de bebé.'),
('Luis Gómez Herrera', '555-444-5555', '2025-12-12', '13:00:00', 5, 'Reserva de negocios.');
SELECT * FROM Reservaciones;


CREATE TABLE Meseros (
    ID_mesero INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50),
    Telefono VARCHAR(20),
    Horario VARCHAR(100),
    Salario_mensual DECIMAL(10, 2),
    Active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

INSERT INTO Meseros (Nombre, Apellidos, Telefono, Horario, Salario_mensual, Active) VALUES
('Elena', 'Vargas Soto', '555-600-1001', 'Lunes a Viernes 16:00-23:00', 12500.00, TRUE),
('Ricardo', 'Méndez Cruz', '555-600-1002', 'Martes a Sábado 18:00-01:00', 13000.50, TRUE),
('Sofia', 'Ramos Diaz', '555-600-1003', 'Miércoles a Domingo 12:00-17:00', 11800.00, TRUE),
('Andrés', 'Jiménez León', '555-600-1004', 'Jueves a Martes 17:00-22:00', 12750.75, TRUE),
('Gabriela', 'Núñez Bravo', '555-600-1005', 'Viernes y Sábado 19:00-02:00', 14000.00, TRUE);
SELECT * FROM Meseros;


CREATE TABLE Mesas (
    ID_mesa INT PRIMARY KEY AUTO_INCREMENT,
    ID_reservacion INT UNIQUE,
    Informacion_extra VARCHAR(255),
    FOREIGN KEY (ID_reservacion) REFERENCES Reservaciones(ID_reservacion)
) ENGINE=InnoDB;
INSERT INTO Mesas (ID_reservacion, Informacion_extra) VALUES
(1, 'Mesa 5, capacidad para 4 personas.'),
(2, 'Mesa 12, capacidad para 2 personas, rincón.'),
(NULL, 'Mesa 8, capacidad para 4 personas, cerca de cocina.'),
(NULL, 'Mesa 1, capacidad para 8 personas, VIP.'),
(NULL, 'Mesa 15, capacidad para 2 personas, terraza.');
SELECT * FROM Mesas;

CREATE TABLE Detalle_Meseros_Mesas (
    ID_mesero INT NOT NULL,
    ID_mesa INT NOT NULL,
    PRIMARY KEY (ID_mesero, ID_mesa),
    FOREIGN KEY (ID_mesero) REFERENCES Meseros(ID_mesero),
    FOREIGN KEY (ID_mesa) REFERENCES Mesas(ID_mesa)
) ENGINE=InnoDB;
INSERT INTO Detalle_Meseros_Mesas (ID_mesero, ID_mesa) VALUES
(1, 1), 
(1, 3), 
(2, 2),
(3, 4), 
(4, 5); 
SELECT * FROM Detalle_Meseros_Mesas;



