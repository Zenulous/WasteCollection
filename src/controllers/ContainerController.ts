import { Controller, Get } from "@nestjs/common";
import { ContainerProvider } from "src/providers/ContainerProvider";

@Controller("containers")
export class ContainerControler {
  constructor(private readonly containerProvider: ContainerProvider) {
    this.containerProvider = containerProvider;
  }
  @Get()
  async findAll(): Promise<any[]> {
    return this.containerProvider.findAll();
  }
}
