import { Controller, Post, Get, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/helpers/fileNamer.helper';
import { PdfFilesService } from '../services/pdfFiles.services';
import { fileFilter } from 'src/helpers/filterPdf.helper';

@Controller('pdf')
export class PdfFilesController {
  constructor(private readonly filesService: PdfFilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter:fileFilter,

    storage: diskStorage({
      destination: './static/files/pdf/archivos/',
      filename:fileNamer
    })
  
  }))


  UploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file){
      throw new BadRequestException('Asegurese que el archivo es una pdf')
      console.log(file);
      
    }

    return{
      fileName: file.filename
    }


  }
}