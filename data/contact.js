const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');


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
    const contact   = {name,email,phone};
    const file      = fs.readFileSync('data/contacts.json','utf-8');
    const contacts  = JSON.parse(file);
    contacts.push(contact);

    //Mengecek data duplicate
    let duplicate = 0
    for (let i = 0; i < contacts.length ;i++){
        let dataJson  = contacts[i]   
        if (contact.name == dataJson.name ) { duplicate ++}     
    }
    if (duplicate > 1) {
        console.log("Data nama sudah ada");
    }else{       
        fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
        console.log('Terima Kasih sudah memasukkan data');
    }
}


module.exports={questions,SaveContact}
