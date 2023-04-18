// Here I'll use env vars to start my server & other services
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
