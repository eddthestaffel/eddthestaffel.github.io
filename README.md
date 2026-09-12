# Sistema de registro de tanques

Sistema web para el registro y administración de información de tanques.
El proyecto permite almacenar, consultar, modificar y eliminar registros utilizando dos alternativas de almacenamiento: LocalStorage y Firebase Firestore.

# Tecnologías usadas

Se hizo uso de HTML para la estructura principal, CSS para el diseño y javascript para el comportamiento.
En cuando a los almacenamientos se usó Firebase Firestore para guardado en la nube y LocaStorage para guardado local.

# Funcionalidades 

## El sistema permite:

- Registrar nuevos tanques.
- Consultar los tanques registrados.
- Editar información de los tanques.
- Eliminar tanques.
- Validar el número de serie.
- Evitar números de serie duplicados.
- Almacenar información de forma local mediante LocalStorage.
- Almacenar información en la nube mediante Firebase Firestore.

# Datos a registrar 

Cada tanque debe registrar 

- Número de serie, debe contener exactamente 6 dígitos
- Nombre, obviamente es un campo obligatorio
- Generación correspondiente
- País, los tanques no nacen solos

# Almacenamiento local

## La alternativa LocalStorage almacena los datos directamente en el navegador del usuario.

Características:

- No requiere conexión a Internet.
- Los datos permanecen almacenados en el navegador.
- Los datos no se comparten automáticamente con otros dispositivos.
- Si se cambia de computador o navegador, los datos locales no estarán disponibles.

## Almacenamiento en la nube
La alternativa Firebase utiliza Cloud Firestore como base de datos.

Características: 

- Los datos se almacenan en servidores externos.
- Requiere conexión a Internet para comunicarse con Firebase.
- Los datos pueden consultarse desde diferentes dispositivos.
- Permite trabajar con información compartida entre usuarios según la configuración de permisos.

# Funcionamiento general
El usuario interactúa con la aplicación desde el navegador.

## LocalStorage
Usuario
   ↓
Aplicación web
   ↓
LocalStorage
   ↓
Aplicación web
   ↓
Usuario

Los datos se guardan directamente en el navegador, por lo que no necesitan viajar por Internet.

## Firebase Firestore
Usuario
   ↓
Aplicación web
   ↓
Internet
   ↓
Firebase Firestore
   ↓
Internet
   ↓
Aplicación web
   ↓
Usuario

En este caso, la aplicación se comunica con Firebase para guardar y consultar la información.

# Diferencia entre las dos alternativas

| Característica         | LocalStorage                  | Firebase Firestore        |
| ---------------------- | ----------------------------- | ------------------------- |
| Ubicación de los datos | Navegador                     | Nube                      |
| Internet               | No necesario                  | Necesario                 |
| Cambio de computador   | No conserva los datos locales | Puede acceder a los datos |
| Datos compartidos      | No                            | Sí                        |
| Servicio Cloud         | No                            | Sí                        |

# Objetivo del proyecto

El objetivo es demostrar la diferencia entre un sistema de almacenamiento local y uno basado en servicios Cloud, utilizando el mismo sistema de registro como ejemplo.

LocalStorage representa una solución donde los datos permanecen en el dispositivo del usuario, mientras que Firebase Firestore representa una solución donde los datos se almacenan en la nube y pueden ser accesibles desde diferentes dispositivos.

# Autor
Eduardo Cona
- Proyecto desarrollado como parte de la asignatura de Cloud Computing.
