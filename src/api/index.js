const express = require('express');

const PORT = process.env.port || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`server started at: http://localhost:${PORT}`));
