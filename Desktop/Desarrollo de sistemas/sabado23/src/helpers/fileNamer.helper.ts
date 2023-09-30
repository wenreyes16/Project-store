import { v4 as id} from 'uuid'

export const fileNamer = (
    req: Express.Request,
    file: Express.Multer.File,
    callback
) => {
    if (!file) return callback ( new Error ('Archivo vacio'), false)

    const fileExtension= file.mimetype.split('/')[1];
    const fileNamer = `${id()}.${fileExtension}`
    

    callback(null,fileNamer)
}