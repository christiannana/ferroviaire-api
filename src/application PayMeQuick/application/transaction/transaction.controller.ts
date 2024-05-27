import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CallBackDTO, CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from 'src/application PayMeQuick/shared/services/global_auth/global_auth_function';


@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post("create")
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.onCreateTransaction(createTransactionDto);
  }

  @Get()
  findAll() {
    // return this.transactionService.findAll();
  }


 
  @Get("user/:id")
  onFindAllbyId(@Param('id') id: string) {
    return this.transactionService.onFindAllTransactionById(id);
  }

  /// ROUTE QUI PERMET DE GERER LE CALL BACK DE MAVIANCE
  @Post("callBack")
  onCallBackFonction(@Body() callBackDto: CallBackDTO) {
    return this.transactionService.onCallBackFunction(callBackDto);
  }


  /// ROUTE QUI PERMET DE LISTER LES PAIEMENT DIFFERE
  @Get("paiementDiffererList/:service_phone")
  onFindAllbyIdPaiementDiferer(@Param('service_phone') service_phone: string) {
    return this.transactionService.onFindAllPaiementDifererById(service_phone);
  }

   /// ROUTE QUI PERMET DE GERER LE PAIEMENT DIFFERE
   @Post("paiementDifferer")
   onPaeimentDiffere(
    @Body('id') id: string,
    @Body('source_compte_id') source_compte_id: string,
    @Body('codeSecret') codeSecret: string,
   ) {
     return this.transactionService.onPaiementDiffere(id, source_compte_id, codeSecret);
   }


  @Get('statusTransaction/:trid')
  onstatusTransaction(@Param('trid') trid: string) {
    return this.transactionService.onFindStatusTransaction(trid);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
 