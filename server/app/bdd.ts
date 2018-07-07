import mongoose = require('mongoose');

export class Bdd {
    public static url = 'mongodb://localhost:27017/session-bd';

    public connect(url: string): boolean {
        mongoose.Promise = global.Promise;
        mongoose.connect(url);
        mongoose.connection.on('error', error => {
          console.error(error);
          return false;
        });
        return true;
    }
}