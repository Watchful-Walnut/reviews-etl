const fs = require('fs');
const readline = require('readline');
const db = require('./mongo.js');
const csv = require('csv-parser');
// const { Throttle } = require('stream-throttle');
const source = '/data/reviews_photos.csv';
// const source = '/samples/reviews_photos.txt'

const setPhotos = async () => {

  fs.createReadStream(__dirname + source, {highWaterMark: (32 * 1024)})
    // .pipe(new Throttle({rate: 5000}))
    .pipe(csv())
    .on('data', async row => {
      const id = parseInt(row.id);
      const review_id = parseInt(row.review_id);
      const url = row.url;
      console.log(`Adding ${row.id}`);
      const update = await db.collection.updateOne({reviews: { $elemMatch: { review_id: review_id }  }}, {$push: {'reviews.$.photos':{url: url}}});
      console.log(update);
    })
    .on('end', console.log(`done`))
}
setPhotos();







// const updatePhotos = () => {
//   const readStreamPhotos =  fs.createReadStream(__dirname + '/data/reviews_photos.csv');
//   const rl4 = readline.createInterface({
//     input: readStreamPhotos,
//     crlfDelay: Infinity
//   });

//   let counter = 0;

//   rl4.on('line', async (line) => {
//     let csv = line.split(',')
//     await db.collection.updateOne({reviews: { $elemMatch: { review_id: parseInt(csv[1]) }  }}, {$push: {'reviews.$.photos':{id: parseInt(csv[0]), url: csv[2]}}});
//     counter++;
//     console.log(counter);
//   });

//   readStreamPhotos.on('end', () => {
//     console.log('Photos Complete');
//   });
// }

// updatePhotos();
// //Add characteristic reviews
// const readStreamCharacteristics =  fs.createReadStream(__dirname + '/samples/characteristic_review.txt');
// const rl5 = readline.createInterface({
//   input: readStreamCharacteristics,
//   crlfDelay: Infinity
// });

// rl5.on('line', async (line) => {
//   let csv = line.split(',')
//   const insertCharacteristicData = await db.collection.updateOne({reviews: { $elemMatch: { review_id: parseInt(csv[1]) }  }}, {$push: {'reviews.$.characterstics':{id: parseInt(csv[0]), url: csv[2]}}});
// });

// readStreamCharacteristics.on('end', () => {
//   console.log('Characteristics Complete');
// });

// const readStreamCharacteristics =  fs.createReadStream(__dirname + '/samples/characteristic_review.csv');
// const rl3 = readline.createInterface({
//   input: readStreamPhotos,
//   crlfDelay: Infinity
// });

// rl4.on('line', async (line) => {
//   let csv = line.split(',')
//   const insertPhoto = await db.collection.updateOne({reviews: { $elemMatch: { review_id: parseInt(csv[1]) }  }}, {$push: {'reviews.$.photos':{id: parseInt(csv[0]), url: csv[2]}}});
// });

// readStreamCharacteristics.on('end', () => {
//   console.log('Photos Complete');
// });
