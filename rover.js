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
//       let sentCommands = message.commands;
//       let responseCommands = [];
//       if (!Array.isArray(sentCommands)) {
//          // Makes sure Commmands are in array form
//          sentCommands = [sentCommands];   
//       }
//       // Loops through the array of commands sent to the rover and applies changes if one of the three command types is issued
//       for (let i = 0; i < sentCommands.length; i++) {
//          let completedBoolean = true;     

//          // Variable for the 'completed' key in the rover's response
//          let statusBoolean = sentCommands[i].commandType === "STATUS_CHECK";
//          let currentStatus = {};
//          if (sentCommands[i].commandType === "MODE_CHANGE") {
//             completedBoolean = (sentCommands[i].value === "NORMAL" || sentCommands[i].value === "LOW_POWER");
//             this.mode = sentCommands[i].value;
//          }  else if (sentCommands[i].commandType === "MOVE") {
//             completedBoolean = (this.mode === "NORMAL");
//             if (completedBoolean) {
//                this.position = sentCommands[i].value;
//             }
//          }  else if (sentCommands[i].commandType === "STATUS_CHECK") {
//             currentStatus = {"mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position};
//             completedBoolean = statusBoolean;
//          }  else {
//             // Indicates a command is not completed if one of the three command types isn't issued
//             completedBoolean = false;
//          }
//          let input = {
//             "completed": completedBoolean,
//             // If applicable, adds 'Status Check' to the rover's results' response
//             ...(statusBoolean && {"roverStatus": currentStatus})
//          };
//          responseCommands.push(input);
//       }
//       let response = {
//          "message": message.name,
//          "results": responseCommands
//       };
//       return response;
//    }
// } 

module.exports = Rover;