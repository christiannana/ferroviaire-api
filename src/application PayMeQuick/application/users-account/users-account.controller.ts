import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { USER_AccountService } from './users-account.service';
import { CreateUserAccountDto } from './dto/create-users-account.dto';
import { UpdateUserAccountDto } from './dto/update-users-account.dto';
import { AuthGuard } from 'src/application PayMeQuick/shared/services/global_auth/global_auth_function';

@Controller('usersAccount')
export class USER_AccountController {
  constructor(private readonly userAccountService: USER_AccountService) {}

  @Post("create")
  create(@Body() createUserAccountDto: CreateUserAccountDto) {
    return this.userAccountService.create(createUserAccountDto);
  }

  @Post("login")
  onLogin(
     @Body('phone') phone: string,
     @Body('codeSecret') codeSecret: string,
     @Body('platformVersion') platformVersion: string,
     @Body('modelName') modelName: string,
     @Body('manufacturer') manufacturer: string,
    ) {
    return this.userAccountService.onLogin(phone, codeSecret, platformVersion, modelName, manufacturer);
  }

  @Post("OTPcode_verify")
  onOTPverifyCode(
    @Body('userId') userId: string,
    @Body('phone') phone: string,
    @Body('otpcode') otpcode: string,
  ) {
    return this.userAccountService.onOTP_code_verify(userId, phone, otpcode);
  }

  @Post("OTPcode_resend")
  onOTPresendCode(
     @Body('userId') userId: string,
     @Body('phone') phone: string,
  ) {
    return this.userAccountService.onOTP_renvoyer(userId, phone);
  }


  @UseGuards(AuthGuard)
  @Post("modification_codeSecret")
  onModifierCodeSecret(
    @Body('userId') userId: string,
    @Body('ancienCode') ancienCode: string,
    @Body('nouveauCode') nouveauCode: string,
  ) {
    return this.userAccountService.onCodeSecretUpdate(userId, ancienCode, nouveauCode);
  }

  

  @Get()
  findAll() {
    return this.userAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.userAccountService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserAccountDto: UpdateUserAccountDto) {
    return this.userAccountService.update(id, updateUserAccountDto);
  }

  @UseGuards(AuthGuard)
  @Post('deleteUser/:id')
  remove(
    @Body('userId') userId: string,
    @Body('codeSecret') codeSecret: string,
  ) {
    return this.userAccountService.remove(userId, codeSecret );
  }


  
}
