import mongoose from 'mongoose';
import _ from 'lodash';

export default function startDB() {
  const { MONGODB_URI } = process.env;

  if (!_.isString(MONGODB_URI)) {
    throw Error('MongoDB URI not found in .env file.');
  }

  mongoose.connect(MONGODB_URI, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Connection Error:'));
  
  db.once('open', function() {
    console.log('Connected!');
  });
}