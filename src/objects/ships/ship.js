export default class Ship {
    #length;
    #hits = 0;

    constructor(length) {
        this.#length = length;
    }

    hit() {
        this.#hits++;
    }

    get isSunk() {
        return this.#hits === this.#length;
    }

    get length() {
        return this.#length;
    }

    get hits() {
        return this.#hits;
    }
}
