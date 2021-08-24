const uuidv4 = require('uuid/v4');
let rhinoceroses = require('./data');

exports.getAll = () => {
  return rhinoceroses;
};

exports.newRhinoceros = data => {
  const newRhino = {
    id: uuidv4(),
    name: data.name,
    species: data.species,
  };
  
  rhinoceroses.push(newRhino);
  return newRhino;
};
