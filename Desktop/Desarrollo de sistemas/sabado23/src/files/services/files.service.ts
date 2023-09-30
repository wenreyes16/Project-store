import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor() {}

  getStaticImageName(imagenName: string){
    const path = join(__dirname, '../../../static/products', imagenName);

    if (!existsSync(path)) {
      throw new BadRequestException(
        `No existe un producto con la imagen ${imagenName}`
      )
    }

    return path;
  }
}