var cart = new Cart;

// var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
// var thong = new thong('Wicked Weasel', 32, 'red', 29.95);
// var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
// var slips = new Slips('Abanderado', 42, 'purple', 13.99);
// var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
// var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
// var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
// var desktop = new Desktop('HP', '1800', 20, 420);
// var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99);
// var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);
// var tshirt = new TShirt('Supreme', 'M', 'white', 399);
// var cap = new Cap('Obey', 'M', 'black', 29);
// var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35);
// var sweater = new Sweater('Diesel', 'M', 'black', 149);
var mustang = new Coupe('Ford', 'Mustang', 'red', 50000, 300, 'petrol', 1967);
var tesla = new Sedan('Tesla', 'Model X', 'white', 80000, 400, 'electric', 2018);
var chevy = new Coupe('Chevrolet', 'Camaro', 'orange', 40000, 320, 'petrol', 1962);

// cart.add(socks);
// cart.add(thong);
// cart.add(bra);
// cart.add(slips);
// cart.add(mobile);
// cart.add(mobile2);
// cart.add(laptop);
// cart.add(desktop);
// cart.add(hat);
// cart.add(jeans);
// cart.add(tshirt);
// cart.add(cap);
// cart.add(shorts);
// cart.add(sweater);
cart.add(mustang);
cart.add(tesla);
cart.add(chevy);

console.log('total', cart.totalPrice());
console.log('number of items', cart.numberOfItems());
console.log('most expensive', cart.mostExpensive());
console.log('cheapest', cart.cheapest());
// console.log('number of clothing items', cart.numberOf(Clothing));
// console.log('number of electronics items', cart.numberOf(Electronics));
console.log('number of sedan cars', cart.numberOf(Sedan));
console.log('number of coupe cars', cart.numberOf(Product));
// console.log('products in between prices', cart.productsByPriceRange(30, 120));
console.log('products in between prices', cart.productsByPriceRange(30000, 70000));
console.log('products in between prices', cart.productsByPriceRange(45000, 90000));





