
import * as helpers from '../helpers'

const users = [
  {
    id: 0,
    name: 'Oleksii',
    city: 'Kiev'
  },
  {
    id: 1,
    name: 'Ivan',
    city: 'Dnepropetrovsk'
  },
  {
    id: 2,
    name: 'Vasya',
    city: 'Odessa'
  }
];

export function getUserById (userId) {
  return users.filter(function (item) {
    return item.id == userId
  })[0]
}

export function getUsers (size, page) {

  const startIdx = page * size;
  return users.slice(startIdx, startIdx + size );
}

export function createUser (obj) {
  let newUser = {
    id: users.length,
    name: obj.name,
    city: obj.city
  };
  users.push(newUser);
  return newUser;
}

export function updateUserById (userId, obj) {
  let user = getUserById(userId);

  user = Object.assign(user, helpers.filterNull({
    name: obj.name,
    city: obj.city
  }));

  return user;

}
