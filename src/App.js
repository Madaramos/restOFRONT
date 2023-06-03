import './App.css';
import { BsFillHouseFill, BsMap, BsGeoAlt, BsFillGridFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Ville from './components/Ville';
import Map from './components/map';
import Restaurant from './components/Restaurant';
import RestaurantDetails from './components/RestaurantDetails';
import AddRestaurant from './components/AddRestaurant';
import Zone from './components/Zone';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/map" className="nav-link">
              <BsFillHouseFill className="mr-2" /> Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ville" className="nav-link">
              <BsMap className="mr-2" />Villes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/zone" className="nav-link">
              <BsGeoAlt className="mr-2" />Zones
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/restaurant" className="nav-link">
              <BsFillGridFill className="mr-2" />Restaurants
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addrestaurant" className="nav-link">
              <BsFillGridFill className="mr-2" />Add Restaurant
              </Link>
            </li>
          </ul>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/ville" element={<Ville />} />
            <Route path="/zone" element={<Zone />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/addrestaurant" element={<AddRestaurant />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
