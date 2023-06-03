import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {  BsGeoAlt } from 'react-icons/bs';
import { FaUtensils } from 'react-icons/fa';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  const initializeMap = () => {
    // Code d'initialisation de la carte
    const mapOptions = {
      center: { lat: parseFloat(restaurant.lattitude), lng: parseFloat(restaurant.longtitude) },
      zoom: 15,
    };

    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    new window.google.maps.Marker({
      position: { lat: parseFloat(restaurant.lattitude), lng: parseFloat(restaurant.longtitude) },
      map: map,
      title: restaurant.nom,
    });
  };

  useEffect(() => {
    if (restaurant) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBC7TrnSJ6ZvaNUaspY6zbmOAbrz5PFF04&callback=initMap`; // Remplacez YOUR_API_KEY par votre clé API Google Maps
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.addEventListener('load', initializeMap);

      return () => {
        script.removeEventListener('load', initializeMap);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant]);

  useEffect(() => {
    // Effectuez une requête pour récupérer les détails du restaurant avec l'ID spécifié
    // Utilisez l'API ou la méthode appropriée pour obtenir les détails du restaurant

    // Exemple de requête factice
    fetch(`http://localhost:8081/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data);
      })
      .catch((error) => {
        console.error('Error fetching restaurant details:', error);
      });
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1><FaUtensils className="mr-2" />{restaurant.nom}</h1>
      <div className="row">
        <div className="col-md-4">
          {restaurant.photos && (
            <img src={restaurant.photos.url} className="img-fluid" alt="Restaurant" />
          )}
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Address</h5>
              <p className="card-text">{restaurant.adresse}</p>
              <h5 className="card-title">Série</h5>
              <p>Nom de la série: {restaurant.series.nom}</p>


              <h5 className="card-title">Spécialité</h5>
              <ul className="list-unstyled">
                {restaurant.restaurantspecialite.map((specialite) => (
                  <li key={specialite.id}>{specialite.specialite.nom}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2><BsGeoAlt className="mr-2" />Localisation</h2>
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
