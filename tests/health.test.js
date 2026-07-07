import request from "supertest";
import app from "../src/app.js";

describe("Health endpoints", () => {
  it("GET / debe retornar 200 con mensaje de bienvenida", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("ShipNow API");
  });

  it("GET /health debe retornar 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
  });

  it("GET /ruta-inexistente debe retornar 404", async () => {
    const res = await request(app).get("/ruta-inexistente");
    expect(res.status).toBe(404);
    expect(res.body.status).toBe("error");
  });
});
