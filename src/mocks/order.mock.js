
import { faker, it } from '@faker-js/faker';
import { ORDER_STATUS } from '../constants/orderStatus.js';


export const generateMockOrder = (customerid) => {


    const item = {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: faker.number.float({ min: 1000, max: 10000 })
    }

    const total = item.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return{
        customer: customerid,
        items: item,
        total:total,
        status:ORDER_STATUS.PENDING
    }
}