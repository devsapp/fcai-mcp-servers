import {z} from 'zod';

export const GeneratePresentationResponse = z.object({
    code: z.number().describe('Response code'),
    msg: z.string().describe('Response message'),
    data: z.object({
        recordId: z.string().describe('Record ID'),
        status: z.string().describe('Status'),
        totalPage: z.number().describe('Total slides count'),
        editorUrl: z.string().describe('Editor URL'),
        title: z.string().describe('Title'),
        thumbnail: z.string().describe('Thumbnail URL'),
        gallery: z.array(z.string()).optional().describe('Gallery URL list'),
    }).describe('Response data').nullable(),
});