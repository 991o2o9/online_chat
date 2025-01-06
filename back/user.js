const { trimStr } = require('./utils');

let users = [];

const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
  );
};

const addUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  const isExist = findUser(user);

  const newUser = { name: userName, room: userRoom };

  if (!isExist) {
    users.push(newUser);
  }

  const currentUser = isExist || newUser;

  return { isExist: !!isExist, user: currentUser };
};

const getUser = (user) => findUser(user);

module.exports = { addUser, getUser, findUser };
