import { Router } from 'express';
import { MutantController } from '../controllers/mutantController';
import { StatsController } from '../controllers/statsController';
import { validateDna } from '../middlewares /validateDna';
import { AuthController } from '../controllers/authController';
import passport from 'passport';
import session from 'express-session';
import authMiddleware from '../middlewares /auth';
import { DnaController } from '../controllers/dnaController';
import { SECRET_KEY_DB } from '../constant';



const routes = Router();
const mutantController = new MutantController();
const statsController = new StatsController();
const authController = new AuthController();
const dnaController = new DnaController();

routes.use(session({
    secret: SECRET_KEY_DB,
    resave: false,
    saveUninitialized: false,
}));


routes.use(passport.initialize());
routes.use(passport.session());


routes.post('/signup', (req, res, next) => authController.signup(req, res, next));
routes.post('/login', (req, res, next) => authController.login(req, res, next));
routes.post('/mutant', authMiddleware, validateDna, (req, res) => mutantController.checkMutant(req, res));
routes.delete('/delete-all-dna', authMiddleware, (req, res) => dnaController.deleteAllDna(req, res));
routes.get('/stats', authMiddleware, (req, res) => statsController.getStats(req, res));

export default routes;
