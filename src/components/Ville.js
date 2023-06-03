import React, { useState, useEffect } from 'react';
import { FiDelete, FiEdit, FiMapPin } from 'react-icons/fi';
import backgroundCardVille from '../backgroundcardville.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ onSave }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
    setInputValue('');
  };

  return (
    <div
      className="card p-4 bg-white rounded shadow"
      style={{
        backgroundImage: `url(${backgroundCardVille})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        borderRadius: '0.5rem',
        padding: '1rem',
      }}
    >
      <h2 className="text-lg font-semibold">Ajouter une ville</h2>
      <div className="flex mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="flex-grow px-2 py-1 rounded-l border"
        />
        <button onClick={handleSave} className="btn btn-primary">
          Ajouter
        </button>
      </div>
    </div>
  );
};

const ListView = ({ items, onDelete, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditedValue(item.nom);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditedValue('');
  };

  const handleUpdate = () => {
    if (editedValue.trim() !== '') {
      onUpdate({ ...editingItem, nom: editedValue.trim() });
      setEditingItem(null);
      setEditedValue('');
    }
  };

  return (
    <div className="list-view mt-4">
      <h2 className="text-lg font-semibold">Listes Des villes :</h2>
      <ul className="mt-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="py-2 border-b rounded shadow d-flex justify-content-between"
            style={{
              backgroundImage: `url(${backgroundCardVille})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '0.5rem',
              width: '100%', // Added width to occupy 100% of the page
            }}
          >
            {editingItem === item ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editedValue}
                  onChange={(event) => setEditedValue(event.target.value)}
                  className="flex-grow px-2 py-1 rounded-l border"
                />
                <button onClick={handleUpdate} className="btn btn-primary">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <FiMapPin className="mr-2" />
                  <span style={{ marginLeft: '0.5rem' }}>{item.nom}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-primary"
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
          </li>
        ))}
      </ul>
    </div>
  );
};

function Ville() {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/villes')
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = data.map((item) => ({
          ...item,
          backgroundImage: `url(${item.image})`,
        }));
        setListItems(updatedItems);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSaveItem = (item) => {
    fetch('http://localhost:8081/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom: item }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListItems([...listItems, data]);
      })
      .catch((error) => {
        console.error('Error adding city:', error);
      });
  };

  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:8081/api/delete/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setListItems(listItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error('Error deleting city:', error);
      });
  };

  const handleUpdateItem = (item) => {
    fetch(`http://localhost:8081/api/update/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setListItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id === updatedItem.id ? updatedItem : prevItem
          )
        );
      })
      .catch((error) => {
        console.error('Error updating city:', error);
      });
  };

  return (
    <div className="app p-4 bg-red">
      <Card onSave={handleSaveItem} />
      <ListView
        items={listItems}
        onDelete={handleDeleteItem}
        onUpdate={handleUpdateItem}
      />
    </div>
  );
}

export default Ville;
