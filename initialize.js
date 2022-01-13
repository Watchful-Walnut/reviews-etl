const fs = require('fs');
const readline = require('readline');
const db = require('./mongo.js');
const csv = require('csv-parser')



  // let counter = 0
  // const readStreamReviews =  fs.createReadStream(__dirname + '/data/reviews.csv');
  // const rl2 = readline.createInterface({
  //   input: readStreamReviews,
  //   crlfDelay: Infinity
  // });

  // rl2.on('line', async (line) => {
  //   let csv = line.split(',')
  //     const review = {
  //       review_id: parseInt(csv[0]),
  //       rating: parseInt(csv[2]),
  //       date: csv[3],
  //       summary: csv[4],
  //       body: csv[5],
  //       recommend: !!csv[6],
  //       reported: !!csv[7],
  //       reviewer_name: csv[8],
  //       reviewer_email: csv[9],
  //       response: csv[10],
  //       helpfulness: parseInt(csv[11]),
  //       photos: [],
  //       characteristics: {},
  //     };
  //   db.collection.updateOne({_id: parseInt(csv[1])}, {$push:{reviews: review}},{upsert: true})
  //   counter++;
  //   console.log(counter);
  // });
  // readStreamReviews.on('end', () => {
  //   console.log('Reviews IDs Complete');
  // });
const setProducts = async () => {
  let counter = 0;
  fs.createReadStream(__dirname + '/data/reviews.csv')
    .pipe(csv())
    .on('data', async row => {
      const review = {
        review_id: parseInt(row.id),
        rating: parseInt(row.rating),
        date: row.date,
        summary: row.summary,
        body: row.body,
        recommend: !!row.recommend,
        reported: !!row.reported,
        reviewer_name: row.reviewer_name,
        reviewer_email: row.reviewer_email,
        response: row.response,
        helpfulness: parseInt(row.helpfulness),
        photos: [],
        characteristics: {},
      };
    db.collection.updateOne({_id: parseInt(row.product_id)}, {$push:{reviews: review}},{upsert: true})
    counter++;
    console.log(counter);
    })
    .on('end', console.log(`Done`))
}


setProducts();

  // const readStreamProductId =  fs.createReadStream(__dirname + '/samples/reviews.txt');
  // // This catches any errors that happen while creating the readable stream (usually invalid names)
  // readStreamProductId.on('error', function(err) {
  //   console.log(err);
  // });

  // let rl = readline.createInterface({
  //   input: readStreamProductId,
  //   crlfDelay: Infinity
  // });

  // rl.on('line', async (line) => {
  //   let csv = line.split(',')
  //   await db.collection.updateOne({_id: parseInt(csv[1])},{$set:{_id: parseInt(csv[1]), reviews: []}},{upsert: true});
  // });

  // let end = new Promise((resolve, reject) => {
  //   readStreamProductId.on('end', () => {
  //     // const findResult = await db.collection.find().toArray();
  //     // console.log('Found documents =>', findResult);
  //     resolve('Product IDs Complete');
  //   })
  // })

  // let endEvent = await end;