// Login.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ updateConnectionStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Réponse de l'API:", response);

      if (response.ok) {
        const data = await response.json();

        // Stockez le token JWT dans le localStorage ou dans un cookie
        localStorage.setItem("jwtToken", data.token);
        // Stockez également les données utilisateur dans le localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        updateConnectionStatus(true);
        // Ajoutez cette ligne pour rediriger vers la page de bienvenue
        history.push("/welcome");
      } else {
        // Gérez les erreurs de connexion
        console.error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
