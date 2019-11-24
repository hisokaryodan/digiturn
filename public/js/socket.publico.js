var socket = io();
var ticket1 = $("#lblTicket1");
var ticket2 = $("#lblTicket2");
var ticket3 = $("#lblTicket3");
var ticket4 = $("#lblTicket4");
var escritorio1 = $("#lblEscritorio1");
var escritorio2 = $("#lblEscritorio2");
var escritorio3 = $("#lblEscritorio3");
var escritorio4 = $("#lblEscritorio4");

var tickets = [ticket1, ticket2, ticket3, ticket4];
var escritorios = [escritorio1, escritorio2, escritorio3, escritorio4];

socket.on("estadoActual", function(data) {
  // console.log("Resp: ", data);
  actualizarElements(data.ultimos4);
});

socket.on("ultimos4", function(data) {
  // console.log("Resp: ", data);
  var audio = new Audio('audio/new-ticket.mp3');
  audio.play();
  actualizarElements(data.ultimos4);
});

function actualizarElements(data) {
    for (let i = 0; i < data.length; i++) {
      tickets[i].text("Ticket " + data[i].numero);
      escritorios[i].text("Escritorio " + data[i].escritorio);
    }
    
}
