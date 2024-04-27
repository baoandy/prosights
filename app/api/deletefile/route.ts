// pages/api/deletefile.ts
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const { fileName } = await req.json();
        const basePath = '/Users/andybao/prosights_backend/files';
        const filePath = path.join(basePath, fileName);

        // Prevent path traversal attacks
        if (!filePath.startsWith(basePath)) {
            return new Response('Forbidden', { status: 403 });
        }

        // Check if file exists before attempting to delete
        await fs.access(filePath);
        await fs.unlink(filePath); // Delete the file
        return new Response('File deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    }
}
