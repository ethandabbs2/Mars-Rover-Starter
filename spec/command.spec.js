const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {
  test("throws error if a command type is NOT passed into the constructor as the first parameter", ()=> {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  test("constructor sets command type", ()=> {
    let testCommand = new Command('MODE_TEST', 'TEST_CHANGE');
    expect(testCommand.commandType).toBe('MODE_TEST');
  });

  test("constructor sets a value passed in as the 2nd argument", ()=> {
    let testCommand = new Command('MODE_TEST', 'TEST_CHANGE');
    expect(testCommand.value).toBe('TEST_CHANGE');
  });
  
});
