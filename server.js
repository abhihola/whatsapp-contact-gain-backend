const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { sendDailyEmails } = require('./utils/emailSender');

const app = express();
app.use(express.json());
app.use(cors());

// Multi-language setup
i18next.use(Backend).use(middleware.LanguageDetector).init({
  fallbackLng: 'en',
  backend: {
    loadPath: './locales/{{lng}}.json'
  }
});
app.use(middleware.handle(i18next));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to WhatsApp Contact Gain API');
});

// Schedule daily email sending
cron.schedule('0 8 * * *', async () => {
  console.log('Sending daily VCF emails...');
  await sendDailyEmails();
}, {
  timezone: "UTC"
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
