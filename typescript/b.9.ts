class Person {
    constructor(public firstName: string, public lastName: string,
        public age: number, private _ssn?: string) {

        }
    
    get ssn(): string {
        return this._ssn;
    }

    set ssn(value: string) {
        this._ssn = value;
    }
}

let p = new Person('John', 'Smith', 29);
p.ssn = '456-70-1234';

console.log('Last name : ' + p.lastName + ' SSN : ' + p.ssn);