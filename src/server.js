const express = require('express');
const app = express();

// Définir le dossier contenant les fichiers statiques
app.use(express.static('public'));

// Vos autres routes et middleware viendront après cette déclaration

// Exemple de route pour la récupération des images
app.get('/api/images/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(filename, { root: './public/images' });
  });

// Autres routes...

// Lancer le serveur
app.listen(8081, () => {
  console.log('Serveur Express écoute sur le port 8081');
});
