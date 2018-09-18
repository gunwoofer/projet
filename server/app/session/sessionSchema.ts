import { Schema } from 'mongoose';

export const SessionSchema: Schema = new Schema({
  guid: {type: String},
  sigleCours: {type: String},
  titreCours: {type: String},
  salle: {type: String},
  heureDebut: {type: Date},
  heureFin: {type: Date},
  listeParticipants: {type: []},
  description: {type: String}
});
