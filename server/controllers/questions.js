const { url, Atelier } = require('../lib/AtelierAPI');
// let URL = url.questions;
const SERVER = 'http://localhost:3001'
const URL = `${SERVER}/api/qa/questions`;
const axios = require('axios');

const ERROR_MESSAGES = [
  'Unable to retrieve questions from \'/questions/list\'',
  'Unable to retrieve answers from \'/question/:question_id/answers\'',
  '',
  '',
  '',
  '',
];

/* ======================
    /api/qa/questions
====================== */
module.exports = {
  /* - - - - -
      get
   - - - - - */
  list: (req, res) => {
    axios.get(URL, { params: req.query })
      .then(response => res.status(response.status).json(response.data))
      .catch(err => res.status(404).json(ERROR_MESSAGES[0]));
  },
  answers: (req, res) => {
    axios.get(`${URL}/${req.params.question_id}/answers`, { params: req.query })
      .then(response => res.status(response.status).json(response.data))
      .catch(err => res.status(404).json(ERROR_MESSAGES[1]));
  },
  /* - - - - -
      post
   - - - - - */
  ask: (req, res) => {
    axios.post(URL, req.body)
      .then(response => res.status(response.status).json(response.data))
      .catch(err => res.status(404).json(ERROR_MESSAGES[2]));
  },
  answer: (req, res) => {
    axios.post(`${URL}/answers/?question_id=${req.params.question_id}`, req.body)
      .then(response => res.status(response.status).json(response.data))
      .catch(err => res.status(404).json(ERROR_MESSAGES[3]));
  },
  /* - - - - -
      put
   - - - - - */
  helpful: (req, res) => {
    axios.put(`${URL}/${req.params.question_id}/helpful`, req.body)
      .then(response => res.status(response.status).json(response.data))
      .catch(err => res.status(404).json(ERROR_MESSAGES[4]));
  },
  report: (req, res) => {
    axios.put(`${URL}/${req.params.question_id}/report`, req.body)
      .then(response => res.status(response.status).json(response.data))
      .catch(err => res.status(404).json(ERROR_MESSAGES[5]));
  },
};
