/**
 * Box data representation
 */
export class BoxData {
    value: string;
    cords: Cords;
    step: number;
    height: number;
    path: BoxData | null;
    start: boolean;
    end: boolean;
    constructor(x = -1, y = -1, value = "", step = -1) {
        this.cords = new Cords(x, y);
        this.value = value;
        this.step = step;
        this.height = value.charCodeAt(0) - "a".charCodeAt(0);
        this.path = null;
        this.end = false;
        this.start = false;
        if (value == "S") {
            this.step = 0;
            this.height = 0;
            this.start = true;
        }
        if (value == "E") {
            this.height = 26;
            this.end = true;
        }

    }
    /**
     * Get the update key
     * @returns a key for updating
     */
    getUpdateKey() {
        return this.cords.getKey() + "-" + this.step;
    }
    /**
     * Get the Cordinate Key
     * @returns the cordinate key
     */
    getKey() {
        return this.cords.getKey()
    }
    setStep(neighbor: BoxData) {
        console.log("Here ", this.height, neighbor.height);
        if (this.start || neighbor.step == -1) {
            return null;
        }
        // console.log(`a(${this.cords.x},${this.cords.y}) H:${this.height} O:${neighbor.height} S:${this.step} `);
        if (this.height - neighbor.height <= 1) {


            if (this.step == -1) {
                this.step = neighbor.step + 1;
                // console.log(`b(${this.cords.x},${this.cords.y}) H:${this.height} O:${neighbor.height} S:${this.step} `);
            }
            else if (neighbor.step < this.step + 1) {
                this.step = neighbor.step + 1;

            }
        }

    }
}
export class Cords {
    x: number;
    y: number;
    constructor(x = -1, y = -1) {
        this.x = x;
        this.y = y;
    }
    getKey() {
        return `${this.x},${this.y}`
    }

}

export interface BoxProps {
    data: BoxData;
    visit: (data: BoxData) => void
}