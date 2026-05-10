import "dotenv/config"
import express from "express";
import { checkHandleAvailability } from "./services/handle.service.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/check/:handle",
    async (req, res) => {
        try {
            const result = await checkHandleAvailability(req.params.handle);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({
                error: err.message 
            });
        }
    }
)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})