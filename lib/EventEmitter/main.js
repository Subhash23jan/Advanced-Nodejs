const { TicketManager } = require('./events.js');
const { EmailService } = require('./services.js');
const ticketManager = new TicketManager(1);
const emailService = new EmailService();

ticketManager.on('buy', emailService.checkOut);
ticketManager.on('sell', (email) => { 
    console.log(`operation successfull for ${email}`);
});
ticketManager.on('error', (email)=>{
    console.log('Error occured');
});
if (ticketManager.tickets > 1) {
    console.log('ticket not available');
    ticketManager.removeAllListeners();
}
ticketManager.sellTicket("123@gmailc.com");
ticketManager.sellTicket("123@gmailc.com");
//ticketManager.sellTicket("123@gmailc.com");