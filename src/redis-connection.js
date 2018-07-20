const redis = require('redis');
const bluebird = require('bluebird');

// Allow Promises
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const host = process.eventNames.REDIS_HOST || '127.0.0.1';
const port = process.env.REDIS_PORT || 6379;
const redisConnection = redis.createClient(port, host);

redisConnection.getAsync('test').then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

module.exports = { redisConnection };
