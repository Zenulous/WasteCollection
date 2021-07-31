import { Controller, Get } from "@nestjs/common";
import { StreamProvider } from "src/providers/StreamProvider";

@Controller("streams")
export class StreamsControler {
  constructor(private readonly streamProvider: StreamProvider) {
    this.streamProvider = streamProvider;
  }
  @Get()
  async findAll(): Promise<any[]> {
    return this.streamProvider.findAll();
  }
}
