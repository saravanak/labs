import { z } from 'zod';

export const getPropertyPaths = (schema: z.ZodType): string[] => {
  // Adjusted: Signature now uses z.ZodType to eliminate null& undefined check
  // check if schema is nullable or optional
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return getPropertyPaths(schema.unwrap());
  }
  // check if schema is an array
  if (schema instanceof z.ZodArray) {
    return getPropertyPaths(schema.element);
  }
  // check if schema is an object
  if (schema instanceof z.ZodObject) {
    // get key/value pairs from schema
    const entries = Object.entries<z.ZodType>(schema.shape); // Adjusted: Uses z.ZodType as generic to remove instanceof check. Since .shape returns ZodRawShape which has z.ZodType as type for each key.
    // loop through key/value pairs
    return entries.flatMap(([key, value]) => {
      // get nested keys
      const nested = getPropertyPaths(value).map(
        (subKey) => `${key}.${subKey}`
      );
      // return nested keys
      return nested.length ? nested : key;
    });
  }
  // return empty array
  return [];
};
