import { promises as fs } from 'fs';

export async function GET(req: Request) {
    try {
        const directory = "/Users/andybao/prosights_backend/files"
        const files = await fs.readdir(directory);

        const fileNames: string[] = files.map((file) => {
            return file;
        }
        );

        return new Response(JSON.stringify(fileNames), {
            headers: {
                'content-type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}