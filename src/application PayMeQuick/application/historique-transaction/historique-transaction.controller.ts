import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriqueTransactionService } from './historique-transaction.service';
import { CreateHistoriqueTransactionDto } from './dto/create-historique-transaction.dto';
import { UpdateHistoriqueTransactionDto } from './dto/update-historique-transaction.dto';

@Controller('historique-transaction')
export class HistoriqueTransactionController {
  constructor(private readonly historiqueTransactionService: HistoriqueTransactionService) {}

  @Post()
  create(@Body() createHistoriqueTransactionDto: CreateHistoriqueTransactionDto) {
    return this.historiqueTransactionService.create(createHistoriqueTransactionDto);
  }

  @Get()
  findAll() {
    return this.historiqueTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiqueTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriqueTransactionDto: UpdateHistoriqueTransactionDto) {
    return this.historiqueTransactionService.update(+id, updateHistoriqueTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiqueTransactionService.remove(+id);
  }
}
