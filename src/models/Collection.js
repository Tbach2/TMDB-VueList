/**
 * A modified array with add and remove methods
 * @param {Function|Class} typeOfItem Constructor function
 * @returns {*[]}
 * @constructor
 */
export default function Collection(typeOfItem) {
    let arr = [];

    arr.addItem = function (item) {

        // v2.1
        typeOfItem.call(item); // call the "typeOfItem" constructor using "item" as "this" in the constructor
        Collectable.call(item, this);
        this.push(item);

        // return "this" to utilize chaining
        return this;
    }

    arr.removeItem = function (item) {
        this.splice(this.indexOf(item), 1);

        return this;
    }

    return arr;
}

/**
 *
 * @param {Collection} collection
 * @constructor
 */
function Collectable(collection){
    this.remove = function () {
        collection.removeItem(this);
    };

    this.duplicate = function(){};
}