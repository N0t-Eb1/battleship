import Gameboard from "./gameboard";
import Ship from "../ships/ship";
import { describe, it, expect, beforeEach } from "@jest/globals";

let ship;
let gameboard;

beforeEach(() => {
    ship = new Ship(3);
    gameboard = new Gameboard();
});

describe("can place ships", () => {
    it("place ship horizontally", () => {
        gameboard.placeShip({
            ship,
            axis: "x",
            x: 0,
            y: 0,
        });

        for (let i = 0; i < ship.length; i++)
            expect(gameboard.board[0][i].ship).toBe(ship);

        expect(gameboard.board[0][3].ship).toBeNull();
        expect(gameboard.board[1][0].ship).toBeNull();
    });

    it("place ship vertically", () => {
        gameboard.placeShip({
            ship,
            axis: "y",
            x: 0,
            y: 0,
        });

        for (let i = 0; i < ship.length; i++)
            expect(gameboard.board[i][0].ship).toBe(ship);

        expect(gameboard.board[0][1].ship).toBeNull();
        expect(gameboard.board[3][0].ship).toBeNull();
    });

    it("throws error when placing ship outside of the board horizontally", () => {
        const placeInfo = { ship, axis: "x" };
        const errorMessage = "can't place the ship outside of the board";

        placeInfo.x = 8;
        placeInfo.y = 0;
        expect(() => gameboard.placeShip(placeInfo)).toThrow(errorMessage);

        //both axis out of bound
        placeInfo.x = 10;
        placeInfo.y = 10;
        expect(() => gameboard.placeShip(placeInfo)).toThrow(errorMessage);
    });

    it("throws error when placing ship outside of the board horizontally", () => {
        const placeInfo = { ship, axis: "y" };
        const errorMessage = "can't place the ship outside of the board";

        placeInfo.x = 0;
        placeInfo.y = 8;
        expect(() => gameboard.placeShip(placeInfo)).toThrow(errorMessage);

        //both axis out of bound
        placeInfo.x = 10;
        placeInfo.y = 10;
        expect(() => gameboard.placeShip(placeInfo)).toThrow(errorMessage);
    });

    it("throws error when horizontal placement conflicts with another ship", () => {
        const firstShip = { ship, axis: "x", x: 0, y: 0 };
        const secondShip = { ship: new Ship(3), axis: "x", x: 2, y: 0 };

        gameboard.placeShip(firstShip);
        expect(() => gameboard.placeShip(secondShip)).toThrow(
            "ship's position conflicts with another ship",
        );
    });

    it("throws error when vertical placement conflicts with another ship", () => {
        const firstShip = { ship, axis: "x", x: 0, y: 0 };
        const secondShip = { ship: new Ship(3), axis: "y", x: 2, y: 0 };

        gameboard.placeShip(firstShip);
        expect(() => gameboard.placeShip(secondShip)).toThrow(
            "ship's position conflicts with another ship",
        );
    });
});

describe("can register attacks", () => {
    it("ships can receive hit", () => {
        gameboard.placeShip({ ship, axis: "x", x: 0, y: 0 });

        gameboard.receiveAttack(0, 0);

        const hitCell = gameboard.board[0][0];

        expect(hitCell.isHit).toBe(true);
        expect(hitCell.ship.hits).toBe(1);
    });

    it("can't hit the same place twice", () => {
        gameboard.placeShip({ ship, axis: "x", x: 0, y: 0 });

        gameboard.receiveAttack(0, 0);
        expect(() => gameboard.receiveAttack(0, 0)).toThrow(
            "can't hit the same target twice",
        );
    });
});

describe("can determine if game is over", () => {
    it("areAllSunk will return false if not all the ships are hit", () => {
        gameboard.placeShip({ ship, axis: "x", x: 0, y: 0 });

        for (let i = 0; i < 2; i++) gameboard.receiveAttack(i, 0);

        expect(gameboard.areAllSunk).toBe(false);
    });

    it("areAllSunk will return true if all the ships are sunk", () => {
        gameboard.placeShip({ ship, axis: "x", x: 0, y: 0 });

        for (let i = 0; i < 3; i++) gameboard.receiveAttack(i, 0);

        expect(gameboard.areAllSunk).toBe(true);
    });
});
