const fm = await import("fs");
const mysql2 = await import("mysql2");
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const expressModule = await import("express");
const corsModule = await import("cors");
import dotenv from 'dotenv';
dotenv.config();


const express = expressModule.default;
const cors = corsModule.default;

const app = express();
app.use(cors());


const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect once at startup
connection.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
        process.exit(1);
    }
    console.log("DB connected successfully");
});

const exe_qu = (query, cb) => {
    connection.query(query, (error, result) => {
        if (error) {
            console.error("DB query error:", error);  // <--- add this
            cb(error, null);
            return;
        }
        cb(null, result);
    });
};


app.get("/data", async (req, res) => {
    exe_qu("SELECT * FROM tr_data", async (ERR, RES) => {
        if (ERR) {
            return res.status(500).send("Failed to collect DATA.");
        }

        res.json(RES);

        // Safe save to ./data/QueryResult.json
        try {
            const dataDir = join(__dirname, '');
            await mkdir(dataDir, { recursive: true });  // makes sure folder exists

            const filePath = join(dataDir, 'Data.json');
            await writeFile(filePath, JSON.stringify(RES, null, 2), 'utf-8');
            console.log("Result saved");
        } catch (err) {
            console.error("Failed to write JSON file:", err);
        }
    });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
