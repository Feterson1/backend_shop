import { MakePaymentDto } from './dto/make-payment.dto';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthenticatedGuard } from 'src/auth/autheticated.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { MakePaymentResponse } from './types';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({ type: MakePaymentResponse })
  @Post()
  makePayment(@Body() makePaymentDTO: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDTO);
  }
  @UseGuards(AuthenticatedGuard)
  @Post('/info')
  checkPayment(@Body() checkPaymentDTO: CheckPaymentDto) {
    return this.paymentService.checkPayment(checkPaymentDTO);
  }
}
