import SuperJSON from "superjson";
import { ZodError } from "zod";

export default  {
    transformer: SuperJSON,
    errorFormatter({ shape, error }:any) {
      console.error("Got error",  error.cause.errors, shape);
      
      return {
        ...shape,
        cause: {errors: error.cause.errors},     
        // data: {
        //   ...shape.data,
   
        //   zodError:
        //     error.cause instanceof ZodError ? error.cause.flatten() : null,
        // },
      };
    },
  }