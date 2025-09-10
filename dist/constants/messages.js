"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
var Messages;
(function (Messages) {
    // Login Messages
    Messages["LOGIN_SUCCESS"] = "\u2705 Logged in successfully.";
    Messages["PASSWORD_INCORRECT"] = "\u274C The password you entered is incorrect.";
    Messages["USER_BLOCKED"] = "\u274C This account has been blocked. Please contact support.";
    Messages["USER_NOT_FOUND"] = "\u274C No account found with the provided email address.";
    Messages["LOGOUT_SUCCESS"] = "\u2705 Logged out successfully.";
    Messages["INTERNAL_SERVER_ERROR"] = "\u274C Server error";
    // Token & Authorization Messages
    Messages["ACCESS_TOKEN_INVALID"] = "\u274C Access token verification failed.";
    Messages["REFRESH_TOKEN_INVALID"] = "\u274C Refresh token verification failed.";
    Messages["NO_TOKEN"] = "\u274C No authentication tokens found in the request.";
    Messages["UNAUTHORIZED_ACCESS"] = "\u274C You are not authorized to access this resource.";
    // Workshop Messages
    Messages["CUSTOMER_CREATED"] = "\u2705 Customer created successfully.";
    Messages["CUSTOMER_UPDATED"] = "\u2705 Customer updated successfully.";
    Messages["CUSTOMER_NOT_FOUND"] = "\u274C Customer not found.";
    Messages["CUSTOMER_ALREADY_EXISTS"] = "\u274C Customer with this unique code already exists.";
    Messages["VEHICLE_CREATED"] = "\u2705 Vehicle created successfully.";
    Messages["VEHICLE_UPDATED"] = "\u2705 Vehicle updated successfully.";
    Messages["VEHICLE_NOT_FOUND"] = "\u274C Vehicle not found.";
    Messages["VEHICLE_ALREADY_EXISTS"] = "\u274C Vehicle with this number already exists.";
    Messages["ORDER_CREATED"] = "\u2705 Order created successfully.";
    Messages["ORDER_UPDATED"] = "\u2705 Order updated successfully.";
    Messages["ORDER_NOT_FOUND"] = "\u274C Order not found.";
})(Messages || (exports.Messages = Messages = {}));
