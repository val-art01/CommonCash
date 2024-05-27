# CommonCash
the ambitious project to facilitate the management of shared expenses within a group. The main objective of this project is to develop a web/mobile application that will enable users to maintain financial balance within their social circle.

# Installation:  
  1. Clone the repository :
    ```bash
    git clone https://github.com/val-art01/CommonCash.git or git@github.com:val-art01/CommonCash.git
    cd name-projet
    ```

2. Build and launch Docker containers :
    ```bash
    docker-compose up --build
    ```

3. Accessing the frontend application :
    - http://localhost:5173

3. Accessing the swagger :
    - http://localhost:8080/api-docs/

# Configuration:
  Create a .env file with the necessary environment variables (MongoDB connection string, JWT secret).

  ### Backend (Node.js, Express, MongoDB)

    Development of a RESTful API with Node.js and Express, using MongoDB as the database.

    - **commonCash :** `backend/`
    - **Port :** 8080

  ### Frontend (Vue.js)

    User interface developed with Vue.js.

    ```bash
      commonCash/frontend/web/ npm run dev
    ```
    - **commonCash :** `frontend/web/`
    - **Port :** 5173

    ➜  Local:   http://localhost:5173/
    ➜  Network: http://172.20.0.2:5173/

  ### Conteneurisation et Déploiement (Docker)

    Components are containerized using Docker.

    - **Fichiers :**
      - `backend/Dockerfile`
      - `frontend/web/Dockerfile`
    - **Réseau Docker :** app-commonCash


# Running the API:

  ```bash
    commonCash/backend/ npm start
  ```
  ➜  Local:   http://localhost:8080/
  
# Testing:
  Run tests with: npm test

# Dependencies:
  Node.js
  Vue.js
  Express.js
  MongoDB
  Other dependencies specified in package.json

# Contributions

Contributions are welcome! See ["#"] for details.

# Licence

This project is licensed under the [MIT](LICENSE) license.