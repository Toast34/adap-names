import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.name = source;
        if(delimiter) this.delimiter = delimiter;
        this.noComponents = this.name.split(this.delimiter).length
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        // TODO double Escape Characters
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents == 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        return this.name.split(this.delimiter)[x];
    }

    public setComponent(n: number, c: string): void {
        let newString = this.name.split(this.delimiter);
        newString[n] = c;
        this.name = newString.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        let newString = this.name.split(this.delimiter);
        newString.splice(n,0,c)
        this.name = newString.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string): void {
        let newString = this.name.split(this.delimiter);
        newString.concat(c);
        this.name = newString.join(this.delimiter);
        this.noComponents++;
    }

    public remove(n: number): void {
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