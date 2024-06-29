import { Applicant, ApplicantModel } from './model';
import pool from '../config/db';

export class dao {
    static async findApplicantById(id: number): Promise<Applicant | null> {
        const { rows } = await pool.query('SELECT * FROM applicants WHERE id = $1', [id]);
        if (rows.length === 0) return null;
        const { name, role, location, hobbies } = rows[0];
        return new ApplicantModel(id, name, role, location, hobbies);
    }
}
