const contacts = require('./data/contact.js');
const yargs = require("yargs");

yargs.command({
    command :'add',
    describe:'add new contact',
    builder:{
        name:{
            describe    :'Contact Name',
            demandOption:true,
            type        :'string',
        },
        email:{
            describe    :'Contact email',
            demandOption:false,
            type        :'string',
        },
        mobile:{
            describe    :'Contact mobile phone number',
            demandOption:true,
            type        :'string',
        },
    },
    handler(argv){
        contacts.SaveContact(argv.name,argv.email,argv.mobile)
    },

})

yargs.parse();



// contacts.checkFolderFile()

// const main = async() =>{
    
//     const name  = await contacts.questions('What is your name?');
//     const phone = await contacts.questions('What is your phone?');
//     const email = await contacts.questions('What is your email?');

//     contacts.SaveContact(name,email,phone)
// }
// main();