import request from 'supertest';
import { app } from '../../server';
import pool from '../../config/db';

describe("Applicant Routes", () => {
    let insertedId: number;

    beforeAll(async () => {
        // Ensure the test table is clean before inserting test data
        await pool.query('DELETE FROM applicants WHERE name = $1', ['Saideep Samineni']);
        
        // Insert a test applicant
        const result = await pool.query(`
            INSERT INTO applicants (name, role, location, hobbies) VALUES
            ('Saideep Samineni', 'Software Developer', 'New York', '{"Coding", "Reading"}')
            RETURNING id
        `);
        insertedId = result.rows[0].id;
        console.log('Inserted applicant ID:', insertedId);
    });

    afterAll(async () => {
        // Clean up the test data
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

    it("should respond with the applicant data by username", async () => {
        const response = await request(app).get(`/awesome/applicant/username/Saideep%20Samineni`);
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Saideep Samineni');
        expect(response.body.role).toBe('Software Developer');
        expect(response.body.location).toBe('New York');
        expect(response.body.hobbies).toEqual(['Coding', 'Reading']);
    });

    it("should update the applicant data by username", async () => {
        const updatedApplicant = {
            id: insertedId,
            name: 'Saideep Samineni',
            role: 'Senior Developer',
            location: 'San Francisco',
            hobbies: ['Coding', 'Reading', 'Hiking']
        };
        const response = await request(app).put(`/awesome/applicant/username/Saideep%20Samineni`).send(updatedApplicant);
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(200);
        expect(response.body.role).toBe('Senior Developer');
        expect(response.body.location).toBe('San Francisco');
        expect(response.body.hobbies).toEqual(['Coding', 'Reading', 'Hiking']);
    });
});
