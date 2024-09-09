//create a event class
class Event {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.availableTickets = [];
    }
    addAvailableTickets(type, cost){
       const ticket = new TicketType(type, cost);
       this.availableTickets.push(ticket)
      }
      allTickets(){
        return "All tickets: " + this.availableTickets.map((ticket, index) => `${index + 1}. ${ticket.type} ($${ticket.cost})`).join(" ")
      }

      searchTickets(lower, higher){
        const eligibleTickets = this.availableTickets.filter(ticket => ticket.cost >= lower && ticket.cost <= higher);
        if (eligibleTickets.length === 0) {
          return "No tickets available";
        }
        return "Eligible tickets: " + eligibleTickets.map((ticket, index) => `${index + 1}. ${ticket.type} ($${ticket.cost})`).join(" ");
      }

      }

 //create object using event class
const eventObj1 = new Event("Ghoul Grammy" , "An monsterous music event");
const eventObj2 = new Event("Beyonce", "A night with the legend herself");
const eventObj3 = new Event("Comicon 24", "Destination for heroes and villians alike");
//create empty event array and push events into array
const eventArr = new Array();
eventArr.push(eventObj1, eventObj2, eventObj3); 
console.log(eventArr);


//DOMContentLoaded event handler. This is to prevent any javascript code from running
//before the document is finished loading (is ready).
document.addEventListener("DOMContentLoaded", () => {
    let lower = 0;
    let higher = 100;
    let html = ''; 
    eventArr.forEach((item) => {
        html += `<li>${item.name} - ${item.description} - ${item.searchTickets(lower, higher)}</li>`;
    });
    document.querySelector("#event").innerHTML = html;
})

class TicketType {
    constructor(type, cost) {
        this.type = type;
        this.cost = cost;
    }

}

// //add ticket types
eventObj1.addAvailableTickets("human", 299);
eventObj1.addAvailableTickets("monster", 99);
eventObj2.addAvailableTickets("General Admission", 50);
eventObj2.addAvailableTickets("Floor Seats", 150);
eventObj3.addAvailableTickets("Meet and Greet", 350);
eventObj3.addAvailableTickets("General", 50);
// console.log(addAvailableTickets(eventObj1))
