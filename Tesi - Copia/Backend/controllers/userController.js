const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');

// Crea un nuovo utente
exports.signup = async (req, res) => {
    const { nome, email, password } = req.body;
    // Controlla se l'email è già registrata
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ nome, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login utente
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', req.body); // Log delle credenziali
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Genera un token di sessione
        const sessionToken = jwt.sign({ id: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
        user.sessionToken = sessionToken;
        await user.save();

        res.status(200).json({ message: 'Login successful', sessionToken });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

// Logout utente
exports.logout = async (req, res) => {
    const user = req.user;    
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.sessionToken = null;
        await user.save();
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during logout', error: error.message });
    }
};

// Visualizza i dati dell'utente
exports.getUser = async (req, res) => {
    const user = req.user;
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            nome: user.nome,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
};

// Modifica i dati dell'utente
exports.updateUser = async (req, res) => {
    const { nome, email, password } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.nome = nome;
            user.email = email;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Elimina un utente
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Resetta la password
exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPassword = Math.random().toString(36).substr(2, 10);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        // Invia email con la nuova password
        await sendEmail(user.email, 'Password Reset', `Your new password is: ${newPassword}`);

        res.json({ message: 'Password reset successfully. New password has been sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};

// Modifica la password
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await User.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password' });
    }
};
