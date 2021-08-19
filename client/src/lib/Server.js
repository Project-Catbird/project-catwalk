/*
 * SERVER must be set to the public-ipv4 which may be retrieved
 * by using the following command in the instance terminal:
 * 	 curl "http://169.254.169.254/latest/meta-data/public-ipv4"
 */
const axios = require('axios');
const SERVER = 'localhost';
const PORT = 3000;
const BASE_URL = `http://${SERVER}:${PORT}/api`;

const url = {
  products: 'products',
  reviews: 'reviews',
  questions: 'qa/questions',
  answers: 'qa/answers',
  cart: 'cart',
  interactions: 'interactions',
}

const Server = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': '*',
      'accept': 'application/json',
      'access-control-allow-methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'application/json',
    }
  }
})

module.exports = { url, Server };
