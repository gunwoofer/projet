import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { CoursInterface } from './coursInterface';
import { CoursSchema } from './coursSchema';

export interface CoursModele extends CoursInterface, Document {}

export const modelDeCours = mongoose.model<CoursModele, Model<CoursModele>>('Cours', CoursSchema);

