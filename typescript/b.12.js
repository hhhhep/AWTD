var Person = /** @class */ (function () {
    function Person(config) {
        this.config = config;
    }
    return Person;
}());
var aPerson = {
    firstName: 'John',
    lastName: 'Smith',
    age: 29
};
var p = new Person(aPerson);
console.log('Last name : ' + p.config.lastName);
