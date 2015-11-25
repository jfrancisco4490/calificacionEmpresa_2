#!/bin/bash
cd ../db
# Crear archivo de base de datos sqlite3 en el sistema de archivos (y cargar el esquema)
sqlite3 CC_calificacionEmpresa.db < creacionTablasBD.sql
cd ..
# Ejecutar tests unitarios
mocha