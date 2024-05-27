import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards  } from '@nestjs/common';
import { CompteFinancierService } from './compte-financier.service';
import { CreateCompteFinancierDto } from './dto/create-compte-financier.dto';
import { UpdateCompteFinancierDto } from './dto/update-compte-financier.dto';
import { AuthGuard } from 'src/application PayMeQuick/shared/services/global_auth/global_auth_function';

@UseGuards(AuthGuard)
@Controller('compte-financier')
export class CompteFinancierController {
  constructor(private readonly compteFinancierService: CompteFinancierService) {}

  @Post()
  create(@Body() createCompteFinancierDto: CreateCompteFinancierDto) {
    return this.compteFinancierService.create(createCompteFinancierDto);
  }

  @Get()
  findAll() {
    return this.compteFinancierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compteFinancierService.findOne(id);
  }

  @Get('user/:phone')
  findOneByPHONE(@Param('phone') phone: string, @Headers() headers: Record<string, string>) {
    return this.compteFinancierService.findOneByPhone(phone);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompteFinancierDto: UpdateCompteFinancierDto) {
    return this.compteFinancierService.update(id, updateCompteFinancierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compteFinancierService.remove(id);
  }
}
