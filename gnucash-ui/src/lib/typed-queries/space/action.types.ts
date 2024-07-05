/** Types generated for queries found in "src/lib/typed-queries/space/action.ts" */
export type NumberOrString = number | string;

/** 'SqlGetAllSpaces' parameters type */
export interface ISqlGetAllSpacesParams {
  cursor?: NumberOrString | null | void;
  email?: string | null | void;
  limit?: NumberOrString | null | void;
}

/** 'SqlGetAllSpaces' return type */
export interface ISqlGetAllSpacesResult {
  count: string | null;
  id: number | null;
  name: string | null;
}

/** 'SqlGetAllSpaces' query type */
export interface ISqlGetAllSpacesQuery {
  params: ISqlGetAllSpacesParams;
  result: ISqlGetAllSpacesResult;
}

