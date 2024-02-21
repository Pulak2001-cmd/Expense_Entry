import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenceEntity } from '../entity/expence.entity';
import { ExpenceDto } from '../dto/expence.dto';
import { AccessTokenClaim } from 'src/auth/dto/jwt-auth-claim.dto';
import { SetMetadata } from '@nestjs/common';
// import { ApproverGuard } from 'src/guards/roles.guard';

export class ExpenceService {
  constructor(
    @InjectRepository(ExpenceEntity)
    private readonly expenceRepository: Repository<ExpenceEntity>,
  ) {}
  //create expence service

  async createExpence(claim: AccessTokenClaim, dto: ExpenceDto) {
    try {
      const createExpence = this.expenceRepository.create({
        ...dto,
        createdByUserId: claim.uid,
      });
      await this.expenceRepository.save(createExpence);

      return { message: 'Expence Created', httpStatus: HttpStatus.OK };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        `Can't create expence for : ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // see all the expence in list by approver
  // @UseGuards(ApproverGuard)
  async seeAllExpenceList(claim: AccessTokenClaim, dto: ExpenceDto) {
    try {
      const list = await this.expenceRepository.find({
        where: {
          isActive: true,
        },
      });
      if (list.length == 0) {
        throw new NotFoundException('No Expence details found');
      }
      return {
        message: 'Expence Details List',
        list,
        HttpStatus: HttpStatus.OK,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Can't fetch expence details for: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // update expence details
  async updateExpence(claim: AccessTokenClaim, dto: ExpenceDto) {
    try {
      const updateExpence = await this.expenceRepository.findOne({
        where: {
          id: dto.id,
          isActive: true,
        },
      });
      if (!updateExpence) {
        throw new NotFoundException('No Expence details found');
      }
      updateExpence.amount = dto.amount;
      updateExpence.reason = dto.reason;
      updateExpence.date = dto.date;
      updateExpence.updatedByUserId = claim.uid;
      await this.expenceRepository.save(updateExpence);
      return { message: 'Expence Updated', HttpStatus: HttpStatus.OK };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Can't update expence details for: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // delete expence details
  // async deleteExpence(claim: AccessTokenClaim, dto: ExpenceDto) {
  //     try {
  //     const deleteExpence = await this.expenceRepository.findOne({
  //         where: {
  //         id: dto.id,
  //         isActive: true,
  //         },
  //     });
  //     if (!deleteExpence) {
  //         throw new NotFoundException('No Expence details found');
  //     }
  //     deleteExpence.isActive = false;
  //     deleteExpence.deletedByUserId = claim.uid;
  //     await this.expenceRepository.save(deleteExpence);
  //     return { message: 'Expence Deleted', HttpStatus: HttpStatus.OK };
  //     } catch (err) {
  //     console.log(err);
  //     throw new HttpException(
  //         `Can't delete expence details for: ${err.message}`,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //     }
  // }

  //approve expence details by usertype approver
  async approveExpence(claim: AccessTokenClaim, dto: ExpenceDto) {
    try {
      const approveExpence = await this.expenceRepository.findOne({
        where: {
          id: dto.id,
          isActive: true,
        },
      });
      if (!approveExpence) {
        throw new NotFoundException('No Expence details found');
      }
      approveExpence.updatedByUserId = claim.uid;
      approveExpence.status = 'approved';
      await this.expenceRepository.save(approveExpence);
      return { message: 'Expence Approved', HttpStatus: HttpStatus.OK };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Can't approve expence details for: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //reject expence details by usertype approver
  async rejectExpence(claim: AccessTokenClaim, dto: ExpenceDto) {
    try {
      const rejectExpence = await this.expenceRepository.findOne({
        where: {
          id: dto.id,
          isActive: true,
        },
      });
      if (!rejectExpence) {
        throw new NotFoundException('No Expence details found');
      }
      rejectExpence.updatedByUserId = claim.uid;
      rejectExpence.status = 'rejected';
      await this.expenceRepository.save(rejectExpence);
      return { message: 'Expence Rejected', HttpStatus: HttpStatus.OK };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Can't reject expence details for: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //see all the expence details by one user
  async seeAllExpenceByOneUser(claim: AccessTokenClaim, dto: ExpenceDto) {
    try {
      const list = await this.expenceRepository.find({
        where: {
          isActive: true,
          createdByUserId: claim.uid,
        },
      });
      if (list.length == 0) {
        throw new NotFoundException('No Expence details found');
      }
      return {
        message: `Expence Details List of user  : ${claim.uid}`,
        list,
        HttpStatus: HttpStatus.OK,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Can't fetch expence details for: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // see status of expence details by usertype user
  //   async seeStatusExpence(claim: AccessTokenClaim, dto: ExpenceDto) {
  //     try {
  //       const list = await this.expenceRepository.find({
  //         where: {
  //           isActive: true,
  //           createdByUserId: claim.uid,
  //         },
  //       });
  //       if (list.length == 0) {
  //         throw new NotFoundException('No Expence details found');
  //       }
  //       return {
  //         message: `Expence Details List of user  : ${claim.uid}`,
  //         list,
  //         HttpStatus: HttpStatus.OK,
  //       };
  //     } catch (err) {
  //       console.log(err);
  //       throw new HttpException(
  //         `Can't fetch expence details for: ${err.message}`,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  // usertype approver change statuts approved to done
  async doneExpence(claim: AccessTokenClaim, dto: ExpenceDto) {
    try {
      const doneExpence = await this.expenceRepository.findOne({
        where: {
          id: dto.id,
          isActive: true,
        },
      });
      if (!doneExpence) {
        throw new NotFoundException('No Expence details found');
      }
      doneExpence.updatedByUserId = claim.uid;
      doneExpence.status = 'done';
      await this.expenceRepository.save(doneExpence);
      return { message: 'Expence Done', HttpStatus: HttpStatus.OK };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Can't chnage statuts of expence details to done for: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
