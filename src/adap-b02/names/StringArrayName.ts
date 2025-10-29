import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.components = source;
        if (delimiter) this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
            let retVal = "";
        for (const i in this.components) {
            var component = this.components[i];
            retVal += component;
            if (component == this.components[this.components.length - 1]) return retVal;    
            retVal += delimiter;
        }
        return retVal;
    }

    public asDataString(): string {
            let retVal = ``;
        for (const i in this.components) {
            var component = this.components[i];
            retVal += component;
            if (component == this.components[this.components.length - 1]) break;  
            retVal += this.delimiter;
        }
        
        let done = false;
        let i = 0;
        while (!done) {
            done = true;
            for (i; i < retVal.length; i++) {
                const char = retVal[i];
                if(char == ESCAPE_CHARACTER) {
                    done = false;
                }
                if (!done) break;
            }
            if (!done) {
                retVal = retVal.slice(0,i) + ESCAPE_CHARACTER + ESCAPE_CHARACTER + retVal.slice(i+1);
            }
            i+=2;
        }
        return retVal;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length > 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        this.components.splice(i,0,c);
    }
    
    public append(c: string): void {
        this.components[this.components.length] = c;
    }

    public remove(i: number): void {
        this.components.splice(i,1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}