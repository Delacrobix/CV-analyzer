import { IsNotEmpty, IsString } from 'class-validator';

export class GetInputBase64DataDTO {
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
  aiMessage: string;

  static getInstance(aiMessage: string) {
    const dto = new GetOpenAIAnswerOutputDTO();
    dto.aiMessage = aiMessage;
    return dto;
  }
}
