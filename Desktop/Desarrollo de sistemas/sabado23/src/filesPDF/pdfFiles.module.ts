import { Module } from '@nestjs/common';
import { PdfFilesService } from './services/pdfFiles.services';
import { PdfFilesController } from './controllers/pdfFiles.controller';

@Module({
  controllers: [PdfFilesController],
  providers: [PdfFilesService],
})
export class PdfFilesModule {}