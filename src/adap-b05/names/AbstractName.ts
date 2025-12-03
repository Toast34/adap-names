import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter && delimiter.length == 1) this.delimiter = delimiter;
        else {
            IllegalArgumentException.assert(false, "delimiter must be a single character string");
        }
    }

    public clone(): Name {
        var retVal : Name = Object.assign({},this);
        MethodFailedException.assert(retVal instanceof this.constructor);
        return retVal;
    }

    public asString(delimiter: string = this.delimiter): string {
        if (!delimiter || delimiter.length != 1) {
            IllegalArgumentException.assert(false, "delimiter must be a single character string");
            return ""
        }
            let retVal = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            var component = this.getComponent(i);
            retVal += component;
            if (i == this.getNoComponents()-1) return retVal;    
            retVal += delimiter;
            if (i == 0) {
                try {
                    InvalidStateException.assert(retVal.length > component.length, "delimiter is empty");
                }
                catch (e) {
                    return ""
                }
            }
        }
        return retVal;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
            try {
                InvalidStateException.assert(ESCAPE_CHARACTER == "\\", "Escape Character is invalid");
            }
            catch (e) {
                return ""
            }
            let retVal = this.asString();
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

    public isEqual(other: Name): boolean {
        return this.asString() === other.asString();
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i: number = 0; i < s.length; i++) {
            let c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}