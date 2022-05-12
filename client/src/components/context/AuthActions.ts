

export const LoginStart = (userCredentials: userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: User) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error: any) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
