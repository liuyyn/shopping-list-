import React from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap is now included in the app by importing this

function App() {
  return (
    <div className="App">
      <AppNavbar />
    </div>
  );
}

export default App;
