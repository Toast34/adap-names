import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    public getNoComponents(): number {
        return this.components.length
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length);
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length);
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length);
        this.components.splice(i,0,c);
    }
    
    public append(c: string): void {
        this.components[this.components.length] = c;
    }

    public remove(i: number): void {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length);
        this.components.splice(i,1);
    }
}