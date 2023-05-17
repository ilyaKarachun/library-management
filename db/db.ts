const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "",
    host: "",
    port: "",
    database: "" 
})

export default pool;