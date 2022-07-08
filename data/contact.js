const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input :process.stdin,
    output:process.stdout
});

//Mengecek folder dan file
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath,'[]','utf-8');
}

//Pertanyaan
const questions = (ask) =>{
    return new Promise((resolve,reject)=>{
        rl.question(ask,(inputVariable)=>{
            resolve(inputVariable);
        });
    });
};

//Menyimpan inputan
const SaveContact = (name,email,phone)=>{
    const contact   = {name,phone,email};
    const file      = fs.readFileSync('data/contacts.json','utf-8');
    const contacts  = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log('Terima Kasih sudah memasukkan data');
    rl.close();
}


module.exports={questions,SaveContact}