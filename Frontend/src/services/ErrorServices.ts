import { CustomError } from "../errors/CustomError";

export default function handleError(error: unknown) {
  if (error instanceof CustomError) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({ message: error.message }),
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }), // Garantizamos que tenga mensaje
    };
  }

  console.error("Error desconocido:", error);

  return {
    statusCode: 500,
    body: JSON.stringify({ message: String(error) }), // Convertimos a string
  };
}
