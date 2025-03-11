// server.js - Main backend setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Ensure this line is included
const { sendDailyEmails } = require('./utils/emailSender');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Test route to check if server is running
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); // Ensure this route is correctly included

// Schedule daily email sending
cron.schedule('0 8 * * *', async () => {
  console.log('Sending daily VCF emails...');
  await sendDailyEmails();
}, {
  timezone: "UTC"
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
