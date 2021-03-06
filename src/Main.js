import React, { useEffect, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Inventory from './components/Tabs/Inventory'
import Sales from './components/Tabs/Sales'
import Expense from './components/Tabs/Expense'
import TopBar from './components/General/TopBar'
import Dialog from './components/General/Dialog'
import InventorySalesExpenseInfo from './components/InfoSection/InventorySalesExpenseInfo'
import InventoryItem from './classes/InventoryItem.js'
import ExpenseItem from './classes/ExpenseItem.js'
import SalesItem from './classes/SalesItem.js'
import BottomBar from './components/General/BottomBar'
import './Main.css'

export default function Main() {

    const inventoryHeader = ['#', 'Purchase Date (MM/DD/YYYY)', 'Product Name', 'Quantity', 'Price Per Quantity', ''];
    const salesHeader = ['#', 'Sold Date (MM/DD/YYYY)', 'Product Name', 'Date Purchased', 'Quantity Sold', 'Price Per Quantity', 'Sold Price', 'Payout', 'Cost to Ship', 'Profit', ''];
    const expensesHeader = ['#', 'Purchase Date (MM/DD/YYYY)', 'Product Name', 'Quantity', 'Price Per Quantity', ''];
    const [tab, setTab] = useState('inventory')
    const [inventory, setInventory] = useState([])
    const [sales, setSales] = useState([])
    const [expenses, setExpenses] = useState([])
    // used to rerender when uploading a csv
    const [uploaded, setUploaded] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)

    //const [inventoryTotal, setInventoryTotal] = useState(0)

    const [inventoryTotal, setInventoryTotal] = useState(0)
    const [profitTotal, setProfitTotal] = useState(0)
    const [expenseTotal, setExpenseTotal] = useState(0)

    // Inventory useEffect (if inventory changes)
    useEffect(() => {

    }, [inventory])

    // Sales useEffect (if sales changes)
    useEffect(() => {
    }, [sales])

    // Expenses useEffect (if expenses changes)
    useEffect(() => {
    }, [expenses])

    useEffect(() => {
        let inventoryTotal = 0
        let expenseTotal = 0
        let profitTotal = 0
        for (let i = 0; i < inventory.length; i++) {
            inventoryTotal += parseFloat(inventory[i].price) * parseInt(inventory[i].quantity)
        }
        setInventoryTotal(roundToTwoDecimals(inventoryTotal))
        for (let i = 0; i < expenses.length; i++) {
            expenseTotal += parseFloat(expenses[i].price) * parseInt(expenses[i].quantity)
        }
        setExpenseTotal(roundToTwoDecimals(expenseTotal))
        for (let i = 0; i < sales.length; i++) {
            profitTotal += parseFloat(sales[i].profit)
        }
        setProfitTotal(roundToTwoDecimals(profitTotal - expenseTotal))
        
    }, [uploaded, inventory, sales, expenses])


    function roundToTwoDecimals(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    /*
        Description: Handle switching tabs
        
        Input: switchedTab (string) - eventKey of the tab
        Output: None
    */
    function tabSwitch(switchedTab) {
        setTab(switchedTab)
    }

    // GENERAL LIST OPERATION

    function addItemToOldList(newItem, oldList) {
        if (oldList.length === 0) {
            return new Array(newItem);
        }

        if (newItem.date.localeCompare("Unknown") === 0) {
            let newList = oldList.slice(0);
            newList.push(newItem);
            return newList;
        } else {
            var low = 0;
            var high = oldList.length - 1;
            // find index where date is older than index-1 and same or younger than date at index+1;
            while (low !== high) {
                let mid = Math.floor((high + low) / 2);
                const item = oldList[mid];
                // if new item is younger look at low -> mid
                if (newItem.compareDateTo(item) === 1) {
                    if (mid === 0) {
                        high = 0;
                    } else {
                        high = mid;
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
                    let newList = [newItem];
                    return (newList.concat(oldList));
                } else {
                    let newList = oldList.slice(0, low + 1);
                    newList.push(newItem);
                    return (newList.concat(oldList.slice(low + 1)));
                }

            } else if (low === oldList.length - 1) {

                if (newItem.compareDateTo(item) === 1) {
                    let newList = oldList.slice(0, low);
                    newList.push(newItem);
                    return (newList.concat(oldList.slice(low)));
                } else {
                    let newList = oldList.slice(0);
                    newList.push(newItem)
                    return (newList);
                }

            } else {

                if (newItem.compareDateTo(item) === 1) {
                    // younger than oldlist[low] (between low-1 and low)
                    // slice from 0 to low (exclusive) add newitem append slice from low to finish
                    let newList = oldList.slice(0, low);
                    newList.push(newItem);
                    return (newList.concat(oldList.slice(low)))
                } else {
                    // older than or equal to low (after low)
                    // slice from 0 to low + 1(exclusive) add new item append slice from low + 1 to finish
                    let newList = oldList.slice(0, low + 1);
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

    // INVENTORY FUNCTIONS

    function addInventoryProduct(date, name, quantity, price) {
        const newItem = new InventoryItem(date, name, quantity, price);
        var newList = addItemToOldList(newItem, inventory);
        setInventory(newList);

        let total = inventoryTotal + price * quantity;
        setInventoryTotal(total);
    }

    function removeInventoryProduct(itemNumber) {
        let total = inventoryTotal - inventory[itemNumber - 1].price * inventory[itemNumber - 1].quantity;
        setInventoryTotal(total);
        setInventory(removeItemFromList(itemNumber, inventory));
    }

    function editInventoryProduct(itemNumber, date, name, quantity, price) {
        let newItem = new InventoryItem(date, name, quantity, price);
        let newList = removeItemFromList(itemNumber, inventory);
        setInventory(addItemToOldList(newItem, newList));
    }

    // EXPENSE FUNCTIONS

    function addExpenseProduct(date, name, quantity, price) {
        const newItem = new ExpenseItem(date, name, quantity, price);
        var newList = addItemToOldList(newItem, expenses);
        setExpenses(newList);

        let total = expenseTotal + price * quantity;
        setExpenseTotal(total);
    }

    function removeExpenseProduct(itemNumber) {
        let total = expenseTotal - expenses[itemNumber - 1].price;
        setExpenseTotal(total);
        setExpenses(removeItemFromList(itemNumber, expenses));
    }

    function editExpenseProduct(itemNumber, date, name, quantity, price) {
        let newItem = new ExpenseItem(date, name, quantity, price);
        let newList = removeItemFromList(itemNumber, expenses);
        setExpenses(addItemToOldList(newItem, newList));
    }

    // SALES FUNCTIONS

    function addSalesItem(itemNumber, date, salePrice, payout, costToShip, quantitySold) {
        var item = inventory[itemNumber - 1];
        let profit = payout - costToShip - (quantitySold * item.price);

        if (item.quantity - quantitySold === 0) {
            removeInventoryProduct(itemNumber);
        } else {
            item.quantity = item.quantity - quantitySold;
            let newInventory = inventory;
            newInventory[itemNumber - 1] = item;

            setInventory(newInventory);
            let total = inventoryTotal - (quantitySold * item.price);
            setInventoryTotal(total)
        }

        var newSaleItem = new SalesItem(date, item.name, item.date, quantitySold, item.price, salePrice, payout, costToShip, profit.toFixed(2));
        setSales(addItemToOldList(newSaleItem, sales));

        let total = profitTotal + profit;
        setProfitTotal(total.toFixed(2));

    }

    function removeSalesItem(itemNumber) {
        let total = profitTotal - sales[itemNumber - 1].profit;
        setProfitTotal(total);
        setSales(removeItemFromList(itemNumber, sales));
    }

    function editSalesItem(itemNumber, date, salePrice, payout, costToShip) {
        let oldItem = sales[itemNumber - 1]
        let total = profitTotal - (oldItem.payout - oldItem.costToShip - (oldItem.quantitySold * oldItem.price));
        let profit = payout - costToShip - (oldItem.quantitySold * oldItem.pricePerQuantity);
        let newList = removeItemFromList(itemNumber, sales);
        var newSaleItem = new SalesItem(date, oldItem.name, oldItem.purchasedDate, oldItem.quantitySold, oldItem.pricePerQuantity, salePrice, payout, costToShip, profit.toFixed(2));
        setSales(addItemToOldList(newSaleItem, newList));
        total += profit;
        setProfitTotal(total.toFixed(2));
    }

    function redoSalesItem(itemNumber) {
        const sale = sales[itemNumber - 1];
        setSales(removeItemFromList(itemNumber, sales))
        for (let i = 0; i < inventory.length; i++) {
            let item = inventory[i];
            if (item.date.localeCompare(sale.purchasedDate) === 0) {
                if (item.name.localeCompare(sale.name) === 0) {
                    if (item.price === sale.pricePerQuantity) {
                        let list = inventory;
                        list[i].quantity = (parseInt(list[i].quantity) + parseInt(sale.quantitySold)).toString();
                        setInventory(list);
                        return
                    }
                }
            }
        }
        const item = new InventoryItem(sale.purchasedDate, sale.name, sale.quantitySold, sale.pricePerQuantity);
        setInventory(addItemToOldList(item, inventory));
    }




    //LOADING AND SAVING

    /*
        Description: Creates a CSV file will sales data for download

    */
    function createDataCSV() {
        let csv = 'INVENTORY PURCHASE DATE,INVENTORY PRODUCT NAME,INVENTORY QTY,INVENTORY PRODUCT PRICE,SOLD DATE,SOLD PRODUCT NAME,SOLD DATE PURCHASED,SOLD QUANTITY SOLD,SOLD PRICE PER QUANTITY,SOLD PRICE,SOLD PAYOUT,SOLD COST TO SHIP,SOLD PROFIT,EXPENSES PURCHASE DATE,EXPENSE PRODUCT NAME,EXPENSE PRODUCT QTY,EXPENSE PRICE\n'
        const inventoryLength = inventory.length
        const salesLength = sales.length
        const expensesLength = expenses.length
        const max = Math.max(inventoryLength, salesLength, expensesLength)
        const emptyInventory = ',,,,'
        const emptySale = ',,,,,,,,,'
        const emptyExpense = ',,,\n'

        for (let i = 0; i < max; i++) {
            let row = ""

            if (inventoryLength > i) {
                let item = inventory[i];
                row = row + item.date + ',' + item.name + ',' + item.quantity + ',' + item.price + ','
            } else {
                row = row + emptyInventory
            }

            if (salesLength > i) {
                let item = sales[i];
                row = row + item.date + ',' + item.name + ',' + item.purchasedDate + ',' + item.quantitySold + ',' + item.pricePerQuantity + ',' + item.salePrice + ',' + item.payout + ',' + item.costToShip + ',' + item.profit + ','
            } else {
                row = row + emptySale
            }

            if (expensesLength > i) {
                let item = expenses[i];
                row = row + item.date + ',' + item.name + ',' + item.quantity + ',' + item.price + '\n'
            } else {
                row = row + emptyExpense
            }
            csv = csv + row
        }

        return csv.substring(0, csv.length - 1)
    }


    /* 
        Description: Reads a CSV file of the correct format and puts
                     data in the appopriate table
    */
    function readDataCSV(csvFile) {
        const reader = new FileReader()

        reader.onload = function () {
            // process the content
            var newInventory = [];
            var newSales = [];
            var newExpenses = [];

            // extract each row
            let rows = reader.result.split('\n')
            for (let i = 1; i < rows.length; i++) {
                // get items from each row separated by comma
                let items = rows[i].split(',');
                if (items[0] !== '' && items[0] !== undefined) {
                    newInventory.push(new InventoryItem(items[0], items[1], items[2], items[3]));
                }

                if (items[4] !== '' && items[4] !== undefined) {
                    newSales.push(new SalesItem(items[4], items[5], items[6], items[7], items[8], items[9], items[10], items[11], items[12]));
                }

                if (items[13] !== '' && items[13] !== undefined) {
                    newExpenses.push(new ExpenseItem(items[13], items[14], items[15], items[16]));
                }
            }

            setInventory(newInventory)
            setSales(newSales)
            setExpenses(newExpenses)
            setUploaded(true)
        }
        reader.readAsText(csvFile)
    }

    function handleInfoOpen() {
        setOpenInfo(true)
    }

    function handleInfoClose() {
        setOpenInfo(false)
    }

    return (
        <div id='page-container' >
            <TopBar infoOpen={handleInfoOpen} data={createDataCSV} read={readDataCSV} />
            <InventorySalesExpenseInfo
                inventoryTotal={inventoryTotal}
                profitTotal={profitTotal}
                expenseTotal={expenseTotal}
                inventory={inventory}
                expenses={expenses}
                sales={sales}
            />
            <div id='content-wrap'>
                <Tabs
                    id='tabs'
                    activeKey={tab}
                    onSelect={(k) => tabSwitch(k)}
                >
                    <Tab
                        eventKey='inventory'
                        title='Inventory'
                    >
                        <Inventory
                            currInventory={inventory}
                            removeInventory={removeInventoryProduct}
                            addNewInventory={addInventoryProduct}
                            selling={addSalesItem}
                            editInventory={editInventoryProduct}
                            inventoryHeader={inventoryHeader}
                        />
                    </Tab>
                    <Tab
                        eventKey='sales'
                        title='Sales'
                    >
                        <Sales
                            salesHeader={salesHeader}
                            currSales={sales}
                            removeSale={removeSalesItem}
                            editSale={editSalesItem}
                            redoSale={redoSalesItem}
                            addExpense={addExpenseProduct}
                        />
                    </Tab>
                    <Tab
                        eventKey='expenses'
                        title='Expenses'
                    >
                        <Expense
                            currExpense={expenses}
                            removeExpense={removeExpenseProduct}
                            addNewExpense={addExpenseProduct}
                            editExpense={editExpenseProduct}
                            expensesHeader={expensesHeader}
                        />
                    </Tab>
                </Tabs>
                <Dialog
                    open={openInfo}
                    close={handleInfoClose}
                    maxSize='sm'
                    header='Info'
                    body={<p>You can download the existing table as a csv.
                        You can then upload that same csv to repopulate the table.
                        DO NOT ALTER THE CSV AS IT WILL NOT UPLOAD PROPERLY.
                        AVOID USING COMMAS IN YOUR PRODUCT NAME.
                        Will have error handling for these issues soon.</p>}>
                </Dialog>
            </div>



            <footer id='footer'>
                <BottomBar githubLink="https://github.com/Jeffligit" linkedinLink="https://www.linkedin.com/in/jeff-li-3014/"/>
            </footer>

        </div>

    )
}