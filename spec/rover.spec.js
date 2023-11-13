const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", ()=> {
    let rover = new Rover(98382);  
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
  
  test("response returned by receiveMessage contains the name of the message", ()=> {
    let rover = new Rover(98382);   
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
      let newMessage = new Message('New Name', commands);
      expect(rover.receiveMessage(newMessage).message).toBe('New Name');
  });
  
  test("response returned by receiveMessage includes two results if two commands are sent in the message", ()=> {
    let rover = new Rover(98382);    
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let newMessage = new Message('Two Commands', commands);
    expect(rover.receiveMessage(newMessage).results.length).toBe(commands.length);
  });
  
  test("responds correctly to the status check command", ()=> {
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
    let message = new Message('sending a status check', commands);
    let rover = new Rover(87382098);   
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(true);
    expect(response.results[1].roverStatus.mode).toBe('NORMAL');
    expect(response.results[1].roverStatus.position).toBe(87382098);
    expect(response.results[1].roverStatus.generatorWatts).toBe(110);
  });
  
  test("responds correctly to the mode change command", ()=> {
    let commands = new Command('MODE_CHANGE', 'LOW_POWER');
    let message = new Message('Mode Change', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  
    commands = new Command('MODE_CHANGE', 'NORMAL');
    message = new Message('Mode Change', commands);
    response = rover.receiveMessage(message);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
  });
  
  test("responds with a false completed value when attempting to move in LOW_POWER mode", ()=> {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 420)];
    let message = new Message('Moving ON LOW POWER MODE?!?!', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(false);
    expect(rover.position).toBe(98382);
  });
  
  test("responds with the position for the move command", ()=> {
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 420)];
    let message = new Message('Changes Mode to Normal to actually move to new Position', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(true);
    expect(rover.position).toBe(420);
  });  

});
