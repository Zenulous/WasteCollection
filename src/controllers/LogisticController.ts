import { Controller, Get } from "@nestjs/common";
import { LogisticProvider } from "src/providers/LogisticProvider";

@Controller("logistics")
export class LogisticControler {
  constructor(private readonly logisticProvider: LogisticProvider) {
    this.logisticProvider = logisticProvider;
  }
  @Get()
  async findAll(): Promise<any[]> {
    return this.logisticProvider.findAll();
  }
}
