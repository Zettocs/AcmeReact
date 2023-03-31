// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profil from "./components/Profil";
import Stock from "./components/Stock";
import Livraison from "./components/Livraison";
import Rapport from "./components/Rapport";
import ShoppingList from "./components/ShoppingList";
import Test from "./components/Ping";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarWidth = sidebarVisible ? "20%" : "0";

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const updateConnectionStatus = (status) => {
    setIsConnected(status);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar
          visible={sidebarVisible}
          onToggle={toggleSidebar}
          isConnected={isConnected}
          updateConnectionStatus={updateConnectionStatus}
        />
        <div className="main-content" style={{ marginLeft: sidebarWidth }}>
          <Switch>
            <Route path="/connexion">
              <Login updateConnectionStatus={updateConnectionStatus} />
            </Route>
            <Route path="/deconnexion">
              <Logout updateConnectionStatus={updateConnectionStatus} />
            </Route>
            <Route path="/profil">
              <Profil updateConnectionStatus={updateConnectionStatus} />
            </Route>
            <Route path="/stock">
              <ShoppingList updateConnectionStatus={updateConnectionStatus} />
            </Route>
            <Route path="/livraison">
              <Livraison />
            </Route>
            <Route path="/rapport">
              <Rapport />
            </Route>
            <Route path="/ping">
              <Test />
            </Route>
          </Switch>
          
        </div>
      </div>
    </Router>
  );
};

export default App;
