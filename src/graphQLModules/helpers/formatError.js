export default (err) => {
  const { extensions: { code } = {} } = err;

  if (process.env.NODE_ENV !== "production") {
    console.log({ err });
    return err;
  }

  const message = treatErrorMessage(code);
  return new Error(message);
};

const treatErrorMessage = (errorCode) => {
  const INTERNAL_SERVER_ERROR_MESSAGE = "Internal server error";
  return (
    {
      BAD_USER_INPUT: "Invalid input",
      FORBIDDEN: "Resource not found",
      INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_MESSAGE,
    }[errorCode] || INTERNAL_SERVER_ERROR_MESSAGE
  );
};
