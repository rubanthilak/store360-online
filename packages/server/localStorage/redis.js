const { createClient } = require('redis');

const url = `redis://sathish:sathish@awesome.redis.server:6379`;

// const redisClient = async () => {
//   const client = createClient(url);
//   client.on('error', (err) => console.log('Redis Client Error', err));
//   await client.connect();
//   return client;
// }


var redisClient =  () => {
  return new Promise(async function (resolve, reject) {
    const client = createClient(url);
    client.on('error', (err) => reject('Redis Client Error: '+ err));
    await client.connect();
    resolve(client);
  });
};

module.exports = redisClient;
