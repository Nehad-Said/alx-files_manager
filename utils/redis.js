import { promisify } from 'util';
import { createClient } from 'redis';

/**
* Redis client representation.
*/
class RedisClient {
  /**
     * RedisClient new instance creation.
     */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
     * Probe client's connection to the Redis server is active.
     * @returns {boolean}
     */
  isAlive() {
    return this.isClientConnected; 
  }

  /**
     * Acquire the value of a given key.
     * @param {String} key The of the item we are retrieving.
     * @returns {String | Object}
     */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
     * Save a key and its value along with session expiry time.
     * @param {String} key The key of the item to save.
     * @param {String} | Number | Boolean} value The item to save.
     * @param {Number} duation The expiry time of the item in seconds.
     * @returns {Promise<void>}
     */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
     * Deletion of a given value's key.
     * @param {String} key The key of item to delete.
     * @returns {Promise<void>}
     */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
