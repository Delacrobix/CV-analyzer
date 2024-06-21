//TODO: In the future, Implement the ocr from the image base64 and not to save the pdf file and later convert to images.

import { Injectable } from '@nestjs/common';
import { fromPath } from 'pdf2pic';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { uuid } from 'uuidv4';
import { mkdirSync, writeFile } from 'fs-extra';
import { readFile, readdir, unlink } from 'fs';

import { GetOpenAIAnswerOutputDTO } from '../model/DTOs.dto';
import { TsseeractService } from './tsseeract/tsseeract.service';

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

@Injectable()
export class AnalyzerService {
  private readonly chat: ChatOpenAI;

  constructor() {
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }

  async getAIResponse(prompt: string) {
    try {
      const result = await this.chat.invoke(prompt);
      const aiMessage = result.content.toString();

      return GetOpenAIAnswerOutputDTO.getInstance(aiMessage);
    } catch (error) {
      console.error('Error in AnalyzerService.getAIResponse: ', error);
      throw error;
    }
  }

  async OCRimage(image: string): Promise<string> {
    try {
      const worker = new TsseeractService();
      const ret = await worker.recognize(image);
      worker.terminate();
      return ret;
    } catch (error) {
      console.error('Error in AnalyzerService.OCRimage: ', error);
    }
  }

  buildDataUrl(fileType: string, base64: string) {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ];

    if (!validTypes.includes(fileType)) {
      throw new Error('File type is not valid!');
    }

    return `data:${fileType};base64,${base64}`;
  }

  // FIXME: This implementation could be fail if tow or more users try to convert pdf at the same time. For this case, I will use this will not used for a lot of users.
  async pdfBase64ToFile(
    base64Pdf: string,
    outDir: string,
    fileName: string,
  ): Promise<void> {
    const base64String = base64Pdf.includes(',')
      ? base64Pdf.split(',')[1]
      : base64Pdf;

    try {
      const pdfBuffer = Buffer.from(base64String, 'base64');
      const pdfName = `pdf-${fileName}.pdf`;

      await writeFile(`${outDir}/${pdfName}`, pdfBuffer);
      console.log('File has been saved as: ', pdfName);
    } catch (error) {
      console.error('Error on pdfBase64ToFile: ', error);
    }
  }

  async convertPdfToImages(base64Pdf: string): Promise<string[]> {
    const outDir = 'files';
    const fileName = uuid();

    mkdirSync(outDir, { recursive: true });
    await this.pdfBase64ToFile(base64Pdf, outDir, fileName);

    const options = {
      density: 96,
      quality: 100,
      saveFilename: `img-${fileName}`,
      savePath: outDir,
      preserveAspectRatio: true,
      format: 'png',
      height: 1200,
      width: 800,
    };
    console.log('PDF converted to image as: ', `img-${fileName}`);

    try {
      const convert = fromPath(`${outDir}/pdf-${fileName}.pdf`, options);
      const outputs = await convert.bulk(-1);

      const readFilesPromises = outputs.map((output) => {
        return new Promise<string>((resolve, reject) => {
          readFile(output.path, (err, data) => {
            if (err) {
              console.error('Error reading file: ', err);
              reject(err);
            } else {
              const base64 = data.toString('base64');
              const base64Image = `data:image/png;base64,${base64}`;
              resolve(base64Image);
            }
          });
        });
      });

      const base64Images = await Promise.all(readFilesPromises);
      console.log('Images have been converted to base64');

      return base64Images;
    } catch (error) {
      console.error('Error to convert images: ', error);
      throw error;
    }
  }

  async cleanFilesFolder() {
    const outDir = 'files';

    try {
      readdir(outDir, (err, files) => {
        if (err) {
          console.error('Error on cleanFilesFolder: ', err);
        } else {
          files.forEach((file) => {
            unlink(`${outDir}/${file}`, (err) => {
              if (err) {
                console.error('Error on cleanFilesFolder: ', err);
              }
            });
          });
        }
      });
    } catch (error) {
      console.error('Error on cleanFilesFolder: ', error);
    }
  }
}
