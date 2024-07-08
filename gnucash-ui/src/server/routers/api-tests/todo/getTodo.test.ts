import prisma from "@/lib/prisma";
import { beforeAll, describe, expect, test } from "vitest";
import { apiCaller, setupUsers } from "../../../tests/utils/setup-utils";
import { JPUtils, schemasByAPI } from "@/server/tests/utils/jp-utils";
import { HTTP_ERRORS } from "@/server/tests/utils/setup-utils";

const BEFORE_ALL_TIMEOUT = 30000; // 30 sec

async function getTaskForColor(usersAndSpaces: any, color: string) {
  return (
    await prisma.todo.findFirst({
      where: {
        space: {
          id: usersAndSpaces.find((v: any) => v.color == color).userSpace.id,
        },
      },
    })
  )?.id;
}

describe("todo GETTERS", () => {
  let limit = 5;
  let usersAndSpaces: any;
  let redtodoId: any;
  let yellowtodoId: any;
  beforeAll(async () => {
    usersAndSpaces = await setupUsers();
    redtodoId = await getTaskForColor(usersAndSpaces, "red");
    yellowtodoId = await getTaskForColor(usersAndSpaces, "yellow");
  }, BEFORE_ALL_TIMEOUT);

  describe("getDetailedView", () => {
    test("red able to get their todo", async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: "todo.getDetailedView",
        userColor: "red",
        getParams: {
          todoId: redtodoId,
        },
      });
      const parsedObject = JPUtils.parseReturnValue(
        responseJson,
        schemasByAPI["todo.getDetailedView"]
      );
      expect(parsedObject.success).toBeTruthy();

      expect(response.status).toBe(200);
    });
    test("yellow able to get red's shared todo", async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: "todo.getDetailedView",
        userColor: "yellow",
        getParams: {
          todoId: redtodoId,
        },
      });

        // console.log(JSON.stringify(responseJson, null, 2));

      expect(JPUtils.returnValue(responseJson).todo.id).toEqual(redtodoId);
    });
    test("red is not able to get yellow's personal todo", async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: "todo.getDetailedView",
        userColor: "red",
        getParams: {
          todoId: yellowtodoId,
        },
      });


      expect(JPUtils.getErrorStatus(responseJson)).toEqual(
        HTTP_ERRORS.FORBIDDEN
      );
    });
  });
});

