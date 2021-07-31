import { Controller, Get, Param } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Container } from "src/models/Container";
import { ContainerProvider } from "src/providers/ContainerProvider";

class paramDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

@Controller("containers")
export class ContainersController {
  constructor(private readonly containerProvider: ContainerProvider) {
    this.containerProvider = containerProvider;
  }
  @Get()
  async findAll(): Promise<Container[]> {
    return this.containerProvider.findAll();
  }
  @Get("/:id")
  async findById(@Param() param: paramDto): Promise<Container> {
    return this.containerProvider.findById(param.id);
  }
}
