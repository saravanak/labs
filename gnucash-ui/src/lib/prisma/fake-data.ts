import {  } from '@prisma/client';
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
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: undefined,
    email: faker.internet.email(),
    emailVerified: undefined,
    image: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
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
export function fakeCountries() {
  return {
    name: faker.person.fullName(),
    hdi: faker.number.float(),
  };
}
export function fakeCountriesComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    hdi: faker.number.float(),
  };
}
