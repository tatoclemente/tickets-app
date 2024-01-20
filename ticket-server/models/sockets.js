
const TicketList = require('./ticket-list')

class Sockets {

  constructor( io ) {

    this.io = io;

    // Crear la instancia de nuestro ticketlist
    this.ticketList = new TicketList();

    this.socketsEventes();
    
  }

  socketsEventes() {

    // On connection
    this.io.on('connection', ( socket ) => { 

      console.log('Cliente conectado');
      // Escuchar evento: mensaje-to-server

      socket.on('select-ticket', ( _, callback ) => {
        const newTicket = this.ticketList.createTicket()
        callback(newTicket)
        
      })

      socket.on('next-ticket', ({ agente: agent, escritorio: desk }, callback) => {
        console.log({ agent, desk});
        const ticket = this.ticketList.assignTicket(agent, desk)
        callback(ticket)

        this.io.emit( 'ticket-assigned', this.ticketList.last13 )

      })

      // socket.on('mensaje-to-server', (data) => {
      //   console.log(data);

      //   // Emitir evento: mensaje-from-server
      //   this.io.emit('mensaje-from-server', data)
      // })
      
    }); 
  }

}


module.exports = Sockets;