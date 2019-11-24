const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", client => {
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log("siguiente ticket: ", siguiente);
    callback(siguiente);
  });

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        message: "El escritorio es necesario"
      });
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);

    //Broadcast
    client.broadcast.emit('ultimos4', {
        ultimos4: ticketControl.getUltimos4()
    });

  });
  
  /* console.log('Usuario Conectado');

    client.emit('enviarMensaje', {
        usuario: 'admin',
        mensaje: 'Bienvenido a esta App'
    });

    client.on('disconnect', () => {
        console.log('Usuario Desconectado');
    });

    // Escuchar al Cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log('Msg: ', data);

        client.broadcast.emit('enviarMensaje', data);

        //callback();
    }); */
});
