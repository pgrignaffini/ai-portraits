import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (
    req: NextApiRequest,
    saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/images");
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === 'POST' || req.method === 'DELETE') {
            // try {
            //     await fs.readdir(path.join(process.cwd() + "/public", "/images"));
            // } catch (error) {
            //     await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
            // }
            if (req.method === 'POST') await readFile(req, false);
        } else {
            res.setHeader('Allow', ['POST', 'DELETE']);
            res.status(405).end('Method Not Allowed');
            return;
        }
        res.json({ message: 'success' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default handler;