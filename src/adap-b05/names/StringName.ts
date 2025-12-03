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
        try {
            InvalidStateException.assert(this.noComponents >= 0, "number of components is negative");
        }
        catch (e) {
            this.noComponents = this.name.split(this.delimiter).length;
        }
        return this.noComponents;
    }

    public getComponent(x: number): string {
        try {
            IllegalArgumentException.assert(x >= 0 && x < this.getNoComponents(), "x is out of bounds");
        }
        catch (e) {
            return ""
        }
        return this.name.split(this.delimiter)[x];
    }

    public setComponent(n: number, c: string): void {
        try {
            IllegalArgumentException.assert(n >= 0 && n < this.getNoComponents(), "n is out of bounds");
        }
        catch (e) {
            return
        }
        let newString = this.name.split(this.delimiter);
        newString[n] = c;
        this.name = newString.join(this.delimiter);
        MethodFailedException.assert(this.getComponent(n) == c);
    }

    public insert(n: number, c: string): void {
        try {
            IllegalArgumentException.assert(n >= 0 && n <= this.getNoComponents(), "n is out of bounds");
        }
        catch (e) {
            return
        }
        let num = this.getNoComponents();
        let newString = this.name.split(this.delimiter);
        MethodFailedException.assert(newString.splice(n,0,c).length == 0);
        newString.splice(n,0,c)
        this.name = newString.join(this.delimiter);
        this.noComponents++;
        try {
            InvalidStateException.assert(newString.length == this.getNoComponents())
        }
        catch (e) {
            this.noComponents = this.name.split(this.delimiter).length;
        }
        MethodFailedException.assert(this.getNoComponents() > num);
    }

    public append(c: string): void {
        let num = this.getNoComponents()
        let newString = this.name.split(this.delimiter);
        newString[newString.length] = c;
        this.name = newString.join(this.delimiter);
        this.noComponents++;
        try {
            InvalidStateException.assert(newString.length == this.getNoComponents())
        }
        catch (e) {
            this.noComponents = this.name.split(this.delimiter).length;
        }
        this.noComponents = this.name.split(this.delimiter).length;
        MethodFailedException.assert(this.getNoComponents() > num);
    }

    public remove(n: number): void {
        try {
            IllegalArgumentException.assert(n >= 0 && n < this.getNoComponents(), "n is out of bounds");
        }
        catch (e) {
            return
        }
        if (this.noComponents == 0) return;
        let newString = this.name.split(this.delimiter);
        try {
            MethodFailedException.assert(newString.splice(n,1).length == 1);
        }
        catch (e) {
            return
        }
        this.name = newString.join(this.delimiter);
        this.noComponents--;
        try {
            InvalidStateException.assert(newString.length == this.getNoComponents())
        }
        catch (e) {
            this.noComponents = this.name.split(this.delimiter).length;
        }
        this.noComponents = this.name.split(this.delimiter).length;
    }

    public concat(other: Name): void {
        this.name += other.asString();
        this.noComponents += other.getNoComponents();
    }

}