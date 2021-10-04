import assert from 'assert';
import InventoryItem from '../classes/InventoryItem.js'

function makeNewInventoryItem() {
    const item = new InventoryItem("10/10/2021", "Some Item Name", 9.99, 3);
    assert.equal(item.date, "10/10/2021", "Initializing date errored");
    assert.equal(item.name, "Some Item Name", "Initializing name errored");
    assert.equal(item.price, 9.99, "Initializing price errored");
    assert.equal(item.quantity, 3, "Initializing quantity errored");
}

function testCompareDateTo() {
    const item1 = new InventoryItem("Unknown", "Some Item Name", 9.99, 3);
    const item2 = new InventoryItem("Unknown", "Some Item Name", 9.99, 3);

    /*
        results:
        0 - dates are equal
        1 - item1 is younger than item2
        -1 - item1 is older than item2
    */

    // equal unknown dates
    assert.equal(item1.compareDateTo(item2), 0, "CompareDateTo when dates are unknown and equal errored");

    // item1 date is unknown but item2 is not
    item1.date = "Unknown";
    item2.date = "10/10/2020";
    assert.equal(item1.compareDateTo(item2), -1, "CompareDateTo when item date is unknown and not equal errored");

    // item1 date is known but item2 is unknown
    item1.date = "10/10/2020";
    item2.date = "Unknown";
    assert.equal(item1.compareDateTo(item2), 1, "CompareDateTo when item date being compared to is unknown and not equal errored");

    // dates are equal and not unknown
    item1.date = "10/10/2020";
    item2.date = "10/10/2020";
    assert.equal(item1.compareDateTo(item2), 0, "CompareDateTo when dates are equal errored");

    // item1 date is more recent than item2 date by year
    item1.date = "10/10/2021";
    item2.date = "10/10/2020";
    assert.equal(item1.compareDateTo(item2), 1, "CompareDateTo when item date is more recent by year errored");

    // item1 date is older than item2 date by year
    item1.date = "10/10/2018"
    item2.date = "10/10/2020"
    assert.equal(item1.compareDateTo(item2), -1, "CompareDateTo when item date is older by year errored");

    // item1 date is more recent than item2 date by month
    item1.date = "12/10/2020";
    item2.date = "10/10/2020";
    assert.equal(item1.compareDateTo(item2), 1, "CompareDateTo when item date is more recent by month errored");

    // item1 date is older than item2 date by month
    item1.date = "5/10/2020";
    item2.date = "10/10/2020";
    assert.equal(item1.compareDateTo(item2), -1, "CompareDateTo when item date is older by month errored");

    // item1 date is older than item2 date by day
    item1.date = "10/29/2020";
    item2.date = "10/10/2020";
    assert.equal(item1.compareDateTo(item2), 1, "CompareDateTo when item date is more recent by day errored");
    
    // item1 date is more recent than item2 date by day
    item1.date = "10/05/2020";
    item2.date = "10/10/2020";
    assert.equal(item1.compareDateTo(item2), -1, "CompareDateTo when item date is older by day errored");

}

function addProduct(date, name, price, quantity, oldList) {
    const newItem = new InventoryItem(date, name, price, quantity);
    if (oldList.length === 0) {
        return new Array(newItem);
    }
    
    if (date.localeCompare("Unknown") === 0) {
        var newList = oldList.slice(0);
        newList.push(newItem);
        return newList;
    } else {
        var low = 0;
        var high = oldList.length - 1;
        // find index where date is older than index-1 and same or younger than date at index+1;
        while (low !== high) {
            let mid = Math.floor((high + low) / 2);
            const item = oldList[mid];
            // if new item is younger look at low -> mid - 1
            if (newItem.compareDateTo(item) === 1) {
                if (mid === 0) {
                    high = 0;
                } else {
                    high = mid - 1;
                }
            } else {
                // new item is older look at mid + 1 -> high
                if (mid === oldList.length - 1) {
                    low = oldList.length - 1;
                } else {
                    low = mid + 1;
                }
            }
            
        }
        const item = oldList[low];

        if (low === 0) {

            if (newItem.compareDateTo(item) === 1) {
                var newList = [newItem];
                return (newList.concat(oldList));
            } else {
                var newList = oldList.slice(0, low + 1);
                newList.push(newItem);
                return (newList.concat(oldList.slice(low + 1)));
            }

        } else if (low === oldList.length - 1) {

            if (newItem.compareDateTo(item) === 1) {
                var newList = oldList.slice(0, low);
                newList.push(newItem);
                return (newList.concat(oldList.slice(low)));
            } else {
                var newList = oldList.slice(0);
                newList.push(newItem)
                return (newList);
            }
        
        } else {

            if (newItem.compareDateTo(item) === 1) {
                // younger than oldlist[low] (between low-1 and low)
                // slice from 0 to low (exclusive) add newitem append slice from low to finish
                var newList = oldList.slice(0, low);
                newList.push(newItem);
                return (newList.concat(oldList.slice(low)))
            } else {
                // older than or equal to low (after low)
                // slice from 0 to low + 1(exclusive) add new item append slice from low + 1 to finish
                var newList = oldList.slice(0, low + 1);
                newList.push(newItem);
                return (newList.concat(oldList.slice(low + 1)))
            }

        }
    }
}

function removeItemFromList(itemNumber, oldList) {
    var newList = oldList.slice(0, itemNumber - 1);
    return (newList.concat(oldList.slice(itemNumber)));
}


function testAddProduct() {
    var list = [];
    list = addProduct("10/10/2021", "Some Item Name", 1, 3, list);
    assert.equal(list[list.length - 1].price, 1, "New item was not added to empty list");

    list = addProduct("5/10/2019", "Some Item Name", 2, 3, list)
    assert.equal(list[list.length - 1].price, 2, "New oldest item was not added to end of list");

    list = addProduct("10/10/2020", "Some Item Name", 1.5, 3, list)
    assert.equal(list[list.length - 2].price, 1.5, "New item was not added to between an item younger and older");

    list = addProduct("5/3/2019", "Some Item Name", 1.1, 3, list)
    assert.equal(list[list.length - 1].price, 1.1, "New oldest item was not added to the end of list on a longer list");
    
    list = addProduct("Unknown", "Some Item Name", 4, 3, list)
    assert.equal(list[list.length - 1].price, 4, "New item with unknown date was not added to the end");
    
    list = addProduct("3/20/2019", "Some Item Name", 5, 3, list)
    assert.equal(list[list.length - 2].price, 5, "New oldest item was not added to between current oldest item and unknown dated item");
    
    list = addProduct("10/22/2021", "Some Item Name", 6, 3, list);
    assert.equal(list[0].price, 6, "New youngest item was not added to existing list");

    list = removeItemFromList(1, list)
    assert.equal(list[0].price, 1, "First item from the list was not removed");

    list = removeItemFromList(6, list)
    assert.equal(list[list.length - 1].price, 5, "Last item from the list was not removed");

    list = removeItemFromList(2, list)
    assert.equal(list[1].price, 2, "Some item from the list was not removed");

}

function main() {
    makeNewInventoryItem();
    testCompareDateTo();
    testAddProduct();
}

main();