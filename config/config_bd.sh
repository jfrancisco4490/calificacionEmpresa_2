#!/bin/bash
cd db
# Crear archivo con base de datos sqlite3 en sistema de archivos
sqlite3 CC_calificacionEmpresa.db < creacionTablasBD.sql
cd ..
# Ejecutar tests unitarios
mocha