import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
export const storage = (file_path:string) => ({
    storage:diskStorage({
        destination: file_path,
        filename:(req,file,cb)=>{
            const filename: string = path.parse(file.originalname).name.replace(/\s/g,'')+uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            cb(null,`${filename}${extension}`)
        }
    })
})

