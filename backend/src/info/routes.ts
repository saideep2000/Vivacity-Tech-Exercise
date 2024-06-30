import express from 'express';
import { dao } from './dao';

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
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/awesome/applicant/username/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const applicant = await dao.findApplicantByName(username);
        if (!applicant) {
            res.status(404).send('Applicant not found');
        } else {
            res.json(applicant);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/awesome/applicant/username/:username', async (req, res) => {
    const username = req.params.username;
    const { name, role, location, hobbies } = req.body;
    try {
        const updatedApplicant = await dao.updateApplicantByName(username, { name, role, location, hobbies });
        if (!updatedApplicant) {
            res.status(404).send('Applicant not found');
        } else {
            res.json(updatedApplicant);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
