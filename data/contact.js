const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const { exit } = require('process');
const readline = require('readline');
const validator = require('validator');


//Mengecek folder dan file
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath,'[]','utf-8');
}

//Menyimpan inputan
const SaveContact = (name,email,phone)=>{
    const contact   = {name,email,phone};
    const file      = fs.readFileSync('data/contacts.json','utf-8');
    const contacts  = JSON.parse(file);
    contacts.push(contact);

    //validasi email
    cekEmail(email)
  
    //validasi Nomer hp
    cekNomer(phone)

    //Mengecek data duplicate 
    let duplicate = 0
    for (let i = 0; i < contacts.length ;i++){
        let dataJson  = contacts[i]   
        if (contact.name == dataJson.name ) { duplicate ++}     
    }

    if (duplicate > 1) {
        console.log("Nama sudah terdaftar");
    }else{       
        fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
        console.log('Terima Kasih sudah memasukkan data');
    }

    //Cara Lain
    // const duplikat = contacts.find((contact)=>contact.name === name)
    // if(duplikat){
    //     console.log(`Data nama sudah ada`);
    //     return false;
    // }
}

//fungsi validasi Email
function cekEmail(email) {
    if (validator.isEmail(email)) {
        return false
    }else{
        console.log('Email masih salah')
        exit()
    }
}

//fungsi validasi Nomer hp
function cekNomer(phone) {
    if (validator.isMobilePhone(phone,'id-ID')) {
        return false          
    }else{
        console.log('Nomer masih salah')
        exit()
    }
}


module.exports={SaveContact}
