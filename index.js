const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.error(error.message);
      }
      break;

    case "get":
      try {
        const contactById = await getContactById(id);
        console.table(contactById);
      } catch (error) {
        console.error(error.message);
      }
      break;

    case "add":
      try {
        const contactAdded = await addContact(name, email, phone);
        console.table(contactAdded);
      } catch (error) {
        console.error(error.message);
      }
      break;

    case "remove":
      try {
        const contactRemoved = await removeContact(id);
        console.table(contactRemoved);
      } catch (error) {
        console.error(error.message);
      }
      break;

    case "update":
      try {
        const contactUpdated = await updateContact(id, name, email, phone);
        console.table(contactUpdated);
      } catch (error) {
        console.error(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
