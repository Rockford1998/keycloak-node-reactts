import express, { Request, Response } from 'express';
import session from "express-session";
import Keycloak from 'keycloak-connect';
// https://medium.com/theoptimaltechnologist/what-is-keycloak-how-to-use-it-an-example-with-nodejs-part-2-46b562e2b46c

const memoryStore = new session.MemoryStore();

// Your Express app setup
const app = express();

// Middleware setup
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));
const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));

// Define your routes
app.get('/', keycloak.protect(), (req: Request, res: Response) => {
    console.log(req.sessionStore)
    res.send("testing");
});
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
