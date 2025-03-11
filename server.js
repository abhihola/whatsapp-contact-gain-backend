const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { sendDailyEmails } = require('./utils/emailSender');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Homepage route (Fixes "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Welcome to WhatsApp Contact Gain API!');
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Log all incoming requests (Debugging)
app.use((req, res, next) => {
  console.log(`🔹 Request received: ${req.method} ${req.url}`);
  next();
});

// ✅ Schedule daily VCF email sending
cron.schedule('0 8 * * *', async () => {
  console.log('📩 Sending daily VCF emails...');
  await sendDailyEmails();
}, {
  timezone: "UTC"
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
