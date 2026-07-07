import request from "supertest";
import app from "../src/app.js";

describe("POST /api/mocks/users — validación de entrada", () => {
  it("count=0 debe retornar 400 con error VALIDATION_ERROR", async () => {
    const res = await request(app).post("/api/mocks/users?count=0");
    expect(res.status).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.error).toBe("VALIDATION_ERROR");
  });

  it("count=abc debe retornar 400 con error VALIDATION_ERROR", async () => {
    const res = await request(app).post("/api/mocks/users?count=abc");
    expect(res.status).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.error).toBe("VALIDATION_ERROR");
  });

  it("count=999 (>500) debe retornar 400 con error VALIDATION_ERROR", async () => {
    const res = await request(app).post("/api/mocks/users?count=999");
    expect(res.status).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.error).toBe("VALIDATION_ERROR");
  });
});

describe("POST /api/mocks/populate — validación de campos", () => {
  it("campo con valor 0 debe retornar 400 con error VALIDATION_ERROR", async () => {
    const res = await request(app)
      .post("/api/mocks/populate")
      .send({ users: 0 })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.error).toBe("VALIDATION_ERROR");
  });

  it("campo con valor mayor a 500 debe retornar 400", async () => {
    const res = await request(app)
      .post("/api/mocks/populate")
      .send({ users: 501 })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("VALIDATION_ERROR");
  });
});
