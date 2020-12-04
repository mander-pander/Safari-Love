"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lodash_1 = __importDefault(require("lodash"));
function startDB() {
    const { MONGODB_URI } = process.env;
    if (!lodash_1.default.isString(MONGODB_URI)) {
        throw Error('MongoDB URI not found in .env file.');
    }
    mongoose_1.default.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'Connection Error:'));
    db.once('open', function () {
        console.log('Connected!');
    });
}
exports.default = startDB;
