const fs = require('fs');
const readline = require('readline');
const db = require('./mongo.js');
const csv = require('csv-parser')


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
