import React, { useState, useEffect } from "react";

const Profil = ({ updateConnectionStatus }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        updateConnectionStatus(true);
      } catch (error) {
        console.error(
          "Erreur lors de la conversion des données utilisateur:",
          error
        );
      }
    } else {
      updateConnectionStatus(false);
    }
  }, [updateConnectionStatus]);

  return (
    <div>
      <h1>Profil</h1>
      {user.username && user.firstname ? (
        <p>
          {user.username} {user.firstname}
        </p>
      ) : (
        <p>Vous n'êtes pas connecté</p>
      )}
    </div>
  );
};

export default Profil;
