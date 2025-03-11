const nodemailer = require('nodemailer');
const User = require('../models/User');
const AdminSettings = require('../models/AdminSettings');
const { generateVCF } = require('./vcfGenerator');

const sendDailyEmails = async () => {
  try {
    const users = await User.find();
    const settings = await AdminSettings.findOne();
    const vcfFilePath = await generateVCF();
    
    if (!users.length || !vcfFilePath) return;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    for (const user of users) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Daily Updated Contacts',
        text: settings?.defaultMessage || 'Here is your updated contact list.',
        attachments: [{ filename: 'contacts.vcf', path: vcfFilePath }]
      };
      
      await transporter.sendMail(mailOptions);
    }
    console.log('Daily emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

module.exports = { sendDailyEmails };
