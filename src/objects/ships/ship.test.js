import Ship from "./ship";
import { describe, it, expect, beforeEach } from "@jest/globals";

describe("Ship", () => {
    let cruiser;

    beforeEach(() => {
        cruiser = new Ship(3);
    });

    it("should have a length", () => {
        expect(cruiser.length).toBe(3);
    });

    it("should start with 0 hits", () => {
        expect(cruiser.hits).toBe(0);
    });

    it("hit() should increase the number of hits", () => {
        cruiser.hit();
        expect(cruiser.hits).toBe(1);
        cruiser.hit();
        expect(cruiser.hits).toBe(2);
    });

    it("isSunk() should return false if hits < length", () => {
        cruiser.hit();
        cruiser.hit();
        expect(cruiser.isSunk).toBe(false);
    });

    it("isSunk() should return true if hits equal length", () => {
        for (let i = 1; i <= 3; i++) cruiser.hit();
        expect(cruiser.isSunk).toBe(true);
    });

    it("should not be sunk initially", () => {
        expect(cruiser.isSunk).toBe(false);
    });
});
