const fs = require('fs');
const readline = require('readline');
const db = require('./mongo.js');
const csv = require('csv-parser')


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
    .on('end', resolve)
  }


setProducts();
