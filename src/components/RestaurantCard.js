import React from 'react';
import { Link } from 'react-router-dom';
import backgroundCardResto from '../backgroundcardresto.png';

const RestaurantCard = ({ restaurant, handleRestaurantDetails }) => {
  return (
    <div className="card mb-4 card-img " style={{ backgroundImage: `url(${backgroundCardResto})` }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          {restaurant.photos && (
            <img src={restaurant.photos.url} className="card-img" alt="Restaurant" />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{restaurant.nom}</h5>
            <p className="card-text">Adresse: {restaurant.adresse}</p>
            {restaurant.restaurantspecialite.length > 0 && (
              <div>
                <p className="card-text font-weight-bold">Spécialités:</p>
                <ul className="list-unstyled">
                  {restaurant.restaurantspecialite.map((specialite) => (
                    <li key={specialite.id}>{specialite.specialite.nom}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="card-text">Ouverture: {restaurant.open}</p>
            <p className="card-text">Fermeture: {restaurant.close}</p>
            <Link to={`/restaurant/${restaurant.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
