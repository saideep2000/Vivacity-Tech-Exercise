import { Applicant, ApplicantModel } from './model';
import pool from '../config/db';

export class dao {
    static async findApplicantById(id: number): Promise<Applicant | null> {
        const { rows } = await pool.query('SELECT * FROM applicants WHERE id = $1', [id]);
        if (rows.length === 0) return null;
        const { name, role, location, hobbies } = rows[0];
        return new ApplicantModel(id, name, role, location, hobbies);
    }

    static async findApplicantByName(name: string): Promise<ApplicantModel | null> {
        const { rows } = await pool.query('SELECT * FROM applicants WHERE name = $1', [name]);
        if (rows.length === 0) return null;
        const { id, role, location, hobbies } = rows[0];
        return new ApplicantModel(id, name, role, location, hobbies);
    }

    static async updateApplicantByName(name: string, applicant: Partial<Applicant>): Promise<Applicant | null> {
        const { rows } = await pool.query(
            `UPDATE applicants SET name = $1, role = $2, location = $3, hobbies = $4 WHERE name = $5 RETURNING *`,
            [applicant.name, applicant.role, applicant.location, applicant.hobbies, name]
        );
        if (rows.length === 0) return null;
        const { id, role, location, hobbies } = rows[0];
        return new ApplicantModel(id, applicant.name!, role, location, hobbies);
    }
}
