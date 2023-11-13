class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      if (!name) {
        throw Error("Must pass valid name as first parameter");
      }
      this.commands = commands;
   }   
}

module.exports = Message;