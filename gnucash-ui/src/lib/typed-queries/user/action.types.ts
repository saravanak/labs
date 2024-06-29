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
  api_key: string | null;
  country_id: number | null;
  created_at: Date;
  email: string;
  emailVerified: Date | null;
  footprint_id: number | null;
  id: string;
  id: number;
  image: string | null;
  name: string | null;
  name: string;
  owner_id: string;
  space_id: number | null;
  updated_at: Date;
}

/** 'GetSharedUserSpaces' query type */
export interface IGetSharedUserSpacesQuery {
  params: IGetSharedUserSpacesParams;
  result: IGetSharedUserSpacesResult;
}

