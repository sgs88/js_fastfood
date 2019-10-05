"use strict";
/**
 * Класс, объекты которого описывают параметры гамбургера. 
 * 
 * @constructor 
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {

    this.hamburgerSize = {};
    this.hamburgerStuffing = {};
    this.hamburgerTopping = [];

    if (size === null || stuffing === null || typeof size === 'undefined' || typeof stuffing === 'undefined') {
        throw new HamburgerException('no size or stuffing given');
    }

    if (!Hamburger._SIZE_NAMES.includes(size.name)) {
        throw new HamburgerException('Invalid size');
    }

    if (!Hamburger._STUFFING_NAMES.includes(stuffing.name)) {
        throw new HamburgerException('Invalid stuffing');
    }

    this.hamburgerSize = size;
    this.hamburgerStuffing = stuffing;

   
}

/* Размеры, виды начинок и добавок */

Hamburger.SIZE_SMALL = {name: 'SIZE_SMALL', price: 100, kcal: 200};
Hamburger.SIZE_LARGE = {name: 'SIZE_LARGE', price: 150, kcal: 300};
Hamburger.STUFFING_CHEESE = {name: 'STUFFING_CHEESE', price: 20, kcal: 15};
Hamburger.STUFFING_SALAD = {name: 'STUFFING_SALAD', price: 30, kcal: 5};
Hamburger.STUFFING_POTATO = {name: 'STUFFING_POTATO', price: 40, kcal: 20};
Hamburger.TOPPING_MAYO = {name: 'TOPPING_MAYO', price: 35, kcal: 30};
Hamburger.TOPPING_SPICE = {name: 'TOPPING_SPICE', price: 15, kcal: 0};

Hamburger._SIZE_NAMES = ['SIZE_SMALL', 'SIZE_LARGE'];
Hamburger._STUFFING_NAMES = ['STUFFING_CHEESE', 'STUFFING_POTATO', 'STUFFING_SALAD'];
Hamburger._TOPPING_NAMES = ['TOPPING_MAYO', 'TOPPING_SPICE'];

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 * 
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {

    if (topping === null || typeof topping === 'undefined') {
        throw new HamburgerException('no size or stuffing given');
    }

    if (!Hamburger._TOPPING_NAMES.includes(topping.name)) {
        throw new HamburgerException('Invalid topping');
    }

    if (this.hamburgerTopping.length === 0) {
        this.hamburgerTopping.push(topping);
        return true;
    }

    if (this.hamburgerTopping.find(item => item.name === topping.name)) {
        throw new HamburgerException('topping already added');
    } else {
        this.hamburgerTopping.push(topping);
        return true;
    }

};

/**
 * Убрать добавку, при условии, что она ранее была 
 * добавлена.
 * 
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {

    if (topping === null || typeof topping === 'undefined') {
        throw new HamburgerException('no topping given');
    }

    if (!Hamburger._TOPPING_NAMES.includes(topping.name)) {
        throw new HamburgerException('Invalid topping');
    }

    if (this.hamburgerTopping.length !== 0) {
        for (let i = 0; i < this.hamburgerTopping.length; i++) {
            if (this.hamburgerTopping[i].name === topping.name) {
                this.hamburgerTopping.splice(i, 1);
            }
        }
    } else {
        throw new HamburgerException('hamburger no has topping');
    }

};

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {

    let arrayOfToppings = [];

    if (this.hamburgerTopping.length > 0) {
        for (let item of this.hamburgerTopping) {
            arrayOfToppings.push(item.name);
        }
        return arrayOfToppings;
    } else {
        return 0;
    }

};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {

    if ('name' in this.hamburgerSize) {
        return this.hamburgerSize;
    }

};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {

    if ('name' in this.hamburgerStuffing) {
        return this.hamburgerStuffing.name;
    }

};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {

    let price = 0;

    if ('price' in this.hamburgerStuffing) {
        price += this.hamburgerStuffing.price;
    }

    if ('price' in this.hamburgerSize) {
        price += this.hamburgerSize.price;
    }

    if (this.hamburgerTopping.length > 0) {
        for (let topping of this.hamburgerTopping) {
            price+=topping.price;
        }
    }
    
    return Math.trunc(price);

};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    let calories = 0;

    if ('kcal' in this.hamburgerStuffing) {
        calories+= this.hamburgerStuffing.kcal;
    }

    if ('kcal' in this.hamburgerSize) {
        calories+= this.hamburgerSize.kcal;
    }

    if (this.hamburgerTopping.length > 0) {
        for (let topping of this.hamburgerTopping) {
            calories+=topping.kcal;
        }
    }
    
    return calories;
};
/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor 
 */

class HamburgerException extends Error {

    constructor(message) {
        super(message);
        this.name = "HamburgerException";
    }

}


// маленький гамбургер с начинкой из сыра
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
console.log(hamburger.humburgerStuffing);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_SPICE);
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log(hamburger.getToppings());


 // спросим сколько там калорий
 console.log("Calories: %f", hamburger.calculateCalories());
 // сколько стоит
 console.log("Price: %f", hamburger.calculatePrice());
 // я тут передумал и решил добавить еще приправу
 hamburger.addTopping(Hamburger.TOPPING_SPICE);
 // А сколько теперь стоит? 
console.log("Price with sauce: %f", hamburger.calculatePrice());
 // Проверить, большой ли гамбургер? 
 console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
 // Убрать добавку
 hamburger.removeTopping(Hamburger.TOPPING_SPICE);
 console.log("Have %d toppings", hamburger.getToppings().length); // 1
 
