const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve React static files if we build them (Optional for production)
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Here you would typically integrate Nodemailer, SendGrid, or save to DB.
    console.log(`New contact submission from ${name} (${email}): ${message}`);
    
    // Render the EJS success template
    res.render('success', { name });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
