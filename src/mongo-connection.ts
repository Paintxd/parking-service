import { connect } from 'mongoose';

export default class MongoConnection {
  static async start() {
    return connect(process.env.MONGO_URL);
  }
}
