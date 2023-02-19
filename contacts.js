const fs = require("fs").promises;
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  const resultParse = await JSON.parse(result);

  return resultParse;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (result === undefined) return "Not found contact with this ID";
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredArr = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(filteredArr, null, 2)
  );

  return filteredArr;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  contacts.push({ id: crypto.randomUUID(), name, email, phone });

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );

  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
