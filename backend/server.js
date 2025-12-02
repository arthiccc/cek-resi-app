// server.js

// ADD THIS LINE AT THE VERY TOP
require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const { Server } = require("socket.io");
const axios = require("axios");
const cron = require("node-cron");

// --- Configuration ---
// CHANGE THIS LINE to use the environment variable
const AGGREGATOR_API_KEY = process.env.BINDERBYTE_API_KEY;

// ... the rest of the code remains the same
