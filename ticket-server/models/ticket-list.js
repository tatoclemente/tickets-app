const Tickets = require('./ticket')


class TicketList {

  constructor() {
    this.lastNumber = 0;

    this.pendings = [];
    this.assigned = [];

  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  // 3 tickets que se veran en las tarjetas y 10 en el historial

  get last13() {
    return this.assigned.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Tickets(this.nextNumber);
    this.pendings.push(newTicket);
    return newTicket;
  }

  // Asignar el ticket al agente
  assignTicket(agent, desk) {
    if (this.pendings.length === 0) {
      return null;
    }

    const nextTicket = this.pendings.shift();
    nextTicket.agent = agent;
    nextTicket.desk = desk;

    this.assigned.unshift(nextTicket);

    return nextTicket

  }

}

module.exports = TicketList;