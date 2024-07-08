import jp from "jsonpath";
import { ZodSchema, z } from "zod";

const todoListingSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  spaceName: z.string(),
  spaceId: z.number(),
});

const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  spaceId: z.number(),
  spaceOwner: z.string(),
  status: z.string(),
});

const todoDetailedListingSchema = z.object({
  todo: todoSchema,
  comments: z
    .object({
      id: z.number(),
      comment: z.string(),
      created_at: z.string(),
      commented_by: z.string(),
    })
    .array(),
  statusHistory: z
    .object({
      status: z.string(),
      comment: z.string(),
      created_at: z.string(),
    })
    .array(),
});

const getSpaceSchema = z.object({
  name: z.string(),
  id: z.number(),
});

const getUserSpacesSchema = z.object({
  name: z.string(),
  id: z.number(),
  todosCount: z.number(),
  sharedWithCount: z.number(),
});

export const JPUtils = {
  firstItem: (body: any) => jp.value(body, "result.data.json.items[0]"),
  returnValue: (body: any) => jp.value(body, "result.data.json"),
  itemLength: (body: any) => jp.value(body, "result.data.json.items.length"),
  getPathInItems: (body: any, path: string) =>
    jp.value(body, `result.data.json.items${path}`),
  getErrorStatus: (body: any) => jp.value(body, "error.json.data.httpStatus"),
  parseFirstItem: (body: any, schema: ZodSchema) =>
    schema.safeParse(JPUtils.firstItem(body)),
  parseReturnValue: (body: any, schema: ZodSchema) =>
    schema.safeParse(JPUtils.returnValue(body)),
};

export const schemasByAPI = {
  "todo.getOwnTodos": todoListingSchema,
  "todo.getTodosForSpace": todoListingSchema,
  "todo.getDetailedView": todoDetailedListingSchema,
  "space.getSpace": getSpaceSchema,
  "space.getUserSpaces": getUserSpacesSchema,
};

