class Person {
    constructor(public firstName: string, public lastName: string,
        public age: number, private _ssn?: string) {
            
        }
}

class Employee extends Person {
    department: string;

    constructor(firstName: string, lastName: string,
        age: number, _ssn: string, department: string) {
            super(firstName, lastName, age, _ssn);
            this.department = department;
        }
}