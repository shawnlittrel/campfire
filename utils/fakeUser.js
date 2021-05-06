const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
     path: './fakeUserArray.csv',
     header: [
          {id: 'id', title: 'id'},
          {id: 'username', title: 'username'},
          {id: 'email', title: 'email'},
          {id: 'password', title: 'password'},
          {id: 'location', title: 'location'}
     ]
});

let records = [];


function generateUserArray(){

  for (let i = 0; i < 1000; i++) { 
     let fakeId = i + 1;
     let fakeUsername = faker.internet.userName();
     let fakeEmail = faker.internet.email();
     let fakePassword = faker.internet.password();
     let fakeZip = faker.address.zipCode();
     

       records.push(
          {id: `${fakeId}`, username: `${fakeUsername}`, email: `${fakeEmail}`, password: `${fakePassword}`, location: `${fakeZip}`});
    }

    csvWriter.writeRecords(records)
    .then(() => {
         console.log('Done');
    });
};


generateUserArray();
