// Here I'll use env vars to start my server & other services
require("dotenv").config();

const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
