const nodemailer = require('nodemailer');

// Configurazione per Nodemailer per l'invio email usando Outlook
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',  // Host SMTP per Outlook
    port: 587,                        // Porta per TLS
    secure: false,                    // Non utilizzare SSL (porta 465)
    auth: {
        user: 'cyberkillchainproject@outlook.it', // Inserisci la tua email
        pass: 'ciao123ciao',         // Inserisci la tua password
    },
});

// Funzione per inviare email
exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'cyberkillchainproject@outlook.it', // Inserisci la tua email
            to,
            subject,
            text,
        });
        console.log('Email inviata con successo!');
    } catch (error) {
        console.error('Errore nell\'invio della email:', error);
    }
};
