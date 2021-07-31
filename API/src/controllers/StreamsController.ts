import { Stream } from "src/models/Stream";
import { StreamProvider } from "src/providers/StreamProvider";
import { Controller, Get, Param } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
class paramDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

@Controller("streams")
export class StreamsControler {
  constructor(private readonly streamProvider: StreamProvider) {
    this.streamProvider = streamProvider;
  }
  @Get()
  async findAll(): Promise<Stream[]> {
    return this.streamProvider.findAll();
  }
  @Get("/:id")
  async findById(@Param() param: paramDto): Promise<Stream> {
    return this.streamProvider.findById(param.id);
  }
}
