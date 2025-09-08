export enum Messages {

  // Login Messages
  LOGIN_SUCCESS = "✅ Logged in successfully.",
  PASSWORD_INCORRECT = "❌ The password you entered is incorrect.",
  USER_BLOCKED = "❌ This account has been blocked. Please contact support.",
  USER_NOT_FOUND = "❌ No account found with the provided email address.",

  LOGOUT_SUCCESS = "✅ Logged out successfully.",
  INTERNAL_SERVER_ERROR = "❌ Server error",

  // Token & Authorization Messages
  ACCESS_TOKEN_INVALID = "❌ Access token verification failed.",
  REFRESH_TOKEN_INVALID = "❌ Refresh token verification failed.",
  NO_TOKEN = "❌ No authentication tokens found in the request.",
  UNAUTHORIZED_ACCESS = "❌ You are not authorized to access this resource.",

  // Workshop Messages
  CUSTOMER_CREATED = "✅ Customer created successfully.",
  CUSTOMER_UPDATED = "✅ Customer updated successfully.",
  CUSTOMER_NOT_FOUND = "❌ Customer not found.",
  CUSTOMER_ALREADY_EXISTS = "❌ Customer with this unique code already exists.",

  VEHICLE_CREATED = "✅ Vehicle created successfully.",
  VEHICLE_UPDATED = "✅ Vehicle updated successfully.",
  VEHICLE_NOT_FOUND = "❌ Vehicle not found.",
  VEHICLE_ALREADY_EXISTS = "❌ Vehicle with this number already exists.",

  ORDER_CREATED = "✅ Order created successfully.",
  ORDER_UPDATED = "✅ Order updated successfully.",
  ORDER_NOT_FOUND = "❌ Order not found."
}
