var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    var from = 'Test user';
    var lat = '33';
    var lng = '118';
    var url = 'https://www.google.com/maps?q=33,118';
    var message = generateLocationMessage(from, lat, lng);  
  });
});