import * as mongoose from "mongoose";

class DataBase {
  private DB_URL = process.env.MONGO_URL || "mongodb://localhost:27017/db_portal";

  createConnection(): void {
    mongoose.connect(this.DB_URL);
  }
}

export default DataBase;
