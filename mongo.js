const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'sdc'

const connect = async () => {
  await client.connect();
  return `Successfully connected to MongoDB`;
};
connect()
  .then(console.log)
  .catch(console.error);

const db = client.db(dbName);
// db.reviews.drop('reviews');
//  db.createCollection('reviews', {autoIndexId: false});
const collection = db.collection('reviews');
// collection.createIndex({ product_id: 1 }, {unique: true})




module.exports = {
  client: client,
  db: db,
  collection: collection
};