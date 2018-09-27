/**
 * app.ts - Configures an Express application.
 *
 * @authors Nicolas Richard, Emilio Riviera
 * @date 2017/01/09
 */

import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import * as indexRoute from './routes/index';
import { Bdd } from './bdd';

export class Application {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this this.app.
   */
  public static bootstrap(): Application {
    return new Application();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {

    // Application instantiation
    this.app = express();

    // configure this.application
    this.config();

    // configure routes
    this.routes();
  }

  /**
   * The config function.
   *
   * @class Server
   * @method config
   */
  private config() {
    const bd: Bdd = new Bdd();
    bd.connect(Bdd.url);

    // Middlewares configuration
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '../client')));
    this.app.use(cors());
  }

  /**
   * The routes function.
   *
   * @class Server
   * @method routes
   */
  public routes() {
    let router: express.Router;
    router = express.Router();

    // create routes
    const index: indexRoute.Index = new indexRoute.Index();

    router.post("/obtenirSessionID", index.obtenirSessionID.bind(index.obtenirSessionID));
    router.get("/obtenirSessions", index.obtenirSessions.bind(index.obtenirSessions));
    router.post("/ajouterSession", index.ajouterSession.bind(index.ajouterSession));
    router.post("/ajouterEtudiant", index.ajouterEtudiant.bind(index.ajouterEtudiant));
    router.post("/supprimerEtudiant", index.supprimerEtudiant.bind(index.supprimerEtudiant));


    router.get("/testhttp", index.testhttp.bind(index.testhttp));

    // use router middleware
    this.app.use(router);

    // Gestion des erreurs
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        const err = new Error('Not Found');
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (this.app.get('env') === 'development') {
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user (in production env only)
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: {}
        });
    });
  }
}
