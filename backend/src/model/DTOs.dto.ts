import { IsNotEmpty, IsString } from 'class-validator';

export class GetInputFileDataDTO {
  @IsString()
  @IsNotEmpty()
  base64: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class GetOpenAIAnswerOutputDTO {
  @IsString()
  @IsNotEmpty()
  aiResponse: string;

  static getInstance(aiResponse: string) {
    const dto = new GetOpenAIAnswerOutputDTO();
    dto.aiResponse = aiResponse;
    return dto;
  }
}
