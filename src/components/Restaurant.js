import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import RestaurantDetail from './RestaurantDetails'; // Import du composant RestaurantDetail

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/restaurants/')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRestaurantDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleDetailsClose = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="app">
      <h1 className="text-2xl font-bold mb-4">Restaurant List</h1>
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          handleRestaurantDetails={handleRestaurantDetails}
        />
      ))}

      {selectedRestaurant && (
        <div className="mt-4">
          <RestaurantDetail id={selectedRestaurant.id} /> {/* Passer l'ID du restaurant à RestaurantDetail */}
          <button className="btn btn-primary" onClick={handleDetailsClose}>
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default Restaurant;
