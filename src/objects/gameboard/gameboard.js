export default class Gameboard {
    #placedShips = 0;
    #sunkShips = 0;

    #board = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({ ship: null, isHit: false })),
    );

    placeShip(placementInfo) {
        const { ship, x, y, axis } = placementInfo;

        this.#isInsideTheBoard(axis, x, y, ship);
        this.#doesNotConflict(axis, x, y, ship);

        if (axis === "x")
            for (let i = x; i < x + ship.length; i++)
                this.#board[y][i].ship = ship;
        else
            for (let i = y; i < y + ship.length; i++)
                this.#board[i][x].ship = ship;

        this.#placedShips++;
    }

    #isInsideTheBoard(axis, x, y, ship) {
        const error = new Error("can't place the ship outside of the board");

        if (x < 0 || x > 9 || y < 0 || y > 9) throw error;

        if (axis === "x") {
            if (x + ship.length > 10) throw error;
        } else if (y + ship.length > 10) throw error;
    }

    #doesNotConflict(axis, x, y, ship) {
        const area = [];

        if (axis === "x")
            area.push(...this.#board[y].slice(x, x + ship.length));
        else
            for (let i = y; i < y + ship.length; i++)
                area.push(this.#board[i][x]);

        if (!area.every(cell => cell.ship === null))
            throw new Error("ship's position conflicts with another ship");
    }

    receiveAttack(x, y) {
        const target = this.#board[y][x];

        if (target.isHit) throw new Error("can't hit the same target twice");

        target.isHit = true;

        if (target.ship) {
            target.ship.hit();
            if (target.ship.isSunk) this.#sunkShips++;
        }
    }

    get board() {
        return this.#board;
    }

    get areAllSunk() {
        return this.#sunkShips === this.#placedShips;
    }
}
