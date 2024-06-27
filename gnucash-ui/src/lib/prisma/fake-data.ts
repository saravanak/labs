import { CommentableType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeShelf() {
  return {
    shortName: faker.lorem.words(5),
    comment: faker.lorem.words(5),
  };
}
export function fakeShelfComplete() {
  return {
    id: faker.number.int(),
    shortName: faker.lorem.words(5),
    rackId: faker.number.int(),
    comment: faker.lorem.words(5),
  };
}
export function fakeRack() {
  return {
    name: faker.person.fullName(),
    shortName: faker.lorem.words(5),
    type: faker.lorem.words(5),
    comment: faker.lorem.words(5),
  };
}
export function fakeRackComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    shortName: faker.lorem.words(5),
    type: faker.lorem.words(5),
    comment: faker.lorem.words(5),
  };
}
export function fakeLuggage() {
  return {
    name: faker.person.fullName(),
    comment: undefined,
    type: faker.lorem.words(5),
    length: undefined,
    width: undefined,
    height: undefined,
  };
}
export function fakeLuggageComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    comment: undefined,
    type: faker.lorem.words(5),
    length: undefined,
    width: undefined,
    height: undefined,
    shelfId: faker.number.int(),
  };
}
export function fakeUser() {
  return {
    name: undefined,
    email: faker.internet.email(),
    emailVerified: undefined,
    image: undefined,
    updatedAt: faker.date.anytime(),
    spaceid: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: undefined,
    email: faker.internet.email(),
    emailVerified: undefined,
    image: undefined,
    countryId: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    footprintId: undefined,
    spaceid: undefined,
  };
}
export function fakeSpaceComplete() {
  return {
    id: faker.number.int(),
    ownerId: faker.string.uuid(),
  };
}
export function fakeSpaceSharingComplete() {
  return {
    id: faker.number.int(),
    spaceId: faker.number.int(),
    userId: faker.string.uuid(),
  };
}
export function fakeAccount() {
  return {
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    refresh_token_expires_in: faker.number.int(),
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeAccountComplete() {
  return {
    userId: faker.string.uuid(),
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    refresh_token_expires_in: faker.number.int(),
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeSession() {
  return {
    sessionToken: faker.lorem.words(5),
    expires: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeSessionComplete() {
  return {
    sessionToken: faker.lorem.words(5),
    userId: faker.string.uuid(),
    expires: faker.date.anytime(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeVerificationToken() {
  return {
    identifier: faker.lorem.words(5),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeVerificationTokenComplete() {
  return {
    identifier: faker.lorem.words(5),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeAuthenticator() {
  return {
    credentialID: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    credentialPublicKey: faker.lorem.words(5),
    counter: faker.number.int(),
    credentialDeviceType: faker.lorem.words(5),
    credentialBackedUp: faker.datatype.boolean(),
    transports: undefined,
  };
}
export function fakeAuthenticatorComplete() {
  return {
    credentialID: faker.lorem.words(5),
    userId: faker.string.uuid(),
    providerAccountId: faker.lorem.words(5),
    credentialPublicKey: faker.lorem.words(5),
    counter: faker.number.int(),
    credentialDeviceType: faker.lorem.words(5),
    credentialBackedUp: faker.datatype.boolean(),
    transports: undefined,
  };
}
export function fakeCountry() {
  return {
    name: faker.person.fullName(),
    hdi: faker.number.float(),
  };
}
export function fakeCountryComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    hdi: faker.number.float(),
  };
}
export function fakeCarbonFootprint() {
  return {
    userId: faker.lorem.words(5),
    unit: faker.lorem.words(5),
  };
}
export function fakeCarbonFootprintComplete() {
  return {
    id: faker.number.int(),
    userId: faker.lorem.words(5),
    unit: faker.lorem.words(5),
  };
}
export function fakeDemographics() {
  return {
    country: faker.lorem.words(5),
    houseSize: faker.number.int(),
    householdIncome: faker.number.int(),
  };
}
export function fakeDemographicsComplete() {
  return {
    id: faker.number.int(),
    footprintId: faker.number.int(),
    country: faker.lorem.words(5),
    houseSize: faker.number.int(),
    householdIncome: faker.number.int(),
  };
}
export function fakeEmissionVehicles() {
  return {
    name: undefined,
    mileage: faker.number.float(),
    milesPerYear: faker.number.float(),
    fuelType: faker.lorem.words(5),
  };
}
export function fakeEmissionVehiclesComplete() {
  return {
    id: faker.number.int(),
    name: undefined,
    mileage: faker.number.float(),
    milesPerYear: faker.number.float(),
    footprintId: faker.number.int(),
    fuelType: faker.lorem.words(5),
  };
}
export function fakeTodo() {
  return {
    title: faker.lorem.words(5),
    descritpion: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTodoComplete() {
  return {
    id: faker.number.int(),
    title: faker.lorem.words(5),
    descritpion: faker.lorem.words(5),
    statusMetaId: faker.number.int(),
    spaceId: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeComment() {
  return {
    comment: faker.lorem.words(5),
  };
}
export function fakeCommentComplete() {
  return {
    id: faker.number.int(),
    comment: faker.lorem.words(5),
    commentableId: faker.number.int(),
    userId: faker.string.uuid(),
  };
}
export function fakeStatusMeta() {
  return {
    statuses: faker.lorem.words(5),
  };
}
export function fakeStatusMetaComplete() {
  return {
    id: faker.number.int(),
    statuses: faker.lorem.words(5),
  };
}
export function fakeStatusTransitions() {
  return {
    updatedAt: faker.date.anytime(),
    status: faker.lorem.words(5),
    comment: faker.lorem.words(5),
  };
}
export function fakeStatusTransitionsComplete() {
  return {
    id: faker.number.int(),
    taskId: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    status: faker.lorem.words(5),
    comment: faker.lorem.words(5),
  };
}
export function fakeCommentable() {
  return {
    commentableType: faker.lorem.words(5),
  };
}
export function fakeCommentableComplete() {
  return {
    id: faker.number.int(),
    commentableType: faker.lorem.words(5),
  };
}
