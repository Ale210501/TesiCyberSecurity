const express = require("express");
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { User, Project, Connection } = require('./models'); // Importa i modelli e le associazioni

const port = process.env.PORT || 3001;

const app = express();


// Middleware per parsare il body delle richieste
app.use(cors({
    origin: 'http://localhost:3000',  // L'indirizzo del tuo frontend
    credentials: true                 // Se utilizzi cookie o sessioni
}));

app.use(express.json()); // bodyParser non è più necessario

// Rotte
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

// Sincronizzare i modelli con il database
sequelize.sync({ alter: true }) // Usa alter per aggiornare il database senza sovrascrivere
    .then(() => {
        console.log('Database e modelli sincronizzati');
    })
    .catch(err => console.error('Errore nella sincronizzazione dei modelli:', err));

// Avviare il server
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
