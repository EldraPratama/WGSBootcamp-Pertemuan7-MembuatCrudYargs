const contacts = require('./data/contact.js');

const main = async() =>{

    const name  = await contacts.questions('What is your name?');
    const phone = await contacts.questions('What is your phone?');
    const email = await contacts.questions('What is your email?');
    
    contacts.SaveContact(name,email,phone)
}
main();
