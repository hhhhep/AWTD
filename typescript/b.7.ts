class Person {
    constructor(public firstName: string, public lastName: string, public age: number, private _ssn: string) {
    }
}

let p = new Person('John', 'Smith', 29, '123-90-4567');