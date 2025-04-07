import { CustomError } from "../errors/CustomError";

export default function handleError(error: unknown) {
  if (error instanceof CustomError) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }

  return {
    statusCode: 500,
    body: String(error),
  };
}
