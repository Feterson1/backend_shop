import { ApiProperty } from "@nestjs/swagger";

export class MakePaymentResponse{

    @ApiProperty({example:"2c7dac75"})
    id:string

    @ApiProperty({example:"pending"})
    status: string
    @ApiProperty({example:{
        "value": "10000.00",
        "currency": "RUB"
    }})
    amount: {
        value: string,
        currency: string
    }

    @ApiProperty({example:{
        "account_id": "248067",
        "gateway_id": "2118562"
    }})
    recipient: {
        account_id: string,
        gateway_id: string
    }

    @ApiProperty({example:"2023-08-27T18:40:53.306Z"})
    created_at:string

    @ApiProperty({example:{
    "type": "redirect",
    "confirmation_url": "https://yoomoney.ru/checkout/payments/v2/contract?orderId=2c7dac75-000f-5000-a000-1acac6f0980b"
    }})
    confirmation: {
        type: string,
        confirmation_url: string
    }

    @ApiProperty({example:true})
    test: boolean

    @ApiProperty({example:false})
    paid:boolean

    @ApiProperty({example:false})
    refundable: boolean

    @ApiProperty({example:{}})
    metadata: {}

}