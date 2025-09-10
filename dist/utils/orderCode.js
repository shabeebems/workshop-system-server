"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumber = void 0;
const generateOrderNumber = () => {
    const number = Math.floor(1000 + Math.random() * 9000);
    const letters = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `MO${number}${letters}`;
};
exports.generateOrderNumber = generateOrderNumber;
