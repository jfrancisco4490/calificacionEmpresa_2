DROP TABLE IF EXISTS ALUMNO;
CREATE TABLE IF NOT EXISTS ALUMNO (usuario TEXT PRIMARY KEY NOT NULL, nombres TEXT NOT NULL, apellidos TEXT NOT NULL, extra TEXT);

INSERT INTO ALUMNO (usuario, nombres, apellidos, extra) VALUES('Usr1', 'Nombres1', 'Apellidos1', 'Comentario1');
INSERT INTO ALUMNO (usuario, nombres, apellidos, extra) VALUES('Usr2', 'Nombres2', 'Apellidos2', 'Comentario2');
INSERT INTO ALUMNO (usuario, nombres, apellidos, extra) VALUES('Usr3', 'Nombres3', 'Apellidos3', 'Comentario3');
INSERT INTO ALUMNO (usuario, nombres, apellidos, extra) VALUES('UsrTest', 'NombresTest', 'ApellidosTest', 'ComentarioTest');

DROP TABLE IF EXISTS EMPRESA;
CREATE TABLE IF NOT EXISTS EMPRESA (identificador TEXT PRIMARY KEY NOT NULL, nombre TEXT NOT NULL, direccion TEXT, area TEXT NOT NULL);

INSERT INTO EMPRESA (identificador, nombre, direccion, area) VALUES ('Emp1', 'Empresa1', 'Direccion1', 'Area1');
INSERT INTO EMPRESA (identificador, nombre, direccion, area) VALUES ('Emp2', 'Empresa2', 'Direccion2', 'Area2');
INSERT INTO EMPRESA (identificador, nombre, direccion, area) VALUES ('Emp3', 'Empresa3', 'Direccion3', 'Area3');

DROP TABLE IF EXISTS CALIFICACION;
CREATE TABLE IF NOT EXISTS CALIFICACION (usuario TEXT NOT NULL, identificador TEXT NOT NULL, valor INT NOT NULL, PRIMARY KEY (usuario, identificador));