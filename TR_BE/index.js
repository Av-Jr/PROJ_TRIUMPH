const exp = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const secKey = process.env.secKey;
const PoRt = process.env.port;
const app = exp();

app.use(cors());
app.use(exp.json());

// Login Check Route
app.post('/logincheck', (req, res) => {
    const name = req.body.un;
    const pw = req.body.pw;

    if (name === "admin" && pw === "admin") {
        const token = jwt.sign({ name: "admin", pw: "admin" }, secKey, { expiresIn: "1m" });
        return res.status(200).json({sent_token : token});
    }

    res.status(401).send("Invalid credentials");
});

// Token Verify Route
app.post("/verify", (req, res) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(400).send("Auth Header Missing");
    }

    const sent_token = auth.split(" ")[1];
    if (!sent_token) {
        return res.status(400).send("Token missing in auth header");
    }

    try {
        const token_info = jwt.verify(sent_token, secKey);
        res.status(200).json({token_info});
    } catch {
        res.status(401).send("Invalid token");
    }
});

// Server Start
app.listen(PoRt, () => {
    console.log(`Server running at port ${PoRt}`);
});
