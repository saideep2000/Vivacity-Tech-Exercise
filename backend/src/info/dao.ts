import pool from '../config/db';
import { ApplicantModel } from './model';

export class dao {
    static async findApplicantById(id: number): Promise<ApplicantModel | null> {
        const { rows } = await pool.query('SELECT * FROM applicants WHERE id = $1', [id]);
        if (rows.length === 0) return null;
        const { id: applicantId, name, role, location, hobbies, tag } = rows[0];
        return new ApplicantModel(applicantId, name, role, location, hobbies, tag);
    }

    static async findApplicantByName(name: string): Promise<ApplicantModel | null> {
        const { rows } = await pool.query('SELECT * FROM applicants WHERE name = $1', [name]);
        if (rows.length === 0) return null;
        const { id: applicantId, name: applicantName, role, location, hobbies, tag } = rows[0];
        return new ApplicantModel(applicantId, applicantName, role, location, hobbies, tag);
    }

    static async deleteApplicantsByTag(tag: string): Promise<void> {
        await pool.query('DELETE FROM applicants WHERE tag = $1', [tag]);
    }
}
