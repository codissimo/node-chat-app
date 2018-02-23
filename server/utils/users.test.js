const expect = require('expect');

const {Users} = require('./users');

var users;

beforeEach(() => {
  users = new Users();
  users.users = [{
    id: 1,
    name: 'Takuya',
    room: 'Node Room'
  }, {
    id: 2,
    name: 'Mio',
    room: 'Node Room'
  }, {
    id: 3,
    name: 'Dani',
    room: 'K Room'
  }]
});

describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Takuya',
      room: 'Node Room'
    }
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);  
  });

  it ('should remove user', () => {
    var userId = 3;
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it ('should not remove user', () => {
    var userId = 69;
    var user = users.removeUser(userId);
    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
  });

  it ('should find user', () => {
    var userId = 2;
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it ('should not find user', () => {
    var userId = 69;
    var user = users.getUser(userId);
    expect(user).toNotExist;
  });

  it ('should return names for Node Room', () => {
    var userList = users.getUserList('Node Room');
    expect(userList).toEqual(['Takuya', 'Mio']);
  });

  it ('should return names for K Room', () => {
    var userList = users.getUserList('K Room');
    expect(userList).toEqual(['Dani']);
  });

});