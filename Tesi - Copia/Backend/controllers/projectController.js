const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');

// Creare un nuovo progetto correlato all'utente loggato
exports.createProject = async (req, res) => {
    const { nome, descrizione } = req.body;
    const user = req.user;
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Controlla se l'utente ha già un progetto
        const existingProject = await Project.findOne({ where: { userId: user.id } });
        if (existingProject) {
            return res.status(400).json({ message: 'Hai già creato un progetto. Non puoi crearne un altro.' });
        }
        const project = await Project.create({
            userId: user.id,
            nome: nome,
            descrizione: descrizione
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
};

// Visualizza i dati del progetto
exports.getProject = async (req, res) => {
    const user = req.user;
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const project = await Project.findOne({
            where: { userId: user.id },
            include: [{ model: User, as: 'user' }],
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({
            nome: project.nome,
            descrizione: project.descrizione
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project data', error: error.message });
    }
};

// Modifica un progetto
exports.updateProject = async (req, res) => {
    const { nome, descrizione } = req.body;
    const user = req.user;

    try {
        const project = await Project.findOne({
            where: { userId: user.id }, // Cerca il progetto dell'utente
            include: [{ model: User, as: 'user' }]
        });
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Aggiorna il progetto
        await project.update({
            nome: nome,
            descrizione: descrizione
        });

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
};


// Elimina un progetto
exports.deleteProject = async (req, res) => {
    const user = req.user;

    try {
        const project = await Project.findOne({
            where: { userId: user.id }, // Cerca il progetto dell'utente
            include: [{ model: User, as: 'user' }]
        });
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Elimina il progetto
        await project.destroy();

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
};


