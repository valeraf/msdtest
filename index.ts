import express, { Request, Response } from "express";
import bodyParser from 'body-parser';

import {getShips, postShip} from './controllers';

const app = express();

app.use((req: Request, res: Response, next) => {
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
  
    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'content-type, Content-Type',
    );
  
    // Pass to next layer of middleware
    next();
});

// Use bodyParser middleware to process body payload from POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ships', postShip);
  
app.get('/ships', getShips);

app.listen(4242, () => {
    console.log('Test app is running on port 4242!');
    console.log("  Press CTRL-C to stop\n");
});

export default app;
