
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateQuestionnaireDto, CreateTrameDto, } from './dto/create-formulaire.dto';
import { UpdateQuestionnaireDto, UpdateTrameDto } from './dto/update-formulaire.dto';


@Controller('formulaire')
export class FormulaireController {
  constructor(private readonly formulaireService: FormulaireService) {}

  @Post('/trame')
  createTrame(@Body() createTrameDto: CreateTrameDto) {
    return this.formulaireService.onCreateTrame(createTrameDto);
  }

  @Get('/trame')
  findAllTrame() {
    return this.formulaireService.onGetAllTrame();
  }

  @Get('/trame:id')
  findOneTrame(@Param('id') id: string) {
    return this.formulaireService.onGetOneTrame(id);
  }

  
  @Get('/trame/domaine:domaine')
  findCategorieTrame(@Param('domaine') domaine: string) {
    return this.formulaireService.onGetCategorieTrame(domaine);
  }

  @Patch('/trame:id')
  updateTrame(@Param('id') id: string, @Body() updateFormulaireDto: UpdateTrameDto) {
    return this.formulaireService.onUpdateTrame(id, updateFormulaireDto);
  }

  @Delete('/trame:id')
  removeTrame(@Param('id') id: any) {
    return this.formulaireService.onDeleteTrame(id);
  }


    /////////////////////   CONTROLLER DES QUESTIONNAIRES   ://///////////////////////////////


  @Post('/questionnaire')
  createQuestionnaire(@Body() createFormulaireDto: CreateQuestionnaireDto) {
    return this.formulaireService.onCreateQuestionnaire(createFormulaireDto);
  }

  @Get('/questionnaire')
  findAllQuestionnaire() {
    return this.formulaireService.onGetAllQuestionnaire();
  }

  @Get('/questionnaire:id')
  findOneQuestionnaire(@Param('id') id: string) {
    return this.formulaireService.onGetOneQuestionnaire(id);
  }



  @Patch('/questionnaire:id')
  updateQuestionnaire(@Param('id') id: string, @Body() updateFormulaireDto: UpdateQuestionnaireDto) {
    return this.formulaireService.onUpdateQuestionnaire(id, updateFormulaireDto);
  }

  @Delete('/questionnaire:id')
  removeQuestionnaire(@Param('id') id: any) {
    return this.formulaireService.onDeleteQuestionnaire(id);
  }

}


