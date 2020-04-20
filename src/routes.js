const express = require('express');

const challengeService = require('../src/services/challenge.service');

const routes = new express.Router();

const bodyParser = require('body-parser');

routes.post('/challenge',bodyParser.urlencoded({extended: false}), challengeService.solveChallenge);

module.exports = routes;