"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const db_1 = __importDefault(require("./db/db"));
const HighScore_1 = __importDefault(require("./models/HighScore"));
function startServer() {
    const app = express_1.default();
    app.use(body_parser_1.json());
    const { PORT } = process.env;
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
    // Routes
    app.get('/api/highscore', () => {
        console.log(HighScore_1.default.find());
    });
    app.post('/api/highscore', (req, res) => {
        const { name, highScore } = req.query;
        const newHighScore = new HighScore_1.default({
            name,
            highScore,
        });
        newHighScore.save((err, highScore) => {
            if (err) {
                res.status(404).json({
                    error: 'Something went wrong while trying to save the high score.'
                });
            }
            else {
                res.status(200).json(highScore);
            }
        });
    });
    db_1.default();
}
exports.default = startServer;
