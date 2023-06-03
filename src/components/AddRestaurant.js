import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddRestaurant = () => {
  const [nom, setNom] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [open, setOpen] = useState('');
  const [close, setClose] = useState('');
  const [adresse, setAdresse] = useState('');
  const [weekend, setWeekend] = useState('');
  const [rank, setRank] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [zone, setZone] = useState('');
  const [serie, setSerie] = useState('');
  const [user, setUser] = useState('');
  const [specialites, setSpecialites] = useState([]);
  const [zones, setZones] = useState([]);
  const [series, setSeries] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchSpecialites();
    fetchZones();
    fetchSeries();
    fetchUsers();
  }, []);

  const fetchSpecialites = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/specialites/');
      setSpecialites(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/zones/');
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSeries = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/series/');
      setSeries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/users/');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const restaurant = {
      nom,
      Lattitude: latitude,
      Longtitude: longitude,
      open,
      close,
      adresse,
      weekend,
      rank,
      specialite,
      zone,
      serie,
      user,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081/api/restaurants/save',
        restaurant
      );
      console.log(response.data);
      // Réinitialiser les champs du formulaire
      setNom('');
      setLatitude('');
      setLongitude('');
      setOpen('');
      setClose('');
      setAdresse('');
      setWeekend('');
      setRank('');
      setSpecialite('');
      setZone('');
      setSerie('');
      setUser('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Ajouter un restaurant</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="nom">
          <Form.Label>Nom :</Form.Label>
          <Form.Control
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="latitude">
          <Form.Label>Latitude :</Form.Label>
          <Form.Control
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="longitude">
          <Form.Label>Longitude :</Form.Label>
          <Form.Control
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="open">
          <Form.Label>Ouverture :</Form.Label>
          <Form.Control
            type="time"
            value={open}
            onChange={(e) => setOpen(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="close">
          <Form.Label>Fermeture :</Form.Label>
          <Form.Control
            type="time"
            value={close}
            onChange={(e) => setClose(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="adresse">
          <Form.Label>Adresse :</Form.Label>
          <Form.Control
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="weekend">
          <Form.Label>Weekend :</Form.Label>
          <Form.Control
            type="text"
            value={weekend}
            onChange={(e) => setWeekend(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="rank">
          <Form.Label>Rank :</Form.Label>
          <Form.Control
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="specialite">
          <Form.Label>Spécialité :</Form.Label>
          <Form.Control
            as="select"
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            required
          >
            <option value="">Sélectionnez une spécialité</option>
            {specialites.map((specialite) => (
              <option key={specialite.id} value={specialite.id}>
                {specialite.nom}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="zone">
          <Form.Label>Zone :</Form.Label>
          <Form.Control
            as="select"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
          >
            <option value="">Sélectionnez une zone</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.nom}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="serie">
          <Form.Label>Série :</Form.Label>
          <Form.Control
            as="select"
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
            required
          >
            <option value="">Sélectionnez une série</option>
            {series.map((serie) => (
              <option key={serie.id} value={serie.id}>
                {serie.nom}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="user">
          <Form.Label>Utilisateur :</Form.Label>
          <Form.Control
            as="select"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          >
            <option value="">Sélectionnez un utilisateur</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter
        </Button>
      </Form>
    </div>
  );
};

export default AddRestaurant;
