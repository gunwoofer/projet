import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { SessionInterface } from './sessionInterface';
import { SessionSchema } from './sessionSchema';

export interface SessionModele extends SessionInterface, Document {}

export const modelDeSession = mongoose.model<SessionModele, Model<SessionModele>>('Session', SessionSchema);

