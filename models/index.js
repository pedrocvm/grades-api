import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;


const gradesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  subject: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  value: {
    type: Number,
    validate(value){
      if(value<0)throw new Error('A Nota não pode ser menor do que 0.');
    },
    required: true
  },

  lastModified: {
    type: Date,
    default: Date.now
  }
}, {versionKey: false});

const gradesModel = mongoose.model('grades', gradesSchema, 'grades');

export { db, gradesModel };
