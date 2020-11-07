const Coins = require('../utils/coins');
const validator = require('validator');
const fs = require('fs');


const data = JSON.parse(
    fs.readFileSync('./public/dev-data/products.json')
);


// const checkBody = obj => {


//     for (const property in obj) {
//         const num = typeof (obj[property] * 1);
//         console.log(num);
//         // if (typeof obj[property] * 1 !== 'number') {
//         //     console.log('returning false')
//         //     return false;
//         // }
//     }

//     console.log('returning true')
//     return true;
// }


exports.buyProduct = (req, res, next) => {

    const id = req.params.id * 1;

    // checkBody(req.body)
    const product = data.find(el => el.id === id); // GETTING PRODUCT TO PURCHASE
    if (typeof (product) === 'undefined') return next(new Error(`Sorry product does not exist`)); //CHECKING IF PRODUCT EXISTS
    if (product.quantity < 1) return next(new Error(`Sorry we are out of stock`)); //HANDLE OF OUT OF STOCK


    const change = new Coins(req.body).getAmount() - product.price; //CALCULATING CHANGE

    if (change < 0) return next(new Error(`Sorry you have insufficient funds`));

    product.quantity -= 1;

    res.status(200).json({
        status: 'success',
        product,
        change
    })

}