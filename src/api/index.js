const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DEFAULT_PORT = process.env.PORT || 3000;
let PEER_PORT = null;

if (process.env.GENERATE_PEER_PORT) {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
} else {
  PEER_PORT = DEFAULT_PORT;
}

app.listen(PEER_PORT, () => console.log(`server started at: http://localhost:${PEER_PORT}`));
