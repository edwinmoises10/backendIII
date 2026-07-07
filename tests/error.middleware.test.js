import request from "supertest";
import app from "../src/app.js";

describe("Middleware global de errores", () => {
  it("respuesta de error debe incluir status, error y message", async () => {
    const res = await request(app).post("/api/mocks/users?count=0");
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("error");
    expect(res.body).toHaveProperty("message");
  });

  it("una ruta no encontrada debe retornar status error con mensaje descriptivo", async () => {
    const res = await request(app).get("/api/nonexistent");
    expect(res.status).toBe(404);
    expect(res.body.status).toBe("error");
    expect(typeof res.body.message).toBe("string");
  });
});
