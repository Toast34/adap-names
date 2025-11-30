import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.name.split(this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        IllegalArgumentException.assert(x >= 0 && x < this.getNoComponents());
        return this.name.split(this.delimiter)[x];
    }

    public setComponent(n: number, c: string): void {
        IllegalArgumentException.assert(n >= 0 && n < this.getNoComponents());
        let newString = this.name.split(this.delimiter);
        newString[n] = c;
        this.name = newString.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        IllegalArgumentException.assert(n >= 0 && n < this.getNoComponents());
        let newString = this.name.split(this.delimiter);
        newString.splice(n,0,c)
        this.name = newString.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string): void {
        let newString = this.name.split(this.delimiter);
        newString[newString.length] = c;
        this.name = newString.join(this.delimiter);
        this.noComponents++;
    }

    public remove(n: number): void {
        IllegalArgumentException.assert(n >= 0 && n < this.getNoComponents());
        if (this.noComponents == 0) return;
        let newString = this.name.split(this.delimiter);
        newString.splice(n,1);
        this.name = newString.join(this.delimiter);
        this.noComponents--;
    }

    public concat(other: Name): void {
        this.name += other.asString();
        this.noComponents += other.getNoComponents();
    }

}