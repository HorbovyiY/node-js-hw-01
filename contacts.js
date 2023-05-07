const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
}

async function getContactById(contactId) {
    const list = await listContacts();
    const contact = list.find(item => item.id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const list = await listContacts();
    const index = list.findIndex(item => item.id === contactId);
    if (index === -1) { 
        return null;
    }
    const [result] = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return result;
}

async function addContact(name, email, phone) {
    const list = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}