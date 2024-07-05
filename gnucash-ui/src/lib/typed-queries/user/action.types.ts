/** Types generated for queries found in "src/lib/typed-queries/user/action.ts" */
export type NumberOrString = number | string;

/** 'GetUserSpaces' parameters type */
export interface IGetUserSpacesParams {
  spaceId?: NumberOrString | null | void;
  spaceName?: string | null | void;
  userId?: string | null | void;
}

/** 'GetUserSpaces' return type */
export interface IGetUserSpacesResult {
  email: string;
  name: string;
}

/** 'GetUserSpaces' query type */
export interface IGetUserSpacesQuery {
  params: IGetUserSpacesParams;
  result: IGetUserSpacesResult;
}

/** 'GetSharedUserSpaces' parameters type */
export interface IGetSharedUserSpacesParams {
  spaceId?: NumberOrString | null | void;
  spaceName?: string | null | void;
  userId?: string | null | void;
}

/** 'GetSharedUserSpaces' return type */
export interface IGetSharedUserSpacesResult {
  email: string;
  name: string;
}

/** 'GetSharedUserSpaces' query type */
export interface IGetSharedUserSpacesQuery {
  params: IGetSharedUserSpacesParams;
  result: IGetSharedUserSpacesResult;
}

