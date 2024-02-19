import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExpenceService } from '../service/expence.service';
import { ExpenceDto } from '../dto/expence.dto';
import { AuthClaim, JWTAuthGuard } from 'src/auth/jwt.strategy';
import { UseAuth } from 'src/auth/auth.decorator';
import { AccessTokenClaim } from 'src/auth/dto/jwt-auth-claim.dto';

@ApiTags('Expence')
@Controller('CreateExpence')
export class ExpenceController {
  constructor(private readonly expenceService: ExpenceService) {}
  // create expence
  @ApiOperation({ summary: 'Create Expence' })
  @Post('/create')
  @UseAuth(new JWTAuthGuard())
  createExpence(@AuthClaim() claim: AccessTokenClaim, @Body() dto: ExpenceDto) {
    return this.expenceService.createExpence(claim, dto);
  }
  // see in list
  @ApiOperation({ summary: 'See All Expence List' })
  @Post('/seeAllExpenceList')
  @UseAuth(new JWTAuthGuard())
  seeAllExpenceList(
    @AuthClaim() claim: AccessTokenClaim,
    @Body() dto: ExpenceDto,
  ) {
    return this.expenceService.seeAllExpenceList(claim, dto);
  }
  // update expence by user
  @ApiOperation({ summary: 'Update Expence' })
  @Put('/updateExpence')
  @UseAuth(new JWTAuthGuard())
  updateExpence(@AuthClaim() claim: AccessTokenClaim, @Body() dto: ExpenceDto) {
    return this.expenceService.updateExpence(claim, dto);
  }
  //approve expence by admin
  @ApiOperation({ summary: 'Approve Expence' })
  @Put('/approveExpence')
  @UseAuth(new JWTAuthGuard())
  approveExpence(
    @AuthClaim() claim: AccessTokenClaim,
    @Body() dto: ExpenceDto,
  ) {
    return this.expenceService.approveExpence(claim, dto);
  }
  //reject expence by admin
  @ApiOperation({ summary: 'Reject Expence' })
  @Put('/rejectExpence')
  @UseAuth(new JWTAuthGuard())
  rejectExpence(@AuthClaim() claim: AccessTokenClaim, @Body() dto: ExpenceDto) {
    return this.expenceService.rejectExpence(claim, dto);
  }
  // see all expence details by one user
  @ApiOperation({ summary: 'See Expence Details' })
  @Post('/seeExpenceDetails')
  @UseAuth(new JWTAuthGuard())
  seeAllExpenceByOneUser(
    @AuthClaim() claim: AccessTokenClaim,
    @Body() dto: ExpenceDto,
  ) {
    return this.expenceService.seeAllExpenceByOneUser(claim, dto);
  }
  //admin change status of expence approved to don
  @ApiOperation({ summary: 'Change Expence Status To Done' })
  @Put('/changeStatusToDone')
  @UseAuth(new JWTAuthGuard())
  doneExpence(@AuthClaim() claim: AccessTokenClaim, @Body() dto: ExpenceDto) {
    return this.expenceService.doneExpence(claim, dto);
  }
} 