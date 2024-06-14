import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';



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
    shelfId: faker.number.int(),
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
