import { ApiProperty } from "@nestjs/swagger";


class ShoppingCartItem {

    @ApiProperty({example:1})
    partId: number

    @ApiProperty({example:3000})
    price: number

    @ApiProperty({example:1})
    in_stock: number

    @ApiProperty({example:1})
    count: number

    @ApiProperty({example:5455})
    totalPrice: number

    @ApiProperty({example:8})
    id: number

    @ApiProperty({example:1})
    userId: number

    @ApiProperty({example:"Saunier Duval"})
    boiler_manufacturer: string

    @ApiProperty({example:"Lesly"})
    parts_manufacturer: string

    @ApiProperty({example:"https://loremflickr.com/640/480/technics?random=792833600074369416809747365755"})
    image: string

    @ApiProperty({example:"Accusamus beatae."})
    name: string

    @ApiProperty({example:"2023-08-27T17:20:35.132Z"})
    createdAt: string

    @ApiProperty({example:"2023-08-27T17:20:35.132Z"})
    updatedAt: string
}

export class GetAllResponse extends ShoppingCartItem{}
export class AddToCartResponse extends ShoppingCartItem{}

export class UpdateCountResponse{
    @ApiProperty({example:1})
    count:number
}

export class UpdateCountRequest{
    @ApiProperty({example:1})
    count:number
}

export class TotalPriceResponse{
    @ApiProperty({example:3000})
    total_price:number
}
export class TotalPriceRequest{
    @ApiProperty({example:3000})
    total_price:number
}