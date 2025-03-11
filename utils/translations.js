const translations = {
  en: {
    subject: 'Daily Updated Contacts',
    body: 'Here is your updated contact list.',
  },
  fr: {
    subject: 'Contacts mis à jour quotidiennement',
    body: 'Voici votre liste de contacts mise à jour.',
  },
  es: {
    subject: 'Contactos actualizados diariamente',
    body: 'Aquí está su lista de contactos actualizada.',
  }
};

const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['en'][key];
};

module.exports = { getTranslation };
