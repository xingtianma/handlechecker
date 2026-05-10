import "dotenv/config";
import { checkHandleAvailability } from "../../src/services/handle.service.js";

export default async function handler(req, res) {
    const { handle } = req.query;

    try {
        const result = await checkHandleAvailability(handle);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
