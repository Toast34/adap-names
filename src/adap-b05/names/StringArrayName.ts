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
        try {
            IllegalArgumentException.assert(i >= 0 && i < this.components.length, "i is out of bounds");
        }
        catch (e) {
            return ""
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        try {
            IllegalArgumentException.assert(i >= 0 && i < this.components.length, "i is out of bounds");
        }
        catch (e) {
            return
        }
        this.components[i] = c;
        MethodFailedException.assert(this.getComponent(i) == c);
    }

    public insert(i: number, c: string): void {
        let num = this.getNoComponents()
        try {
            IllegalArgumentException.assert(i >= 0 && i <= this.components.length, "i is out of bounds");
        }
        catch (e) {
            return
        }
        this.components.splice(i,0,c);
        MethodFailedException.assert(this.getNoComponents() > num);
    }
    
    public append(c: string): void {
        let num = this.getNoComponents()
        this.components[this.components.length] = c;
        MethodFailedException.assert(this.getNoComponents() > num);
    }

    public remove(i: number): void {
        try {
            IllegalArgumentException.assert(i >= 0 && i < this.components.length, "i is out of bounds");
        }
        catch (e) {
            return
        }
        MethodFailedException.assert(this.components.splice(i,1).length == 1);
    }
}