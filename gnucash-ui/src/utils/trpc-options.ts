import SuperJSON from "superjson";
import { ZodError } from "zod";

export default  {
    transformer: SuperJSON,
    errorFormatter({ shape, error }:any) {
      console.error("Got error",  error.message);
      
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  }