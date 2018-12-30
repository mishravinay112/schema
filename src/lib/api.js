// Returns a promise.
import axios from 'axios';

export default data =>
  axios({ ...data })
  .then(response => {
    return response;
  })
  .catch(error => error);
