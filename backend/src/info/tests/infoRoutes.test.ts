import request from 'supertest';
import { app } from '../../server';
import pool from '../../config/db';

describe("Applicant Routes", () => {
    let insertedId: number;

    beforeAll(async () => {
        await pool.query('DELETE FROM applicants WHERE name = $1', ['Saideep Samineni']);

        const result = await pool.query(`
            INSERT INTO applicants (name, role, location, hobbies) VALUES
            ('Saideep Samineni', 'Software Developer', 'New York', '{"Coding", "Reading"}')
            RETURNING id
        `);
        insertedId = result.rows[0].id;
        console.log('Inserted applicant ID:', insertedId);
    });

    afterAll(async () => {
        await pool.query('DELETE FROM applicants WHERE name = $1', ['Saideep Samineni']);
        await pool.end();
    });

    it("should respond with hi", async () => {
        const response = await request(app).get('/awesome/applicant/hi');
        console.log('Response status:', response.status);
        console.log('Response body:', response.text);
        expect(response.text).toBe("hi");
    });

    it("should respond with the applicant data", async () => {
        const response = await request(app).get(`/awesome/applicant/${insertedId}`);
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Saideep Samineni');
        expect(response.body.role).toBe('Software Developer');
        expect(response.body.location).toBe('New York');
        expect(response.body.hobbies).toEqual(['Coding', 'Reading']);
    });
});
