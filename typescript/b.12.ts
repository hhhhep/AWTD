interface IPerson {
    firstName : string;
    lastName : string;
    age : number;
    ssn? : string;
}

class Person {
    constructor(public config : IPerson) {

    }
}

let aPerson : IPerson = {
    firstName : 'John',
    lastName : 'Smith',
    age : 29
}

let p = new Person(aPerson);
console.log('Last name : ' + p.config.lastName);