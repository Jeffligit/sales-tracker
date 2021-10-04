class SalesItem {
    constructor(date, name, purchasedDate, quantitySold, pricePerQuantity, salePrice, payout, costToShip, profit) {
        this.date = date;
        this.name= name;
        this.purchasedDate = purchasedDate;
        this.quantitySold = quantitySold
        this.pricePerQuantity = pricePerQuantity;
        this.salePrice = salePrice;
        this.payout = payout;
        this.costToShip = costToShip;
        this.profit = profit;
    }


    /*
        Description: compares the date of the current ExpenseItem to another one
        Input: ExpenseItem Object
        Return: 0 if dates are equal
                1 if item is more recent / younger
                -1 if item is older

    */

    compareDateTo(otherSalesItem) {
        var otherDate = otherSalesItem.date;

        // dates are equal
        if (this.date.localeCompare(otherDate) === 0) {
            return 0;
        } else {
            // check if either dates are "Unknown". Unknown dates are always older.
            if (otherDate.localeCompare("Unknown") === 0) {
                return 1;
            } else if (this.date.localeCompare("Unknown") === 0) {
                return -1;
            }

            otherDate = otherDate.split('/');
            var thisDate = this.date.split('/');

            if (thisDate[2].localeCompare(otherDate[2]) === 0) {
                // same year
                if (thisDate[0].localeCompare(otherDate[0]) === 0) {
                    // same month

                    if (parseInt(thisDate[1]) > parseInt(otherDate[1])) {
                        // return 1 if this item's day > than other item's day (younger)
                        return 1;
                    } else {
                        // return -1 if this item's day < than other item's day (older)
                        return -1;
                    }
                } else {
                    if (parseInt(thisDate[0]) > parseInt(otherDate[0])) {
                        // return 1 if this item's month > than other item's month (younger)
                        return 1;
                    } else {
                        // return -1 if this item's month < than other item's month (older)
                        return -1;
                    }
                }
            } else {
                if (parseInt(thisDate[2]) > parseInt(otherDate[2])) {
                    // return 1 if this item's year is > than other item's year (younger)
                    return 1;
                } else {
                    // return -1 if this item's year is < than other item's year (older)
                    return -1;
                }
            }
        }
    }
}

export default SalesItem;