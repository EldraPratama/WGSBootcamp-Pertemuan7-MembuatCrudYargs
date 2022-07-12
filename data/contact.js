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

const loadContact = () => {
    const file      = fs.readFileSync('data/contacts.json','utf-8');
    const contacts  = JSON.parse(file);
    return contacts ;
}


//Menyimpan inputan
const SaveContact = (name,email,phone)=>{
    const contact  = {name,email,phone};
    const contacts = loadContact()
    contacts.push(contact);

    //validasi email dan no hp
    if (email) {
        cekEmail(email)
    }
    if (phone) {
        cekNomer(phone)
    }
   
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

//fungsi melihat daftar contact
const listContact = () => {
    const contacts = loadContact()
    console.log('Contact List:')
    contacts.forEach((contact,i) => {
        console.log(`${i+1}.${contact.name} - ${contact.phone}`);
    });
}

//fungsi melihat detail contact
const detailContact = (name) => {
    const contacts = loadContact()
    console.log('Contact detail:')
    contacts.forEach((contact,i) => {
        if (name == contact.name) {
            console.log(`Name  : ${contact.name}`);          
            console.log(`Number: ${contact.phone}`);          
            console.log(`Email : ${contact.email}`);          
        }
    });
}

//Fungsi menghapus contact
const deleteContact = (name) => {
    const contacts = loadContact()
    contacts.forEach((contact,i) => {
        if (contact.name == name ) {
            contacts.splice(i,1)
        }
    });
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log("Data contact berhasil di hapus");
}



//fungsi validasi Email
function cekEmail(email) {
    if (validator.isEmail(email)) {
        return false
    }else{
        console.log('Email belum valid')
        exit()
    }
}

//fungsi validasi Nomer hp
function cekNomer(phone) {
    if (validator.isMobilePhone(phone,'id-ID')) {
        return false          
    }else{
        console.log('Nomer belum valid')
        exit()
    }
}


module.exports={SaveContact,listContact,detailContact,deleteContact}
