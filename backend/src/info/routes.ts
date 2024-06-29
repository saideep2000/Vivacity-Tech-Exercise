import express from 'express';
import { dao } from './dao'; // Adjust the path as necessary

export const router = express.Router();

router.get('/awesome/applicant/hi', async (req, res) => {
    res.send("hi");
});

router.get('/awesome/applicant/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const applicant = await dao.findApplicantById(id);
        if (!applicant) {
            res.status(404).send('Applicant not found');
        } else {
            res.json(applicant);
        }
    } catch (error) {
        console.error('Error querying applicant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/awesome/applicant/username/:username', async (req, res) => {
    const username = decodeURIComponent(req.params.username);
    try {
        const applicant = await dao.findApplicantByName(username);
        if (!applicant) {
            res.status(404).send('Applicant not found');
        } else {
            res.json(applicant);
        }
    } catch (error) {
        console.error('Error querying applicant by name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
