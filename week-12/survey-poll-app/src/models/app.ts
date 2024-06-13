import { PrismaClient } from '@prisma/client'
import exp from 'constants';

export const prisma = new PrismaClient();

export const Survey = prisma.survey;