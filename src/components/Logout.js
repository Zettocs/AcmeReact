// Logout.js
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("http://localhost:8000/api/deconnexion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Supprimez le token JWT du localStorage ou du cookie
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");

        onLogout(); // Appelle la fonction onLogout pour mettre à jour l'état de l'utilisateur
        // Redirigez l'utilisateur vers la page de connexion ou l'accueil
        history.push("/connexion");
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    };

    logout();
  }, [history, onLogout]);

  return <div>Vous êtes en train de vous déconnecter...</div>;
};

export default Logout;
