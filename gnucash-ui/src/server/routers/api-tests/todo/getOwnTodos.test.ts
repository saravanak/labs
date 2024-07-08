import { JPUtils, schemasByAPI } from "@/server/tests/utils/jp-utils";
import { clone } from "lodash";
import { beforeAll, describe, expect, test } from "vitest";
import {
  HTTP_ERRORS,
  TASK_STATUSES,
  apiCaller,
  setupUsers,
} from "../../../tests/setup-utils";

const BEFORE_ALL_TIMEOUT = 30000; // 30 sec

describe("todo apis", () => {
  let limit = 5;
  let usersAndSpaces: any;
  beforeAll(async () => {
    usersAndSpaces = await setupUsers();
  }, BEFORE_ALL_TIMEOUT);

  test("healthchecker does not need authentication", async () => {
    const { response } = await apiCaller({
      path: "healthchecker",
    });
    expect(response.status).toBe(200);
  });

  describe("getOwnTodos", () => {
    test("requires authenticated user", async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: "todo.getOwnTodos",
      });
      expect(JPUtils.getErrorStatus(responseJson)).toEqual(
        HTTP_ERRORS.UNAUTHORIZED
      );
    });

    test("red gets their todos", async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: "todo.getOwnTodos",
        userColor: "red",
        getParams: {
          limit,
          cursor: null,
          searchText: null,
          statuses: [],
        },
      });

      expect(JPUtils.itemLength(responseJson)).toEqual(5);

      const parsedObject = JPUtils.parseFirstItem(
        responseJson,
        schemasByAPI["todo.getOwnTodos"]
      );
      expect(parsedObject.success).toBeTruthy();
      expect(response.status).toBe(200);
    });
  });

  test.each([
    {
      user: "red",
    },
    {
      user: "blue",
    },
    {
      user: "green",
    },
  ])("yellow gets to see todos for $user", async ({ user }: any) => {
    const expected = `title-${user}`;
    const { response, responseJson, responseText } = await apiCaller({
      path: "todo.getOwnTodos",
      userColor: user,
      getParams: {
        limit,
        cursor: null,
        searchText: expected,
        statuses: [],
      },
    });
    expect(JPUtils.firstItem(responseJson).title).toMatch(
      new RegExp(`^${expected}`)
    );
  });

  test("yellow can see todos on red space", async () => {
    const expected = "title-red";
    const { response, responseJson, responseText } = await apiCaller({
      path: "todo.getOwnTodos",
      userColor: "yellow",
      getParams: {
        limit,
        cursor: null,
        spaceId: usersAndSpaces.find(({ color }: any) => color == "red")
          .userSpace.id,
        statuses: [],
      },
    });
    expect(JPUtils.firstItem(responseJson).title).toMatch(
      new RegExp(`^${expected}`)
    );
  });

  test("red cannot see todos on yellow space", async () => {
    const expected = "title-yellow";
    const { response, responseJson, responseText } = await apiCaller({
      path: "todo.getOwnTodos",
      userColor: "red",
      getParams: {
        limit,
        cursor: null,
        spaceId: usersAndSpaces.find(({ color }: any) => color == "yellow")
          .userSpace.id,
        statuses: [],
      },
    });
    expect(JPUtils.getErrorStatus(responseJson)).toEqual(
      HTTP_ERRORS.FORBIDDEN
    );
  });

  test("red does not see yellow", async ({ user }: any) => {
    const { response, responseJson, responseText } = await apiCaller({
      path: "todo.getOwnTodos",
      userColor: "red",
      getParams: {
        limit,
        cursor: null,
        searchText: `title-yellow`,
        statuses: [],
      },
    });
    expect(JPUtils.itemLength(responseJson)).toEqual(0);
  });

  test.each([
    { searchText: "title-red", expected: "title-red", path: "title" },
    {
      searchText: "desc-red",
      expected: "desc-red",
      path: "description",
    },
  ])("search by $path works", async ({ searchText, expected, path }) => {
    const { response, responseJson, responseText } = await apiCaller({
      path: "todo.getOwnTodos",
      userColor: "red",
      getParams: {
        limit,
        cursor: null,
        searchText: searchText,
        statuses: [],
      },
    });
    expect(JPUtils.firstItem(responseJson)[path]).toMatch(
      new RegExp(`^${expected}`)
    );
  });

  test.each([
    { status: clone(TASK_STATUSES).slice(-2), index: 1 },
    { status: clone(TASK_STATUSES).slice(-1), index: 2 },
    { status: clone(TASK_STATUSES), index: 3 },
  ])("search by status: Test#$index works", async ({ status }) => {
    const { response, responseJson, responseText } = await apiCaller({
      path: "todo.getOwnTodos",
      userColor: "red",
      getParams: {
        limit,
        cursor: null,
        searchText: null,
        statuses: status,
      },
    });
    status.forEach((s) => {
      expect(
        JPUtils.getPathInItems(responseJson, `[?(@.status=="${s}")]`).status,
        `Can't find todo with status ${s} on returned items`
      ).toEqual(s);
    });
  });
});

