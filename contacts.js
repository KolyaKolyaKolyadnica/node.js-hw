const fs = require("fs").promises;
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return await JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result ?? "Not found contact with this ID";
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredArr = contacts.filter((contact) => contact.id !== contactId);

  if (contacts.length === filteredArr.length) {
    return "Not found contact with this ID";
  }

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(filteredArr, null, 2)
  );

  return filteredArr;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const contactDataDuplicated = contacts.find(
    (contact) => contact.email === email || contact.phone === phone
  );

  if (contactDataDuplicated)
    return "A contact with such data has already been created";

  contacts.push({ id: crypto.randomUUID(), name, email, phone });

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return contacts;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();

  const findContactById = contacts.find((contact) => contact.id === id);

  if (!findContactById) {
    return "Not found contact with this ID";
  }

  if (name) findContactById.name = name;
  if (email) findContactById.email = email;
  if (phone) findContactById.phone = phone;

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
  updateContact,
};
