import { buildTeam, buildCollection } from "@server/test/factories";
import { getTestDatabase } from "@server/test/support";

const db = getTestDatabase();

afterAll(db.disconnect);

beforeEach(async () => {
  await db.flush();
  jest.resetAllMocks();
});

describe("collectionIds", () => {
  it("should return non-private collection ids", async () => {
    const team = await buildTeam();
    const collection = await buildCollection({
      teamId: team.id,
    });
    // build a collection in another team
    await buildCollection();
    // build a private collection
    await buildCollection({
      teamId: team.id,
      permission: null,
    });
    const response = await team.collectionIds();
    expect(response.length).toEqual(1);
    expect(response[0]).toEqual(collection.id);
  });
});
