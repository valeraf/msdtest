export interface IShip {
    name: string;
    speed: string;
}

export interface IShipWithId extends IShip {
    id: string;
}