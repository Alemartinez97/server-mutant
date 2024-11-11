# **Server Mutant API Documentation**

Este proyecto proporciona una API para verificar secuencias de ADN y determinar si una persona es un mutante. La API también incluye funcionalidades de autenticación, registro de usuarios y estadísticas sobre los datos procesados.

## **Iniciar el Servidor**

### Pasos para arrancar el servidor:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor:**
   ```bash
   npm start
   ```

### Pasos para ejecutar las pruebas:

```bash
npm run test
```

### Pasos para iniciar el servidor usando Docker:

```bash
sudo docker-compose -f docker-compose.dev.yml up
```

---

## **Endpoints de la API**

### **1. Endpoint: Mutant**

Verifica si un conjunto de ADN pertenece a un mutante.

#### **POST /mutant**

Este endpoint recibe una secuencia de ADN y verifica si corresponde a un mutante.

##### **Cuerpo de la solicitud:**
```json
{
  "dna": [
    "ATGCGA",
    "CAGTGC",
    "TTATGT",
    "AGAAGG",
    "CCCCTA",
    "TCACTG"
  ]
}
```

##### **Respuestas:**

- **Status**: `200 OK`
  ```json
  {
    "message": "Es un mutante"
  }
  ```

- **Status**: `403 Forbidden`
  ```json
  {
    "message": "No es un mutante"
  }
  ```

#### **Descripción:**
Este endpoint verifica si una secuencia de ADN contiene una combinación mutante. Si se encuentra una secuencia mutante, devuelve el mensaje correspondiente.

---

### **2. Endpoint: Auth (Autenticación y Registro)**

Los endpoints de **Auth** permiten el registro de nuevos usuarios (signup) y el inicio de sesión (login).

#### **POST /signup**

Registra un nuevo usuario en el sistema.

##### **Cuerpo de la solicitud:**
```json
{
  "email": "ale@gmail.com",
  "password": "admin"
}
```

##### **Respuestas:**

- **Status**: `201 Created`
  ```json
  {
    "message": "Signup successful",
    "user": {
      "email": "ale@gmail.com"
    }
  }
  ```

- **Status**: `500 Internal Server Error`
  ```json
  {
    "message": "Error en el registro"
  }
  ```

#### **Descripción:**
Este endpoint crea un nuevo usuario en la base de datos.

#### **POST /login**

Inicia sesión y obtiene un token JWT.

##### **Cuerpo de la solicitud:**
```json
{
  "email": "ale@gmail.com",
  "password": "admin"
}
```

##### **Respuestas:**

- **Status**: `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "token"
  }
  ```

- **Status**: `401 Unauthorized`
  ```json
  {
    "error": "Invalid request!"
  }
  ```

#### **Descripción:**
Este endpoint valida las credenciales del usuario. Si las credenciales son correctas, devuelve un token JWT que puede ser utilizado para autenticar futuras solicitudes.

---

### **3. Endpoint: Stats**

Obtiene estadísticas sobre los mutantes procesados.

#### **GET /stats**

Este endpoint devuelve estadísticas sobre los datos de ADN procesados, incluyendo el número de mutantes y no mutantes.

##### **Respuestas:**

- **Status**: `200 OK`
  ```json
  {
    "count_mutant_dna": 5,
    "count_human_dna": 100,
    "ratio": 0.05
  }
  ```

#### **Descripción:**
Devuelve el número total de secuencias de ADN mutante y humana procesadas, junto con la razón (ratio) de mutantes sobre humanos.

---

### **4. Endpoint: Eliminar Todos los Datos de ADN**

Este endpoint permite eliminar todas las secuencias de ADN almacenadas en la base de datos.

#### **DELETE /delete-all-dna**

Elimina todos los datos de ADN registrados en la base de datos.

##### **Respuestas:**

- **Status**: `200 OK`
  ```json
  {
    "message": "Se eliminaron los Dna"
  }
  ```

- **Status**: `401 Unauthorized`
  ```json
  {
    "error": "Token inválido o no autorizado"
  }
  ```

#### **Descripción:**
Este endpoint elimina todas las secuencias de ADN mutante y humana registradas en la base de datos. Es un endpoint protegido, por lo que requiere autenticación con un token JWT válido.

---

## **Autenticación con JWT**

Los endpoints de **Auth** utilizan **JWT (JSON Web Token)** para autenticar a los usuarios.

### **Incluir el Token en las Solicitudes**

Cuando realices una solicitud a un endpoint protegido (por ejemplo, `/mutant`, `/stats` o `/delete-all-dna`), asegúrate de incluir el token JWT en el encabezado de la solicitud de la siguiente manera:

```bash
Authorization: Bearer <token>
```

Este token se obtiene después de iniciar sesión exitosamente.

---

## **Peticiones con `curl`**

A continuación se presentan ejemplos de cómo realizar peticiones utilizando **curl**.

1. **Registro de Usuario (Signup):**
   ```bash
   curl -X POST http://localhost:4000/signup \
   -H "Content-Type: application/json" \
   -d '{"email": "ale@gmail.com", "password": "admin"}'
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:4000/login \
   -H "Content-Type: application/json" \
   -d '{"email": "ale@gmail.com", "password": "admin"}'
   ```

3. **Verificación de Mutante (POST /mutant):**
   ```bash
   curl -X POST http://localhost:4000/mutant \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer token" \
   -d '{"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]}'
   ```

4. **Obtener Estadísticas (GET /stats):**
   ```bash
   curl -X GET http://localhost:4000/stats \
   -H "Authorization: Bearer token"
   ```

5. **Eliminar Todos los Datos de ADN (DELETE /delete-all-dna):**
   ```bash
   curl -X DELETE http://localhost:4000/delete-all-dna \
   -H "Authorization: Bearer token"
   ```

---

### **Reemplazar la URL para Probar en Local:**
Para las peticiones **curl** o al hacer pruebas en tu entorno local, usa `http://localhost:4000`.

Ejemplo:
```bash
http://localhost:4000/signup
```

