import { Schema } from 'mongoose';

export const CoursSchema: Schema = new Schema({
  sigle: {type: String},
  titre: {type: String}
});
