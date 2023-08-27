import { MakePaymentDto } from './dto/make-payment.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthenticatedGuard } from 'src/auth/autheticated.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { MakePaymentResponse } from './types';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({type:MakePaymentResponse})
  @Post()
  makePayment(@Body() makePaymentDTO:MakePaymentDto){
    return this.paymentService.makePayment(makePaymentDTO);
  }

  
}
