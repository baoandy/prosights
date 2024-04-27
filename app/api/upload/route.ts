import { promises as fs } from 'fs';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';


const saveFile = async (file: any) => {
    if (!file) { throw new Error('No file provided'); }
    const directory = "/Users/andybao/prosights_backend/files"
    const filePath = `${directory}/${file.name}`;
    try {
        // Ensure the upload directory exists (you might want to check this earlier or ensure it exists on startup)
        await fs.mkdir(directory, { recursive: true });

        // Save the file to the filesystem
        await pipeline(file.stream(), createWriteStream(filePath));

    } catch (error) {
        console.error('Failed to save the file:', error);
        throw new Error('Failed to save the file');
    }
};

export async function POST(req: Request) {
    const formData = await req.formData();
    const files = formData.getAll('files');
    if (!files || files.length === 0) {
        return new Response('No files uploaded', { status: 400 });
    }
    try {
        for (const file of files) {
            await saveFile(file);
        }
        return new Response('Files uploaded successfully', { status: 200 });
    } catch (error) {
        console.error('Failed to save the file:', error);
        return new Response('Failed to save the file', { status: 500 });
    }
}
