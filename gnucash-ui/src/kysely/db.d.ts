import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface _PrismaMigrations {
  applied_steps_count: Generated<number>;
  checksum: string;
  finished_at: Timestamp | null;
  id: string;
  logs: string | null;
  migration_name: string;
  rolled_back_at: Timestamp | null;
  started_at: Generated<Timestamp>;
}

export interface Accounts {
  access_token: string | null;
  created_at: Generated<Timestamp>;
  expires_at: number | null;
  id_token: string | null;
  provider: string;
  provider_account_id: string;
  refresh_token: string | null;
  refresh_token_expires_in: number;
  scope: string | null;
  session_state: string | null;
  token_type: string | null;
  type: string;
  updated_at: Timestamp;
  user_id: string;
}

export interface Authenticators {
  counter: number;
  credentialBackedUp: boolean;
  credentialDeviceType: string;
  credentialID: string;
  credentialPublicKey: string;
  provider_account_id: string;
  transports: string | null;
  user_id: string;
}

export interface CarbonFps {
  id: Generated<number>;
  unit: string;
  user_id: string;
}

export interface Commentables {
  comment_id: number;
  commentee_id: number;
  commentee_type: string;
  id: Generated<number>;
}

export interface Comments {
  comment: string;
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  user_id: string;
}

export interface Countries {
  hdi: number;
  id: Generated<number>;
  name: string;
}

export interface Demographics {
  country: string;
  footprint_id: number;
  householdIncome: number;
  houseSize: number;
  id: Generated<number>;
}

export interface EmissionsVehicles {
  footprint_id: number;
  fuelType: string;
  id: Generated<number>;
  mileage: number;
  milesPerYear: number;
  name: string | null;
}

export interface Luggages {
  comment: string | null;
  height: number | null;
  id: Generated<number>;
  length: number | null;
  name: string;
  shelfId: number;
  type: string;
  width: number | null;
}

export interface Painting {
  id: Generated<number>;
  name: string | null;
}

export interface PaintLog {
  color: number | null;
  created_at: Timestamp | null;
}

export interface PaintMatrix {
  color: number | null;
  created_at: Timestamp | null;
  id: Generated<number>;
  paint_id: number | null;
  x: number | null;
  y: number | null;
}

export interface PaintTemplates {
  color: number | null;
  id: Generated<number>;
  paint_id: number;
  x: number | null;
  y: number | null;
}

export interface Racks {
  comment: string;
  id: Generated<number>;
  name: string;
  shortName: string;
  type: string;
}

export interface Sessions {
  created_at: Generated<Timestamp>;
  expires: Timestamp;
  sessionToken: string;
  updated_at: Timestamp;
  user_id: string;
}

export interface Shelves {
  comment: string;
  id: Generated<number>;
  rackId: number;
  shortName: string;
}

export interface Spaces {
  id: Generated<number>;
  is_system_space: Generated<boolean>;
  name: string;
  owner_id: string;
}

export interface StatusMeta {
  id: Generated<number>;
  statuses: string;
}

export interface StatusTransitions {
  comment: string;
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  status: string;
  todo_id: number;
  updated_at: Timestamp;
}

export interface Todos {
  created_at: Generated<Timestamp>;
  description: string;
  id: Generated<number>;
  space_id: number;
  statusMetaId: number;
  title: string;
  updated_at: Timestamp;
}

export interface Users {
  api_key: string | null;
  country_id: number | null;
  created_at: Generated<Timestamp>;
  email: string;
  emailVerified: Timestamp | null;
  footprint_id: number | null;
  id: string;
  image: string | null;
  name: string | null;
  space_id: number | null;
  updated_at: Timestamp;
}

export interface UserSpace {
  id: Generated<number>;
  space_id: number;
  user_id: string;
}

export interface VerificationTokens {
  expires: Timestamp;
  identifier: string;
  token: string;
}

export interface DB {
  _prisma_migrations: _PrismaMigrations;
  accounts: Accounts;
  authenticators: Authenticators;
  carbon_fps: CarbonFps;
  commentables: Commentables;
  comments: Comments;
  countries: Countries;
  demographics: Demographics;
  emissions_vehicles: EmissionsVehicles;
  luggages: Luggages;
  paint_log: PaintLog;
  paint_matrix: PaintMatrix;
  paint_templates: PaintTemplates;
  painting: Painting;
  racks: Racks;
  sessions: Sessions;
  shelves: Shelves;
  spaces: Spaces;
  status_meta: StatusMeta;
  status_transitions: StatusTransitions;
  todos: Todos;
  user_space: UserSpace;
  users: Users;
  verification_tokens: VerificationTokens;
}
