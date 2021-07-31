import { Controller, Get, Param } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Logistic } from "src/models/Logistic";
import { LogisticProvider } from "src/providers/LogisticProvider";
class paramDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
@Controller("logistics")
export class LogisticsController {
  constructor(private readonly logisticProvider: LogisticProvider) {
    this.logisticProvider = logisticProvider;
  }
  @Get()
  async findAll(): Promise<Logistic[]> {
    return this.logisticProvider.findAll();
  }
  @Get("/:id")
  async findById(@Param() param: paramDto): Promise<Logistic> {
    return this.logisticProvider.findById(param.id);
  }
}
