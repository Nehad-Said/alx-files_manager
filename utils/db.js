import mongodb from 'mongodb';
// eslint-disable-next-line no-unsused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Symbolize a MongoDb client.
 */
class DBClient {
  /**
     * Construct a new DBClient instance.
     */

  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, {useUnifiedTopology: true });
    this.client.connect();
  }

  /**
 * Read the number of users in the database.
 * @returns {Promise<Number>}
 */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
 * Read a reference to the `users` collection.
 * @returns {Promise<Collection>}
 */
  async usersCollection() {
    return this.client.db().collection('users');
  }
  /**
 * Read a reference to the `files` collection.
 * @returns {Promise<Collection>}
 */

  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
