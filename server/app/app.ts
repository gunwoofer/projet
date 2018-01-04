import { Bdd } from './bdd';
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


const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

import * as indexRoute from './routes/index';

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

    // bdd
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

    const authCheck = jwt({
        secret: jwks.expressJwtSecret({
              cache: true,
              rateLimit: true,
              jwksRequestsPerMinute: 5,
              jwksUri: 'https://revise-pas-seul-poly.auth0.com.auth0.com/.well-known/jwks.json'
          }),
          // This is the identifier we set when we created the API
          audience: 'https://revise-pas-seul-poly.auth0.com/api/v2/',
          issuer: 'revise-pas-seul-poly.auth0.com', // e.g., you.auth0.com
          algorithms: ['RS256']
    });

    // creation session
    router.post('/ajouterSession', index.ajouterSession.bind(index.ajouterSession));

    // obtenir liste des sessions
    router.get('/obtenirSessions', authCheck, index.obtenirSessions.bind(index.obtenirSessions));
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
