
class EmailService{
    constructor() { }
    checkOut(email) {
        console.log('Checking out for', email);
    }

    FailHandler() {
        console.log('Failed');
    }
}


module.exports = { EmailService };