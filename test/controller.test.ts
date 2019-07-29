import request from "supertest";
import app from "../index";

describe("GET /ships", () => {
    test("should return 200 OK", () => {
        return request(app).get("/ships")
            .expect(200)
    });

    test("should return empty array", (done) => {
        return request(app).get("/ships")
            .then(res => {
                expect(res.body).toEqual([])
                done()
            })
    });
});

const shipMock = {
	"name": "Ship Name 121",
	"speed": "Fast"
}

describe("POST /ships", () => {
    let localApp;
    beforeEach(() => {
        localApp = request(app);
    });

    test("should return shipMock with id = 0", (done) => {
        return localApp.post("/ships")
            .send(shipMock)
            .expect(201)
            .then(res => {
                expect(res.body).toEqual({...shipMock, id: "0"})
                done();
            })
    });

    test("should return 201 OK", () => {
        return localApp.post("/ships")
            .send(shipMock)
            .expect(201)
    });

    test("should return 404 if Speed not provided", () => {
        return localApp.post("/ships")
            .send({name: 'Ship Name'})
            .expect(404)
    });

    test("should return 404 if Name not provided", () => {
        return localApp.post("/ships")
            .send({speed: 'fast'})
            .expect(404)
    });
});