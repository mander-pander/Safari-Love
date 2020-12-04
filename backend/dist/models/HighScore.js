"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
class HighScore {
}
__decorate([
    typegoose_1.prop({ required: true })
], HighScore.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({ required: true, min: 0, max: 99999 })
], HighScore.prototype, "score", void 0);
const HighScoreModel = typegoose_1.getModelForClass(HighScore);
exports.default = HighScoreModel;
