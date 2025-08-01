import request from "supertest";
import server from "../../server";
import User from "../../models/Usuario.mo";

describe("/api/users", () => {
  // Limpia la tabla antes de empezar
  beforeAll(async () => {
    await User.destroy({ where: {}, truncate: true, force: true });
  });

  // Limpia la tabla después de cada test
  afterEach(async () => {
    await User.destroy({ where: {}, truncate: true, force: true });
  });

  describe("POST /api/users", () => {
    it("retorna 400 si el cuerpo está vacío", async () => {
      const res = await request(server).post("/api/users").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
      expect(Array.isArray(res.body.errors)).toBe(true);
    });

    it("retorna 400 si el email no es válido", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          username: "Juan",
          email: "correo_invalido",
          password: "123456",
        });
      expect(res.statusCode).toBe(400);
    });

    it("crea usuario válido", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          username: "Maria",
          email: "maria@example.com",
          password: "secure123",
          role: "admin",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.username).toBe("Maria");
      expect(res.body.data.email).toBe("maria@example.com");
    });

    it("retorna 500 si el email ya existe", async () => {
      // Primera inserción correcta
      await request(server).post("/api/users").send({
        username: "Maria",
        email: "maria@example.com",
        password: "clave123",
      });

      // Intento duplicado (ahora con password >=6)
      const res = await request(server).post("/api/users").send({
        username: "Repetido",
        email: "maria@example.com",
        password: "clave123",
      });
      expect(res.statusCode).toBe(500);
    });
  });

  describe("GET /api/users", () => {
    it("retorna 200 y lista de usuarios (aunque esté vacía)", async () => {
      const res = await request(server).get("/api/users");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("GET /api/users/:id", () => {
    it("retorna 404 si el usuario no existe", async () => {
      const res = await request(server).get("/api/users/9999");
      expect(res.statusCode).toBe(404);
    });

    it("retorna usuario existente por ID", async () => {
      // Creamos un usuario válido
      const create = await request(server).post("/api/users").send({
        username: "Pedro",
        email: "pedro@example.com",
        password: "clave123",
      });

      // Lo recuperamos por ID
      const res = await request(server).get(
        `/api/users/${create.body.data.id}`
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.data.username).toBe("Pedro");
    });
  });

  describe("PUT /api/users/:id", () => {
    it("retorna 404 si el usuario no existe", async () => {
      const res = await request(server).put("/api/users/9999").send({
        username: "Nuevo",
      });
      expect(res.statusCode).toBe(404);
    });

    it("actualiza datos válidos", async () => {
      const create = await request(server).post("/api/users").send({
        username: "Ana",
        email: "ana@example.com",
        password: "clave123",
      });
      const res = await request(server)
        .put(`/api/users/${create.body.data.id}`)
        .send({ username: "Ana actualizada" });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.username).toBe("Ana actualizada");
    });
  });

  describe("PATCH /api/users/:id", () => {
    it("retorna 404 si el usuario no existe", async () => {
      const res = await request(server).patch("/api/users/9999");
      expect(res.statusCode).toBe(404);
    });

    it("alterna isActive correctamente", async () => {
      const create = await request(server).post("/api/users").send({
        username: "Toggle",
        email: "toggle@example.com",
        password: "clave123",
      });
      const res1 = await request(server).patch(
        `/api/users/${create.body.data.id}`
      );
      expect(res1.statusCode).toBe(200);

      const res2 = await request(server).patch(
        `/api/users/${create.body.data.id}`
      );
      expect(res2.statusCode).toBe(200);

      expect(res1.body.data.isActive).not.toBe(res2.body.data.isActive);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("retorna 404 si el usuario no existe", async () => {
      const res = await request(server).delete("/api/users/9999");
      expect(res.statusCode).toBe(404);
    });

    it("elimina correctamente", async () => {
      const create = await request(server).post("/api/users").send({
        username: "DeleteMe",
        email: "delete@example.com",
        password: "clave123",
      });
      const res = await request(server).delete(
        `/api/users/${create.body.data.id}`
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.data.username).toBe("DeleteMe");
    });
  });
});
