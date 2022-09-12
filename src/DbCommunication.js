import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (person) => {
  const request = axios.post(baseUrl, person);
  return request.then(response => response.data);
}

const deletePerson = (person) => {
  if(window.confirm(`Are you sure you want to delete ${person.name}?`)) {
    const request = axios.delete(`${baseUrl}/${person.id}`);
    return request.then(response => response.data);
  } else {
      throw new Error('Delete cancelled');
  }
}

const update = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  return request.then(response => response.data);
}

const DBCommunication = { getAll, create, deletePerson, update };

export default DBCommunication;