const fs = require('fs');
const User = require('../models/User');

const generateVCF = async () => {
  try {
    const users = await User.find();
    let vcfContent = '';

    users.forEach(user => {
      vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:${user.name}\nTEL:${user.whatsappNumber}\nEMAIL:${user.email}\nEND:VCARD\n`;
    });

    const filePath = './contacts.vcf';
    fs.writeFileSync(filePath, vcfContent);
    return filePath;
  } catch (error) {
    console.error('❌ Error generating VCF:', error);
    return null;
  }
};

module.exports = { generateVCF };
