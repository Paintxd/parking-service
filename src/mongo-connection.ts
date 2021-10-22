import { connect } from "mongoose";

export class MongoConnection {

  static async start() {
    return connect(process.env.MONGO_URL)
  }
}
