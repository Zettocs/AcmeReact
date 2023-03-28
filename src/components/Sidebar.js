import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "../css/sidebar.css";
import logo from "../Images/logo.png";
import photo from "../Images/photo.jpg";

const Sidebar = ({
  visible,
  onToggle,
  isConnected,
  updateConnectionStatus,
}) => {
  const [loggedIn, setLoggedIn] = useState(isConnected);
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    setLoggedIn(isConnected);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Erreur lors de la conversion des données utilisateur:",
          error
        );
      }
    }
  }, [isConnected]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setUser({});
    updateConnectionStatus(false);
    history.push("/");
  };

  return (
    <div>
      {visible && (
        <div className="sidebar">
          <button onClick={onToggle} className="toggle-sidebar-button">
            &#8592; {/* Utilisez le caractère de flèche gauche */}
          </button>
          <div className="sidebar-content">
            <Link to="/profil">
              <img src={logo} alt="Logo" className="sidebar-logo" />
            </Link>
            {loggedIn && (
              <>
                <Link to="/profil">
                  <img src={photo} alt="moi" className="sidebar-photo" />
                </Link>
                <div className="user-info">
                  {user.firstname} {user.username}
                </div>
              </>
            )}
            <nav className="sidebar-navigation">
              <ul>
                {loggedIn && (
                  <>
                    <li>
                      <NavLink
                        to="/stock"
                        activeClassName="active-link"
                        className="nav-link"
                      >
                        Stock
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/livraison"
                        activeClassName="active-link"
                        className="nav-link"
                      >
                        Informations de livraison
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/rapport"
                        activeClassName="active-link"
                        className="nav-link"
                      >
                        Rapport
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <div className="connexion-button-container">
            {!loggedIn ? (
              <Link to="/connexion" className="connexion-button">
                Connexion
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="connexion-button logout-button"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      )}
      {!visible && (
        <button onClick={onToggle} className="toggle-sidebar-button-closed">
          &#8594; {/* Utilisez le caractère de flèche droite */}
        </button>
      )}
    </div>
  );
};

export default Sidebar;
