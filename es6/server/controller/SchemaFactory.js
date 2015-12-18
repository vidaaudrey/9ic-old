class SchemaFactory {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.Schema = mongoose.Schema;
  }
  getUserSchema() {
    return new this.Schema({
      username: String,
      password: String,
      avatar: String
    });
  }

}
export default SchemaFactory;
