const contacts = require('./data/contact.js');
const yargs = require("yargs");

//add new contact
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

//show contact list
yargs.command({
    command :'list',
    describe:'See contact list',
    handler(){
        contacts.listContact()
    },

})

//show detail contact 
yargs.command({
    command :'detail',
    describe:'See contact detail base on name',
    builder:{
        name:{
            describe    :'Name for cek detail',
            demandOption:true,
            type        :'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.name)
    },

})
//show detail contact 
yargs.command({
    command :'delete',
    describe:'delete contact base on name',
    builder:{
        name:{
            describe    :'Name for delete contact',
            demandOption:true,
            type        :'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.name)
    },

})

yargs.parse();