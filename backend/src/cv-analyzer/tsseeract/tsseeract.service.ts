import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class TsseeractService {
  private worker: any;
  initialized: Promise<void>;

  constructor() {
    this.initialized = (async () => {
      this.worker = await createWorker('eng+spa');
    })();
  }

  async recognize(image: string) {
    try {
      await this.initialized;
      const ret = await this.worker.recognize(image);
      const data = ret.data.text;
      return data;
    } catch (error) {
      console.error('Error in worker.recognize: ', error);
    }
  }

  async terminate() {
    try {
      this.worker.terminate();
    } catch (error) {
      console.error('Error in worker.terminate: ', error);
    }
  }
}
