import React, { useEffect, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Inventory from './components/Tabs/Inventory'
import Sales from './components/Tabs/Sales'
import Expense from './components/Tabs/Expense'
import TopBar from './components/TopBar'
import Dialog from './components/Dialog'
import InventorySalesExpenseInfo from './components/InventorySalesExpenseInfo'



export default function Main() {

    const inventoryHeader = Array(1).fill(['#', 'Purchase Date (MM/DD/YYYY)', 'Product Name', 'Price', 'Quantity at Price', ''])
    const salesHeader = Array(1).fill(['#', 'Sold Date (MM/DD/YYYY)', 'Product Name', 'Price Paid', 'Sold Price', 'Payout', 'Cost to Ship', 'Profit', ''])
    // this one has label column, a later addition
    // const expensesHeader = Array(1).fill(['#', 'Purchase Date (MM/DD/YYYY)', 'Produce Name', 'Price', 'Label', ''])
    const expensesHeader = Array(1).fill(['#', 'Purchase Date (MM/DD/YYYY)', 'Product Name', 'Price', 'Quantity at Price', ''])
    const [tab, setTab] = useState('inventory')
    const [inventory, setInventory] = useState(inventoryHeader)
    const [sales, setSales] = useState(salesHeader)
    const [expenses, setExpenses] = useState(expensesHeader)
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
        var total = 0
        for (let i = 1; i < inventory.length; i++) {
            total += parseFloat(inventory[i][3]) * parseInt(inventory[i][4])
        }
        setInventoryTotal(total)
        total = 0
        for (let i = 1; i < sales.length; i++) {
            total += parseFloat(sales[i][7])
        }
        setProfitTotal(total)
        total = 0
        for (let i = 1; i < inventory.length; i++) {
            total += parseFloat(expenses[i][3]) * parseInt(expenses[i][4])
        }
        setExpenseTotal(total)
    }, [uploaded, inventory, sales, expenses])

    /*
        Description: Handle switching tabs
        
        Input: switchedTab (string) - eventKey of the tab
        Output: None
    */
    function tabSwitch(switchedTab) {
        setTab(switchedTab)
    }

    /* 
        Description: Handles adding new inventory item

        Input: 
            date (string) - date purchased/made. In the structure MM/DD/YYYY
            name (string) - name of the item
            price (string) - cost of the new inventory item
            quantity (string) - amount of this item at price

    */
    // function addNewInventory(date, name, price, quantity) {
    //     // Add space for the new item
    //     let newInventory = new Array(inventory.length + 1)

    //     // add in header
    //     newInventory[0] = inventory[0]
    //     // If we don't know what the purchase date is or inventory is empty
    //     if (date === 'Unknown' || inventory.length === 1) {

    //         // Fill new list with current inventory
    //         for (let i = 1; i < inventory.length; i++) {
    //             newInventory[i] = inventory[i]
    //         }

    //         // Append new item with unknown purchase date to the end
    //         newInventory[inventory.length] = [inventory.length.toString(), date, name, price, quantity]
    //     } else {
    //         let hasAdded = false

    //         // Iterate through current inventory.
    //         for (let i = 1; i < inventory.length; i++) {
    //             // If current inventory date is Unknown then we reached the end of all dated items
    //             if (inventory[i][1] === 'Unknown') {
    //                 // Add new item to the list where dates end and Unknown begins
    //                 newInventory[i] = [i.toString(), date, name, price, quantity]
    //                 // Add in the rest of the unknown date items
    //                 for (i; i < inventory.length; i++) {
    //                     newInventory[i + 1] = inventory[i]
    //                     newInventory[i + 1][0] = (i + 1).toString()
    //                 }

    //                 hasAdded = true

    //             } else {
    //                 let currItemDate = inventory[i][1].split('/')
    //                 let newItemDate = date.split('/')

    //                 // If the new item's year is greater than current item in inventory
    //                 if (newItemDate[2] > currItemDate[2]) {
    //                     newInventory[i] = [i.toString(), date, name, price, quantity]

    //                     for (i; i < inventory.length; i++) {
    //                         newInventory[i + 1] = inventory[i]
    //                         newInventory[i + 1][0] = (i + 1).toString()
    //                     }

    //                     hasAdded = true

    //                     // if the years are the same
    //                 } else if (newItemDate[2] === currItemDate[2]) {
    //                     // check month

    //                     // If the new item's month is greater than current item in inventory
    //                     if (newItemDate[0] > currItemDate[0]) {

    //                         // New item is more recent
    //                         newInventory[i] = [i.toString(), date, name, price, quantity]

    //                         for (i; i < inventory.length; i++) {
    //                             newInventory[i + 1] = inventory[i]
    //                             newInventory[i + 1][0] = (i + 1).toString()
    //                         }

    //                         hasAdded = true

    //                     } else if (newItemDate[0] === currItemDate[0]) {
    //                         // check day

    //                         if (newItemDate[1] > currItemDate[1]) {
    //                             // New item is more recent
    //                             newInventory[i] = [i.toString(), date, name, price, quantity]

    //                             for (i; i < inventory.length; i++) {
    //                                 newInventory[i + 1] = inventory[i]
    //                                 newInventory[i + 1][0] = (i + 1).toString()
    //                             }

    //                             hasAdded = true

    //                         } else if (newItemDate[1] === currItemDate[1]) {
    //                             // order by product name

    //                             if (name < inventory[i][2]) {
    //                                 newInventory[i] = [i.toString(), date, name, price, quantity]

    //                                 for (i; i < inventory.length; i++) {
    //                                     newInventory[i + 1] = inventory[i]
    //                                     newInventory[i + 1][0] = (i + 1).toString()
    //                                 }

    //                                 hasAdded = true

    //                             } else {

    //                                 newInventory[i] = inventory[i]
    //                             }

    //                         } else {
    //                             newInventory[i] = inventory[i]
    //                         }

    //                     } else {

    //                         // New item is older than current item in inventory
    //                         newInventory[i] = inventory[i]
    //                     }


    //                 } else {
    //                     // curr item in inventory was purchased earlier than new item
    //                     // simply add to new list

    //                     newInventory[i] = inventory[i]
    //                 }
    //             }
    //         }

    //         if (!hasAdded) {
    //             newInventory[inventory.length] = [inventory.length.toString(), date, name, price, quantity]
    //         }
    //     }

    //     setInventory(newInventory)
    // }

    /* 
        Description: Handles adding new inventory item

        Input:
            isInventory(boolean) - true if product is inventory, false if product is for expense
            date (string) - date purchased/made. In the structure MM/DD/YYYY
            name (string) - name of the item
            price (string) - cost of the new inventory item
            quantity (string) - amount of this item at price

    */
    function addProduct(isInventory, date, name, price, quantity) {
        let newList
        let oldList
        if (isInventory) {
            oldList = inventory
        } else {
            oldList = expenses
        }

        // Add space for the new item
        newList = new Array(oldList.length + 1)

        // add in header
        newList[0] = oldList[0]
        // If we don't know what the purchase date is or inventory is empty
        if (date === 'Unknown' || oldList.length === 1) {

            // Fill new list with current inventory
            for (let i = 1; i < oldList.length; i++) {
                newList[i] = oldList[i]
            }

            // Append new item with unknown purchase date to the end
            newList[oldList.length] = [oldList.length.toString(), date, name, price, quantity]
        } else {
            let hasAdded = false

            // Iterate through current inventory.
            for (let i = 1; i < oldList.length; i++) {
                // If current inventory date is Unknown then we reached the end of all dated items
                if (oldList[i][1] === 'Unknown') {
                    // Add new item to the list where dates end and Unknown begins
                    newList[i] = [i.toString(), date, name, price, quantity]
                    // Add in the rest of the unknown date items
                    for (i; i < oldList.length; i++) {
                        newList[i + 1] = oldList[i]
                        newList[i + 1][0] = (i + 1).toString()
                    }

                    hasAdded = true

                } else {
                    let currItemDate = oldList[i][1].split('/')
                    let newItemDate = date.split('/')

                    // If the new item's year is greater than current item in inventory
                    if (newItemDate[2] > currItemDate[2]) {
                        newList[i] = [i.toString(), date, name, price, quantity]

                        for (i; i < oldList.length; i++) {
                            newList[i + 1] = oldList[i]
                            newList[i + 1][0] = (i + 1).toString()
                        }

                        hasAdded = true

                        // if the years are the same
                    } else if (newItemDate[2] === currItemDate[2]) {
                        // check month

                        // If the new item's month is greater than current item in inventory
                        if (newItemDate[0] > currItemDate[0]) {

                            // New item is more recent
                            newList[i] = [i.toString(), date, name, price, quantity]

                            for (i; i < oldList.length; i++) {
                                newList[i + 1] = oldList[i]
                                newList[i + 1][0] = (i + 1).toString()
                            }

                            hasAdded = true

                        } else if (newItemDate[0] === currItemDate[0]) {
                            // check day

                            if (newItemDate[1] > currItemDate[1]) {
                                // New item is more recent
                                newList[i] = [i.toString(), date, name, price, quantity]

                                for (i; i < oldList.length; i++) {
                                    newList[i + 1] = oldList[i]
                                    newList[i + 1][0] = (i + 1).toString()
                                }

                                hasAdded = true

                            } else if (newItemDate[1] === currItemDate[1]) {
                                // order by product name

                                if (name < oldList[i][2]) {
                                    newList[i] = [i.toString(), date, name, price, quantity]

                                    for (i; i < oldList.length; i++) {
                                        newList[i + 1] = oldList[i]
                                        newList[i + 1][0] = (i + 1).toString()
                                    }

                                    hasAdded = true

                                } else {

                                    newList[i] = oldList[i]
                                }

                            } else {
                                newList[i] = oldList[i]
                            }

                        } else {

                            // New item is older than current item in inventory
                            newList[i] = oldList[i]
                        }


                    } else {
                        // curr item in inventory was purchased earlier than new item
                        // simply add to new list

                        newList[i] = oldList[i]
                    }
                }
            }

            if (!hasAdded) {
                newList[oldList.length] = [oldList.length.toString(), date, name, price, quantity]
            }
        }

        if (isInventory) {
            setInventory(newList)
            let total = inventoryTotal + price * quantity
            setInventoryTotal(total)
        } else {
            setExpenses(newList)
        }
        
    }


    /*
        Description: 
            Handles adding new sale item. Subtracts from
            existing quantity. Removes item from inventory if quantity
            reaches 0.

        Input: 
            itemNumber (int) - item number in inventory
            price (string) - total sale price
            payout (string) - amount of money received
            quantitySold (string) - number of this item sold
            date (string) - date of the sale in format MM/DD/YYYY
            cost (string) - cost to ship (shipping labels and fees)
    */
    function addNewSale(itemNumber, price, payout, quantitySold, date, cost) {
        // get item from inventory using itemNumber to then extract item info
        let item = inventory[itemNumber]
        let newSales = Array(sales.length + 1)
        let productName = item[2]
        let pricePaid = (parseFloat(quantitySold) * parseFloat(item[3])).toString()
        let profit = (parseFloat(payout) - parseFloat(cost) - parseFloat(pricePaid)).toString()

        let quantity = parseFloat(item[4])

        // Edit inventory
        if (quantity - parseFloat(quantitySold) === 0) {
            removeInventory(itemNumber)
        } else {
            item[4] = (quantity - parseFloat(quantitySold)).toString()
            let newInventory = inventory;
            newInventory[itemNumber] = item
            setInventory(newInventory)
        }

        newSales[0] = sales[0]
        if (sales.length === 1) {
            // append to newSales
            newSales[sales.length] = [sales.length.toString(), date, productName, pricePaid, price, payout, cost, profit]
        } else {
            let hasAdded = false
            let newSaleDate = date.split('/')

            for (let i = 1; i < sales.length; i++) {
                let currSaleDate = sales[i][1].split('/')

                // If the new sale's year is greater than current sale in sales
                if (newSaleDate[2] > currSaleDate[2]) {
                    newSales[i] = [i.toString(), date, productName, pricePaid, price, payout, cost, profit]

                    for (i; i < sales.length; i++) {
                        newSales[i + 1] = sales[i]
                        newSales[i + 1][0] = (i + 1).toString()
                    }

                    hasAdded = true

                    // if the years are the same
                } else if (newSaleDate[2] === currSaleDate[2]) {
                    // check month

                    // If the new sale's month is greater than current sale in inventory
                    if (newSaleDate[0] > currSaleDate[0]) {

                        // New sale is more recent
                        newSales[i] = [i.toString(), date, productName, pricePaid, price, payout, cost, profit]

                        for (i; i < sales.length; i++) {
                            newSales[i + 1] = sales[i]
                            newSales[i + 1][0] = (i + 1).toString()
                        }

                        hasAdded = true

                    } else if (newSaleDate[0] === currSaleDate[0]) {
                        // check day

                        if (newSaleDate[1] > currSaleDate[1]) {
                            // New sale is more recent
                            newSales[i] = [i.toString(), date, productName, pricePaid, price, payout, cost, profit]

                            for (i; i < sales.length; i++) {
                                newSales[i + 1] = sales[i]
                                newSales[i + 1][0] = (i + 1).toString()
                            }

                            hasAdded = true

                        } else if (newSaleDate[1] === currSaleDate[1]) {
                            // order by product name

                            if (productName < sales[i][2]) {
                                newSales[i] = [i.toString(), date, productName, pricePaid, price, payout, cost, profit]

                                for (i; i < sales.length; i++) {
                                    newSales[i + 1] = sales[i]
                                    newSales[i + 1][0] = (i + 1).toString()
                                }

                                hasAdded = true

                            } else {

                                newSales[i] = sales[i]
                            }

                        } else {
                            newSales[i] = sales[i]
                        }

                    } else {
                        // New item is older than current item in inventory
                        newSales[i] = sales[i]
                    }

                } else {
                    // curr item in inventory was purchased earlier than new item
                    // simply add to new list

                    newSales[i] = sales[i]
                }
            }

            if (!hasAdded) {
                newSales[sales.length] = [sales.length.toString(), date, productName, pricePaid, price, payout, cost, profit]
            }
        }

        setSales(newSales)
    }

    // /*
    //     Description: Handles adding new expense item.

    //     Input:
    //         date (string) - date purchased. In the structure MM/DD/YYYY
    //         name (string) - name of the item
    //         price (string) - cost of the new expense
    // */
    // function addNewExpense(date, name, price) {
    //     // Add space for the new expense
    //     let newExpense = new Array(expenses.length + 1)

    //     // add in header
    //     newExpense[0] = expenses[0]

    //     // if expenses is empty
    //     if (expenses.length === 1) {
    //         // append new expense
    //         newExpense[expenses.length] = [expenses.length.toString(), date, name, price]
    //     }
    // }


    /*
        Description: Removes an item from inventory based on item number

        Input: itemNumber (int) - item number in inventory
    */
    function removeInventory(itemNumber) {
        let newInventory = Array(inventory.length - 1)

        for (let i = 0; i < itemNumber; i++) {
            newInventory[i] = inventory[i]
        }

        for (let i = itemNumber; i < newInventory.length; i++) {
            newInventory[i] = inventory[i + 1]
            newInventory[i][0] = i.toString()
        }

        setInventory(newInventory)
    }

    /*
        Description: Removes an item from sales based on item number

        Input: itemNumber (int) - item number in sales
    */
    function removeSale(itemNumber) {
        let newSales = Array(sales.length - 1)

        for (let i = 0; i < itemNumber; i++) {
            newSales[i] = sales[i]
        }

        for (let i = itemNumber; i < newSales.length; i++) {
            newSales[i] = sales[i + 1]
            newSales[i][0] = i.toString()
        }

        setSales(newSales)
    }

    /*
        Description: Removes an item from expense based on item number

        Input: itemNumber (int) - item number in expenses
    */
    function removeExpense(itemNumber) {
        let newExpenses = Array(expenses.length - 1)

        for (let i = 0; i < itemNumber; i++) {
            newExpenses[i] = expenses[i]
        }

        for (let i = itemNumber; i < newExpenses.length; i++) {
            newExpenses[i] = expenses[i + 1]
            newExpenses[i][0] = i.toString()
        }

        setExpenses(newExpenses)
    }


    /*
        Description: Creates a CSV file will sales data for download

    */
    function createDataCSV() {
        let csv = 'INVENTORY PURCHASE DATE,INVENTORY PRODUCT NAME,INVENTORY PRODUCT PRICE,INVENTORY QTY,SOLD DATE,SOLD PRODUCT NAME,SOLD PAID PRICE,SOLD PRICE,SOLD PAYOUT,SOLD COST TO SHIP,SOLD PROFIT,EXPENSES PURCHASE DATE,EXPENSE PRODUCT NAME,EXPENSE PRODUCT PRICE,EXPENSE QTY\n'
        const inventoryLength = inventory.length
        const salesLength = sales.length
        const expensesLength = expenses.length
        const max = Math.max(inventoryLength, salesLength, expensesLength)
        const emptyInventory = ',,,,'
        const emptySale = ',,,,,,,'
        const emptyExpense = ',,,\n'
        
        for (let i = 1; i < max; i++) {
            let row = ""

            if (inventoryLength > i) {
                row = row + inventory[i][1] + ',' + inventory[i][2] + ',' + inventory[i][3] + ',' + inventory[i][4] + ','
            } else {
                row = row + emptyInventory
            }

            if (salesLength > i) {
                row = row + sales[i][1] + ',' + sales[i][2] + ',' + sales[i][3] + ',' + sales[i][4] + ',' + sales[i][5] + ',' + sales[i][6] + ',' + sales[i][7] + ','
            } else {
                row = row + emptySale
            }

            if (expensesLength > i) {
                row = row + expenses[i][1] + ',' + expenses[i][2] + ',' + expenses[i][3] + ',' + expenses[i][4] + '\n'
            } else {
                row = row + emptyExpense
            }
            csv = csv + row
        }

        return csv.substring(0,csv.length-1)
    }
    

    /* 
        Description: Reads a CSV file of the correct format and puts
                     data in the appopriate table
    */

    function readDataCSV(csvFile) {
        const reader = new FileReader()
        
        reader.onload = function() {
            // process the content
            var newInventory = inventoryHeader;
            var newSales = salesHeader;
            var newExpenses = expensesHeader;
            
            // extract each row
            let rows = reader.result.split('\n')
            for (let i = 1; i < rows.length; i++) {
                // get items from each row separated by comma
                let items = rows[i].split(',');
                if (items[0] !== '') {
                    newInventory.push([i, items[0], items[1], items[2], items[3]])
                }

                if (items[4] !== '') {
                    newSales.push([i, items[4], items[5], items[6], items[7], items[8], items[9], items[10]])
                }

                if (items[11] !== '') {
                    newExpenses.push([i, items[11], items[12], items[13], items[14]])
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
        <div >
            <TopBar infoOpen={handleInfoOpen} data={createDataCSV} read={readDataCSV}/>
            <InventorySalesExpenseInfo 
                inventoryTotal={inventoryTotal}
                profitTotal={profitTotal}
                expenseTotal={expenseTotal}
            />
            <Tabs
                id='tabs'
                activeKey={tab}
                onSelect={(k) => tabSwitch(k)}
            >
                <Tab eventKey='inventory' title='Inventory'>
                    <Inventory currInventory={inventory} removeInventory={removeInventory} addNewInventory={addProduct} selling={addNewSale} />
                </Tab>
                <Tab eventKey='sales' title='Sales'>
                    <Sales currSales={sales} removeSale={removeSale} />
                </Tab>
                <Tab eventKey='expenses' title='Expenses'>
                    <Expense currExpense={expenses} removeExpense={removeExpense} addNewExpense={addProduct}/>
                </Tab>
            </Tabs>
            <Dialog open={openInfo} close={handleInfoClose}
                maxSize='sm'
                header='Info'
                body={<p>You can download the existing table as a csv. 
                    You can then upload that same csv to repopulate the table.
                    DO NOT ALTER THE CSV AS IT WILL NOT UPLOAD PROPERLY.
                    AVOID USING COMMAS IN YOUR PRODUCT NAME.
                    Will have error handling for these issues soon.</p>}>
            </Dialog>
        </div>

    )
}