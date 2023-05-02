import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { PlanPecService } from './plan-pec.service';
import { CreatePlanPecDto, DiffusionPDFDto } from './dto/create-plan-pec.dto';
import { UpdatePlanPecDto } from './dto/update-plan-pec.dto';

@Controller('planpec')
export class PlanPecController {
  constructor(private readonly planPecService: PlanPecService) {}

  @Post()
  create(@Body() createPlanPecDto: CreatePlanPecDto) {
    return this.planPecService.create(createPlanPecDto);
  }

  @Get()
  findAll() {
    return this.planPecService.findAll();
  }

  @Post("byBrouillon")
  findAllBrouillon(@Body("brouillon") brouillon) {
    return this.planPecService.findAllBrouillon(brouillon);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planPecService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanPecDto: UpdatePlanPecDto) {
    return this.planPecService.update(id, updatePlanPecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { 
    return this.planPecService.remove(id);
  }


  
  @Post("envoyer_pdf")
  onEnvoyerPDF(@Body() diffusionDto: DiffusionPDFDto) {
    return this.planPecService.onDiffusionPDF(diffusionDto);
  }


  @Get('envoyer_pdf/:id')
  onPDFFindOne(@Param('id') id: string) {
    return this.planPecService.onReadPDFData(id);
  }


}
