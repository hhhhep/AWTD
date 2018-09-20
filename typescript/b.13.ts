interface IPayable {
    increasePay(percent : number) : boolean;
}

class Person {
    constructor() {
    }
}

class Employee extends Person implements IPayable {
    increasePay(percent : number) : boolean {
        console.log('Increasing salary by ' + percent);
        return true;
    }
}

class Contractor implements IPayable {
    increaseCap : number = 20;

    increasePay(percent : number) : boolean {
        if (percent < this.increaseCap) {
            console.log('Increasing');
            return true;
        } else {
            console.log('Sorry, the increase cap for contractors is ', this.increaseCap);
            return false;
        }
    }
}

let workers : Array<IPayable> = [];
workers[0] = new Employee();
workers[1] = new Contractor();

workers.forEach(worker => worker.increasePay(30));