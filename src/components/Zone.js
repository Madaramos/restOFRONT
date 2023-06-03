import React, { useState, useEffect } from 'react';
import { FiDelete, FiEdit } from 'react-icons/fi';
import backgroundCardVille from '../backgroundcardville.png';

const Card = ({ onSave, villeOptions }) => {
  const [name, setName] = useState('');
  const [ville, setVille] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleVilleChange = (event) => {
    setVille(event.target.value);
  };

  const handleSave = () => {
    const newItem = {
      nom: name,
      ville: {
        id: parseInt(ville),
      },
    };

    fetch('http://localhost:8081/api/zones/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        onSave(data);
        setName('');
        setVille('');
      })
      .catch((error) => {
        console.error('Error adding zone:', error);
      });
  };

  return (
    <div
      className="card p-4 rounded shadow"
      style={{
        backgroundImage: `url(${backgroundCardVille})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0.5rem',
        padding: '1rem',
      }}
    >
      <h2 className="text-xl font-bold mb-4">Add Zone</h2>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter zone name"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <select
        value={ville}
        onChange={handleVilleChange}
        className="p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">Select a ville</option>
        {villeOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nom}
          </option>
        ))}
      </select>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded btn btn-primary"
      >
        Save
      </button>
    </div>
  );
};

const ListView = ({ items, onDelete, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditedName(item.nom);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditedName('');
  };

  const handleUpdate = () => {
    if (editedName.trim() !== '') {
      onUpdate({ ...editingItem, nom: editedName.trim() });
      setEditingItem(null);
      setEditedName('');
    }
  };

  return (
    <div className="list-view">
      <h2 className="text-xl font-bold mb-4">List View</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-gray-300 rounded"
            style={{
              backgroundImage: `url(${backgroundCardVille})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0.5rem',
              padding: '1rem',
            }}
          >
            {editingItem && editingItem.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="p-2 border border-gray-300 rounded mb-2"
                />
                <div>
                  <button
                    onClick={handleUpdate}
                    className="btn btn-primary me-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="font-bold mb-2">ID: {item.id}</div>
                <div className="mb-2">Name: {item.nom}</div>
                <div className="text-sm">
                  Ville: {item.ville ? item.ville.nom : ''}
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-primary me-2"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger"
                  >
                    <FiDelete />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

function Zone() {
  const [listItems, setListItems] = useState([]);
  const [villeOptions, setVilleOptions] = useState([]);

  const handleSave = (item) => {
    setListItems([...listItems, item]);
  };

  const handleDelete = (itemId) => {
    fetch(`http://localhost:8081/api/zones/delete/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setListItems(listItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error('Error deleting zone:', error);
      });
  };

  const handleUpdate = (updatedItem) => {
    fetch(
      `http://localhost:8081/api/zones/update/${updatedItem.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setListItems((prevItems) =>
          prevItems.map((item) =>
            item.id === data.id ? data : item
          )
        );
      })
      .catch((error) => {
        console.error('Error updating zone:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:8081/api/villes')
      .then((response) => response.json())
      .then((data) => {
        setVilleOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching ville options:', error);
      });

    fetch('http://localhost:8081/api/zones/')
      .then((response) => response.json())
      .then((data) => {
        console.log('List items:', data);
        setListItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="app">
      <Card onSave={handleSave} villeOptions={villeOptions} />
      <ListView
        items={listItems}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Zone;
