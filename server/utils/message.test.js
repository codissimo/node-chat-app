var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store response in variable
    // assert from match
    // assert text match
    // assert createdAt is number

    var from = 'Takuya';
    var text = 'Some text';
    var message = generateMessage(from, text);

    // expect(message.createdAt).toBeA('number');
    // expect(message).toInclude({from, text});
  });
});