const request = require("supertest");
const mongoose = require("mongoose");
const http = require("http");
const app = require("./server");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(5000, done);
});

afterAll(async () => {
  await mongoose.connection.close(); // Close MongoDB connection
  server.close(); // Close server
});

describe("API Tests", () => {
  it("Should return movies list", async () => {
    const res = await request(server).get("/api/movies");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("Should return events list", async () => {
    const res = await request(server).get("/api/events");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
