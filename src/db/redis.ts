import * as redis from 'redis';

const redisClient = redis.createClient({
    socket: {
        port: parseInt(process.env.REDIS_PORT!),
        host: process.env.REDIS_HOST!,
    }
});

redisClient.connect();

redisClient.on('ready', () => {
    console.log('Redis client connected');
});
  
redisClient.on('error', (err) => {
    console.error(`Redis client error: ${err}`);
});

export { redisClient };