const EventEmitter=require('events');
class TicketManager extends EventEmitter{
    constructor(tickets) {
      super();
      this.tickets=tickets
    }
    sellTicket(email){
      if(this.tickets>0){
        this.tickets--;
        this.emit('sell',this.tickets,email);
      } else {
          this.emit('error', email);
      }
    }
    buyTicket(email) {
        if (this.tickets < 5) {
            this.tickets++;
            this.emit('buy', this.tickets, email);
        } else {
            this.emit('sell', this.tickets, email);
        }
    }
}
module.exports = { TicketManager };