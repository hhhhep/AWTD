interface IPayable {
    (percent : number) : boolean;
}

class Person {
    constructor(private validator : IPayable) {
    }

    increasePay(percent : number) : boolean {
        return this.validator(percent);
    }
}

const forEmployees : IPayable = (percent) => {
    console.log('Increasing salary by ', percent);
    return true;
};

const forContractors : IPayable = (percent) => {
    const increaseCap : number = 20;

    if (percent < increaseCap) {
        console.log('Increasing hourly rate by ', percent);
        return true;
    } else {
        console.log('Sorry, the increase cap for contractor is ', increaseCap);
        return false;
    }
};

const workers : Array<Person> = [];
workers[0] = new Person(forEmployees);
workers[1] = new Person(forContractors);

workers.forEach(worker => worker.increasePay(30));