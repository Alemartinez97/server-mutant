# Welcome to server-mutant


## steps to start the server
    > npm i -s
    > npm start
    > npm run test
    
## steps to start the server by docker
    > sudo docker-compose -f docker-compose.dev.yml up

## **1. Endpoint: Mutant**
El endpoint de **/mutant** se utiliza para verificar si un conjunto de cadenas de ADN pertenece a un mutante.

### **POST /mutant**

Verifica si un ADN corresponde a un mutante. El ADN se envía en el cuerpo de la solicitud.

#### **Request Body**:
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

#### **Response**:
- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "message": "Es un mutante"
  }
  ```

- **Status**: `403 Forbidden`
- **Body**:
  ```json
  {
    "message": "No es un mutante"
  }
  ```

#### **Descripción**:
Este endpoint recibe una matriz de cadenas de ADN y verifica si hay una secuencia mutante. Si encuentra una, devuelve un mensaje indicando que la persona es un mutante. Si no encuentra una secuencia mutante, devuelve un mensaje indicando que no lo es.

---

## **2. Endpoint: Auth (Autenticación y Registro)**

Los endpoints de **Auth** se usan para realizar el registro de un nuevo usuario (signup) y el inicio de sesión (login).

### **POST /signup**

Registra un nuevo usuario en el sistema.

#### **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

#### **Response**:
- **Status**: `201 Created`
- **Body**:
  ```json
  {
    "message": "Signup successful",
    "user": {
      "email": "user@example.com"
    }
  }
  ```

- **Status**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "message": "Error en el registro"
  }
  ```

#### **Descripción**:
Este endpoint crea un nuevo usuario.

### **POST /login**

Permite iniciar sesión en el sistema. Devuelve un token JWT si las credenciales son correctas.

#### **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

#### **Response**:
- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "message": "Login successful",
    "token": "token"
  }
  ```

- **Status**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "error": "Invalid request!"
  }
  ```

#### **Descripción**:
Este endpoint valida las credenciales del usuario. Si el login es exitoso, genera y devuelve un **token JWT**. Si las credenciales son incorrectas, devuelve un error de autorización.

---

## **3. Endpoint: Stats**
El endpoint de **/stats** se utiliza para obtener estadísticas sobre el número de mutantes y no mutantes procesados.

### **GET /stats**

Obtiene estadísticas de la base de datos sobre cuántos mutantes y no mutantes se han procesado.

#### **Response**:
- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "count_mutant_dna": 5,
    "count_human_dna": 100,
    "ratio": 0.05
  }
  ```

#### **Descripción**:
Este endpoint devuelve las estadísticas de la base de datos:
- **count_mutant_dna**: Número total de secuencias de ADN mutante procesadas.
- **count_human_dna**: Número total de secuencias de ADN humanas procesadas.
- **ratio**: La razón de ADN mutante frente a ADN humano.

---

# **Autenticación con JWT**
Para los endpoints de **Auth**, se utiliza **JWT (JSON Web Token)**. Los usuarios deben iniciar sesión con sus credenciales y, si son válidas, recibirán un token que se utilizará para autenticarse en los endpoints protegidos.

### **Incluir el Token en las Solicitudes**
Cuando se realiza una solicitud a un endpoint protegido (por ejemplo, `/mutant` o `/stats`), el token debe incluirse en la cabecera de la solicitud:

```bash
Authorization: Bearer <your_token_here>
```

Este token se obtiene al hacer login y se usa para acceder a los endpoints protegidos.

---

### peticiones con  `curl`**

1. **Registro (Signup)**:
   ```bash
   curl -X POST http://localhost:4000/signup \
   -H "Content-Type: application/json" \
   -d '{"email": "user@gmail.com", "password": "121232"}'
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:4000/login \
   -H "Content-Type: application/json" \
   -d '{"email": "user@gmail.com", "password": "121232"}'
   ```

3. **Verificación Mutante (POST /mutant)**:
   ```bash
   curl -X POST http://localhost:4000/mutant \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <token>" \
   -d '{"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]}'
   ```

4. **Obtener estadísticas (GET /stats)**:
   ```bash
   curl -X GET http://localhost:4000/stats \
   -H "Authorization: Bearer <token>"
   ```

