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
  UNAUTHORIZED_ACCESS = "❌ You are not authorized to access this resource."

}
