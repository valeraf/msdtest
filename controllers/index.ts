import { Request, Response } from "express";
import { IShip, IShipWithId } from "../models";

// used to replace DataBase, to save/read data to/from
const ships: IShipWithId[] = [];

let lastId = 0;

// update Ship object from request with ID to create new Ship
const withId = (ship: IShip) => ({
    ...ship,
    id: String(lastId++),
})

export const getShips = (req: Request, res: Response) => {
    res.send(ships);
};

export const postShip = (req: Request, res: Response) => {
    const shipRequest: IShip = req.body;
    if (shipRequest && shipRequest.name && shipRequest.speed) {
        const shipWithId = withId(shipRequest);
        ships.push(shipWithId)
        res.status(201).send(shipWithId);
    } else {
        if (!shipRequest.name) {
            res.status(404).send({error: 'Ship name is required'})
        }
        if (!shipRequest.speed) {
            res.status(404).send({error: 'Ship speed is required'})
        }
    }
};