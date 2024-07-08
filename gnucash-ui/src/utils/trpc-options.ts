import { omit } from "lodash";
import SuperJSON from "superjson";
import { ZodError } from "zod";

export default {
  transformer: SuperJSON,
  errorFormatter({ shape, error }: any) {
    console.error("Got error", error, shape);

    return {
      ...shape,
      data: {
        ...omit(shape.data, ["stack"]),

        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
};
