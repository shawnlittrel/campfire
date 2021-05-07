const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
     path: './fakeGroupArray.csv',
     header: [
          {id: 'id', title: 'id'},
          {id: 'name', title: 'group_name'},
          {id: 'email', title: 'group_email'},
          {id: 'location', title: 'group_location'},
          {id: 'title', title: 'activity_title'},
          {id: 'description', title: 'activity_description'},
          {id: 'slots', title: 'open_slots'},
          {id: 'date', title: 'activity_date'},
          {id: 'user_id', title: 'user_id'}
     ]
});

let records = [];

function randomNumber(max, min){
     return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateGroupArray(){

  for (let i = 0; i < 100; i++) { 
     let fakeId = i + 1;
     let fakeGName = faker.internet.userName();
     let fakeEmail = faker.internet.email();
     let fakeZip = faker.address.zipCode();
     let fakeTitle = faker.lorem.word();
     let fakeDescription = faker.lorem.sentence();
     let fakeSlots = randomNumber(1, 5);
     let fakeDate = faker.date.between('2021-06-01', '2021-08-15');
     let fakeUser = randomNumber(1, 100);
     
     

       records.push(
          {id: `${fakeId}`, name: `${fakeGName}`, email: `${fakeEmail}`, location: `${fakeZip}`, title: `${fakeTitle}`, description: `${fakeDescription}`, slots: `${fakeSlots}`, date: `${fakeDate}`, user_id: `${fakeUser}`});
    }

    csvWriter.writeRecords(records)
    .then(() => {
         console.log('Done');
    });
};


generateGroupArray();