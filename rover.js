const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts
   }

   receiveMessage(message) {
      let tempCommands = message.commands;
      let response = [];
  
      // if this is not added to confirm its an array then rover.spec 11 test fails
      if (!Array.isArray(tempCommands)) {
           tempCommands = [tempCommands];   
     }
  
     for (let i in tempCommands) {
        let test = true;
        if (tempCommands[i].commandType === 'MOVE') {
          if (this.mode === 'NORMAL') {
           // returns the correct position you want rover to move
           // for instance if I forgot to add this then everything is 98382
           this.position = tempCommands[i].value;
          } else test = false;
        }
        else if(tempCommands[i].commandType === 'MODE_CHANGE') {
          // handles changing of power from normal to low or vice versa.
          // things like moving and changing from true to false also effected 
          this.mode = tempCommands[i].value;
        }
  
        // was added to add various objects and things from different areas. Some reason things
        // wont convert naturally without it. Handles true/false statement returns.
        // usually used on json type values
        response[i] = {completed: test};
        if(tempCommands[i].commandType === 'STATUS_CHECK') {
          response[i]["roverStatus"] = {
              position: this.position, // passes position of rover
              mode: this.mode, // checks the mode
              generatorWatts: this.generatorWatts // watts the generator producing
          }
        };
     };
     return { 
        message: message.name, 
        results: response
     }
    }
  }

module.exports = Rover;