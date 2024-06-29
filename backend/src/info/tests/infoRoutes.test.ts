import request from 'supertest';
import { app } from '../../server';
import pool from '../../config/db';
import { dao } from '../../info/dao';

describe("Applicant Routes", () => {
    let insertedId: number;
    const testTag = 'test-run'; // Unique tag for test data

    beforeAll(async () => {
        // Insert a test applicant with a unique tag
        const result = await pool.query(`
            INSERT INTO applicants (name, role, location, hobbies, tag) VALUES
            ('Saideep Samineni', 'Software Developer', 'New York', '{"Coding", "Reading"}', $1)
            RETURNING id
        `, [testTag]);
        insertedId = result.rows[0].id;
        console.log('Inserted applicant ID:', insertedId);
    });

    afterAll(async () => {
        // Clean up the test data using the unique tag
        await dao.deleteApplicantsByTag(testTag);
        // Optionally close the pool to clean up database connections
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
