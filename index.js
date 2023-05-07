const contactsServices = require("./contacts")
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const resList = await contactsServices.listContacts();
            return console.table(resList)

        case "get":
            const resGet = await contactsServices.getContactById(id);
            return console.log(resGet);

        case "add":
            const resAdd = await contactsServices.addContact(name,email,phone);
            return console.log(resAdd);

        case "remove":
            const resRemove = await contactsServices.removeContact(id);
            return console.log(resRemove);

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);

