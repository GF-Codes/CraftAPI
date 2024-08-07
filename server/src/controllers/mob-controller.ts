import { Request, Response } from 'express';
import { MobInterface } from '../interfaces/mob-interface.js';
import { validateMobData } from '../services/mobs/mobValidations-service.js';
import {
    createMobService,
    deleteMobService,
    findAllMobsService,
    findMobByIdService,
    updateMobService,
} from '../services/mobs/mob-service.js';

export const findAllMobsController = async (req: Request, res: Response) => {
    try {
        const mobs = await findAllMobsService();

        res.status(200).json({
            Mobs: mobs,
        });
    } catch (error) {
        res.status(404).json({
            message: (error as Error).message,
        });
    }
};

export const findMobByIdController = async (req: Request, res: Response) => {
    try {
        const idMob = req.query.id as string | undefined;

        if (!idMob) {
            throw new Error('O "id" não foi fornecido na consulta.');
        }

        const mob = await findMobByIdService(idMob);

        res.status(200).json({
            Mob: mob,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O "id" fornecido não é válido para exibição do mob.',
            });
        } else {
            res.status(500).json({
                message: (error as Error).message,
            });
        }
    }
};

export const createMobController = async (req: Request, res: Response) => {
    try {
        const mobData = req.body as MobInterface;

        validateMobData(mobData);

        const createdMob = await createMobService(mobData);

        res.status(201).json({
            message: 'Mob criado com sucesso',
            Mob: createdMob,
        });
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message,
        });
    }
};

export const updateMobController = async (req: Request, res: Response) => {
    try {
        const idMob = req.params.id as string | undefined;
        const mobData = req.body as MobInterface;

        if (!idMob) {
            throw new Error('O parâmetro "id" não foi fornecido na consulta.');
        }

        validateMobData(mobData);

        const updatedMob = await updateMobService(idMob, mobData);

        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            Mob: updatedMob,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O "id" fornecido não é válido para atualização do mob.',
            });
        } else {
            res.status(500).json({
                message: (error as Error).message,
            });
        }
    }
};

export const deleteMobController = async (req: Request, res: Response) => {
    try {
        const idMob = req.params.id as string | undefined;

        if (!idMob) {
            throw new Error('O parâmetro "id" não foi fornecido na consulta.');
        }

        await deleteMobService(idMob);

        res.status(200).json({
            message: 'Exclusão feita com sucesso!',
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O "id" fornecido não é válido para exclusão do mob.',
            });
        } else {
            res.status(500).json({
                message: (error as Error).message,
            });
        }
    }
};
