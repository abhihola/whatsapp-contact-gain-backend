const mongoose = require('mongoose');

const AdminSettingsSchema = new mongoose.Schema({
  defaultMessage: String,
});

module.exports = mongoose.model('AdminSettings', AdminSettingsSchema);
