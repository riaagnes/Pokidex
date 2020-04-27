const users = {};
const allUsersFavorites = {};

const addSession = ( user,id ) => {
  users[id] = {userName:user,favorites:{}}
  
  return users[id]
};
const deleteSession = (id) => {
  const user= users[id];
  delete users[id];
  return user;
};

module.exports = {
  users,
  allUsersFavorites,
  addSession,
  deleteSession
};