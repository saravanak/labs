"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const metadata = {
    models: {
        shelf: {
            name: 'Shelf', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, shortName: {
                    name: "shortName",
                    type: "String",
                    attributes: [{ "name": "@unique", "args": [] }],
                }, luggages: {
                    name: "luggages",
                    type: "Luggage",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'storedAt',
                }, partOf: {
                    name: "partOf",
                    type: "Rack",
                    isDataModel: true,
                    isOptional: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'shelves',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "rackId" },
                }, rackId: {
                    name: "rackId",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'partOf',
                }, comment: {
                    name: "comment",
                    type: "String",
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, shortName: {
                    name: "shortName",
                    fields: ["shortName"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "shelves" }] }],
        },
        rack: {
            name: 'Rack', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, name: {
                    name: "name",
                    type: "String",
                }, shortName: {
                    name: "shortName",
                    type: "String",
                    attributes: [{ "name": "@unique", "args": [] }],
                }, type: {
                    name: "type",
                    type: "String",
                }, shelves: {
                    name: "shelves",
                    type: "Shelf",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'partOf',
                }, comment: {
                    name: "comment",
                    type: "String",
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, shortName: {
                    name: "shortName",
                    fields: ["shortName"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "racks" }] }],
        },
        luggage: {
            name: 'Luggage', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, name: {
                    name: "name",
                    type: "String",
                }, comment: {
                    name: "comment",
                    type: "String",
                    isOptional: true,
                }, type: {
                    name: "type",
                    type: "String",
                }, length: {
                    name: "length",
                    type: "Int",
                    isOptional: true,
                }, width: {
                    name: "width",
                    type: "Int",
                    isOptional: true,
                }, height: {
                    name: "height",
                    type: "Int",
                    isOptional: true,
                }, storedAt: {
                    name: "storedAt",
                    type: "Shelf",
                    isDataModel: true,
                    isOptional: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'luggages',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "shelfId" },
                }, shelfId: {
                    name: "shelfId",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'storedAt',
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "luggages" }] }],
        },
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                    isOptional: true,
                }, email: {
                    name: "email",
                    type: "String",
                    attributes: [{ "name": "@unique", "args": [] }],
                }, emailVerified: {
                    name: "emailVerified",
                    type: "DateTime",
                    isOptional: true,
                }, image: {
                    name: "image",
                    type: "String",
                    isOptional: true,
                }, accounts: {
                    name: "accounts",
                    type: "Account",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, sessions: {
                    name: "sessions",
                    type: "Session",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, country_id: {
                    name: "country_id",
                    type: "Int",
                    isOptional: true,
                    isForeignKey: true,
                    relationField: 'country',
                }, country: {
                    name: "country",
                    type: "Country",
                    isDataModel: true,
                    isOptional: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'User',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "country_id" },
                }, Authenticator: {
                    name: "Authenticator",
                    type: "Authenticator",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, created_at: {
                    name: "created_at",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updated_at: {
                    name: "updated_at",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, footprint_id: {
                    name: "footprint_id",
                    type: "Int",
                    isOptional: true,
                    isForeignKey: true,
                    relationField: 'carbonFootprint',
                }, carbonFootprint: {
                    name: "carbonFootprint",
                    type: "CarbonFootprint",
                    isDataModel: true,
                    isOptional: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'User',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "footprint_id" },
                }, space_id: {
                    name: "space_id",
                    type: "Int",
                    isOptional: true,
                }, space: {
                    name: "space",
                    type: "Space",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, api_key: {
                    name: "api_key",
                    type: "String",
                    isOptional: true,
                }, comments: {
                    name: "comments",
                    type: "Comment",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, spaceSharing: {
                    name: "spaceSharing",
                    type: "SpaceSharing",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, email: {
                    name: "email",
                    fields: ["email"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "users" }] }],
        },
        space: {
            name: 'Space', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    attributes: [{ "name": "@unique", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, owner_id: {
                    name: "owner_id",
                    type: "String",
                    isId: true,
                    isForeignKey: true,
                    relationField: 'user',
                }, name: {
                    name: "name",
                    type: "String",
                    isId: true,
                }, is_system_space: {
                    name: "is_system_space",
                    type: "Boolean",
                    attributes: [{ "name": "@default", "args": [{ "value": false }] }],
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'space',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "owner_id" },
                }, todos: {
                    name: "todos",
                    type: "Todo",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'space',
                }, spaceSharing: {
                    name: "spaceSharing",
                    type: "SpaceSharing",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'space',
                },
            },
            uniqueConstraints: {
                owner_id_name: {
                    name: "owner_id_name",
                    fields: ["owner_id", "name"]
                }, id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@id", "args": [] }, { "name": "@@map", "args": [{ "name": "name", "value": "spaces" }] }],
        },
        spaceSharing: {
            name: 'SpaceSharing', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, space_id: {
                    name: "space_id",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'space',
                }, space: {
                    name: "space",
                    type: "Space",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'spaceSharing',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "space_id" },
                }, user_id: {
                    name: "user_id",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'spaceSharing',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "user_id" },
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, user_id_space_id: {
                    name: "user_id_space_id",
                    fields: ["user_id", "space_id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "user_space" }] }, { "name": "@@unique", "args": [] }],
        },
        account: {
            name: 'Account', fields: {
                user_id: {
                    name: "user_id",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, type: {
                    name: "type",
                    type: "String",
                }, provider: {
                    name: "provider",
                    type: "String",
                    isId: true,
                }, provider_account_id: {
                    name: "provider_account_id",
                    type: "String",
                    isId: true,
                }, refresh_token: {
                    name: "refresh_token",
                    type: "String",
                    isOptional: true,
                }, refresh_token_expires_in: {
                    name: "refresh_token_expires_in",
                    type: "Int",
                }, access_token: {
                    name: "access_token",
                    type: "String",
                    isOptional: true,
                }, expires_at: {
                    name: "expires_at",
                    type: "Int",
                    isOptional: true,
                }, token_type: {
                    name: "token_type",
                    type: "String",
                    isOptional: true,
                }, scope: {
                    name: "scope",
                    type: "String",
                    isOptional: true,
                }, id_token: {
                    name: "id_token",
                    type: "String",
                    isOptional: true,
                }, session_state: {
                    name: "session_state",
                    type: "String",
                    isOptional: true,
                }, created_at: {
                    name: "created_at",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updated_at: {
                    name: "updated_at",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'accounts',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "user_id" },
                },
            },
            uniqueConstraints: {
                provider_provider_account_id: {
                    name: "provider_provider_account_id",
                    fields: ["provider", "provider_account_id"]
                },
            },
            attributes: [{ "name": "@@id", "args": [] }, { "name": "@@map", "args": [{ "name": "name", "value": "accounts" }] }],
        },
        session: {
            name: 'Session', fields: {
                sessionToken: {
                    name: "sessionToken",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@unique", "args": [] }],
                }, user_id: {
                    name: "user_id",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'sessions',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "user_id" },
                }, created_at: {
                    name: "created_at",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updated_at: {
                    name: "updated_at",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            },
            uniqueConstraints: {
                sessionToken: {
                    name: "sessionToken",
                    fields: ["sessionToken"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "sessions" }] }],
        },
        verificationToken: {
            name: 'VerificationToken', fields: {
                identifier: {
                    name: "identifier",
                    type: "String",
                    isId: true,
                }, token: {
                    name: "token",
                    type: "String",
                    isId: true,
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                },
            },
            uniqueConstraints: {
                identifier_token: {
                    name: "identifier_token",
                    fields: ["identifier", "token"]
                },
            },
            attributes: [{ "name": "@@id", "args": [] }, { "name": "@@map", "args": [{ "name": "name", "value": "verification_tokens" }] }],
        },
        authenticator: {
            name: 'Authenticator', fields: {
                credentialID: {
                    name: "credentialID",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@unique", "args": [] }],
                }, user_id: {
                    name: "user_id",
                    type: "String",
                    isId: true,
                    isForeignKey: true,
                    relationField: 'user',
                }, provider_account_id: {
                    name: "provider_account_id",
                    type: "String",
                }, credentialPublicKey: {
                    name: "credentialPublicKey",
                    type: "String",
                }, counter: {
                    name: "counter",
                    type: "Int",
                }, credentialDeviceType: {
                    name: "credentialDeviceType",
                    type: "String",
                }, credentialBackedUp: {
                    name: "credentialBackedUp",
                    type: "Boolean",
                }, transports: {
                    name: "transports",
                    type: "String",
                    isOptional: true,
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'Authenticator',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "user_id" },
                },
            },
            uniqueConstraints: {
                user_id_credentialID: {
                    name: "user_id_credentialID",
                    fields: ["user_id", "credentialID"]
                }, credentialID: {
                    name: "credentialID",
                    fields: ["credentialID"]
                },
            },
            attributes: [{ "name": "@@id", "args": [] }, { "name": "@@map", "args": [{ "name": "name", "value": "authenticators" }] }],
        },
        country: {
            name: 'Country', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, name: {
                    name: "name",
                    type: "String",
                }, hdi: {
                    name: "hdi",
                    type: "Float",
                }, User: {
                    name: "User",
                    type: "User",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'country',
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "countries" }] }],
        },
        carbonFootprint: {
            name: 'CarbonFootprint', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, user_id: {
                    name: "user_id",
                    type: "String",
                }, vehicles: {
                    name: "vehicles",
                    type: "EmissionVehicles",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'footprint',
                }, User: {
                    name: "User",
                    type: "User",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'carbonFootprint',
                }, demographics: {
                    name: "demographics",
                    type: "Demographics",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'footprint',
                }, unit: {
                    name: "unit",
                    type: "String",
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "carbon_fps" }] }],
        },
        demographics: {
            name: 'Demographics', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, footprint_id: {
                    name: "footprint_id",
                    type: "Int",
                    attributes: [{ "name": "@unique", "args": [] }],
                    isForeignKey: true,
                    relationField: 'footprint',
                }, country: {
                    name: "country",
                    type: "String",
                }, houseSize: {
                    name: "houseSize",
                    type: "Int",
                }, householdIncome: {
                    name: "householdIncome",
                    type: "Int",
                }, footprint: {
                    name: "footprint",
                    type: "CarbonFootprint",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'demographics',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "footprint_id" },
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, footprint_id: {
                    name: "footprint_id",
                    fields: ["footprint_id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "demographics" }] }],
        },
        emissionVehicles: {
            name: 'EmissionVehicles', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, name: {
                    name: "name",
                    type: "String",
                    isOptional: true,
                }, mileage: {
                    name: "mileage",
                    type: "Float",
                }, milesPerYear: {
                    name: "milesPerYear",
                    type: "Float",
                }, footprint_id: {
                    name: "footprint_id",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'footprint',
                }, fuelType: {
                    name: "fuelType",
                    type: "String",
                }, footprint: {
                    name: "footprint",
                    type: "CarbonFootprint",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'vehicles',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "footprint_id" },
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "emissions_vehicles" }] }],
        },
        todo: {
            name: 'Todo', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, title: {
                    name: "title",
                    type: "String",
                }, description: {
                    name: "description",
                    type: "String",
                }, statusMetaId: {
                    name: "statusMetaId",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'statusMeta',
                }, statusMeta: {
                    name: "statusMeta",
                    type: "StatusMeta",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'Todo',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "statusMetaId" },
                }, space_id: {
                    name: "space_id",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'space',
                }, space: {
                    name: "space",
                    type: "Space",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'todos',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "space_id" },
                }, created_at: {
                    name: "created_at",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updated_at: {
                    name: "updated_at",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, StatusTransitions: {
                    name: "StatusTransitions",
                    type: "StatusTransitions",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'todo',
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "todos" }] }],
        },
        comment: {
            name: 'Comment', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, user_id: {
                    name: "user_id",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'comments',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "user_id" },
                }, commentable: {
                    name: "commentable",
                    type: "Commentable",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'comment',
                }, comment: {
                    name: "comment",
                    type: "String",
                }, created_at: {
                    name: "created_at",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "comments" }] }],
        },
        statusMeta: {
            name: 'StatusMeta', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, statuses: {
                    name: "statuses",
                    type: "String",
                }, Todo: {
                    name: "Todo",
                    type: "Todo",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'statusMeta',
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "status_meta" }] }],
        },
        statusTransitions: {
            name: 'StatusTransitions', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, todo_id: {
                    name: "todo_id",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'todo',
                }, todo: {
                    name: "todo",
                    type: "Todo",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'StatusTransitions',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "todo_id" },
                }, created_at: {
                    name: "created_at",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updated_at: {
                    name: "updated_at",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, status: {
                    name: "status",
                    type: "String",
                }, comment: {
                    name: "comment",
                    type: "String",
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "status_transitions" }] }],
        },
        commentable: {
            name: 'Commentable', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@id", "args": [] }, { "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, commentee_type: {
                    name: "commentee_type",
                    type: "String",
                }, commentee_id: {
                    name: "commentee_id",
                    type: "Int",
                }, comment_id: {
                    name: "comment_id",
                    type: "Int",
                    attributes: [{ "name": "@unique", "args": [] }],
                    isForeignKey: true,
                    relationField: 'comment',
                }, comment: {
                    name: "comment",
                    type: "Comment",
                    isDataModel: true,
                    attributes: [{ "name": "@relation", "args": [] }],
                    backLink: 'commentable',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "comment_id" },
                },
            },
            uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, comment_id: {
                    name: "comment_id",
                    fields: ["comment_id"]
                },
            },
            attributes: [{ "name": "@@map", "args": [{ "name": "name", "value": "commentables" }] }],
        },
    },
    deleteCascade: {
        user: ['Space', 'SpaceSharing', 'Account', 'Session', 'Authenticator'],
        space: ['SpaceSharing', 'Todo'],
    },
    authModel: 'User'
};
exports.default = metadata;
