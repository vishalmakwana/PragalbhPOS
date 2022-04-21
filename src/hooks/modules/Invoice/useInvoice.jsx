import { MTableBody } from '@material-table/core'
import { PermDataSetting, Preview } from '@mui/icons-material'
import { Button, TableCell, TableRow } from '@mui/material'
import { appSettings, InvoiceDataColumns, useLocalStorage, useAxios, axios, Context } from '@psoftcs'
import React, { useContext, useEffect, useState } from 'react'
import itemData from '../../../ItemData/itemData.json'
import PrintIcon from '@mui/icons-material/Print';
function useInvoice() {
    const { logMessage } = useContext(Context)
    const { statusType } = appSettings
    const { setAppItem, getAppItem, removeAppItem, clearAll } = useLocalStorage()
    const [categoriesData, setCategoriesData] = useState([])
    const [itemsData, setItemsData] = useState([])
    const [selectedItemData, setSelectedItemData] = useState([])

    const [formHeader, setFormHeader] = useState({})
    const [formContent, setFormContent] = useState({})
    const [formActions, setFormActions] = useState([])
    const [formResetKeys, setFormResetKeys] = useState([])
    const [formTaskRunning, setFormTaskRunning] = useState(false)
    const [freeAction, setFreeAction] = useState(null)

    const [invoiceData, setInvoiceData] = useState([]);
    const [itemCounterValue, setItemCounterValue] = useState();

    const { endpointConfig, fieldTypes } = appSettings

    const [allCategories, setAllCategories] = useState();
    const [allItems, setAllItems] = useState();
    const [allInvoices, setAllInvoices] = useState();

    // const [{ data: AllCategories, loading: allCategoriesLoading, allCategoriesErrors }, refetchAllCategories] = useAxios("/categories")
    // const [{ data: AllItems, loading: allItemsLoading, allItemsErrors }, refetchAllItems] = useAxios("/items")
    // const [{ data: Invoices, loading: invoicesLoading, InvoicesErrors }, refetchInvoices] = useAxios("/invoices")


    useEffect(() => {
        getAllCategories()
        getAllItems()
        getAllInvoices()

    }, []);

    const getAllCategories = () => {
        axios.get('http://localhost:3000/categories')
            .then(function (response) {
                setAllCategories(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const getAllItems = () => {
        axios.get(' http://localhost:3000/items')
            .then(function (response) {
                setAllItems(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const getAllInvoices = () => {
        axios.get('http://localhost:3000/invoices')
            .then(function (response) {
                setAllInvoices(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const postInvoice = async (invoiceData) => {
        const data = allInvoices.slice(-1)
        const id = data[0].invoiceNo
        var totalAmount = invoiceData && invoiceData
            .reduce((acc, value) => acc + value.total, 0)
        console.log(invoiceData && invoiceData
            .reduce((acc, value) => acc + value.total, 0))

        const invoice = { id: id + 1, invoiceno: id + 1, items: invoiceData, total: totalAmount, invoiceDate: new Date().toLocaleDateString(), invoiceTime: new Date().toLocaleTimeString() }

        axios.post('http://localhost:3000/invoices', invoice)
            .then(function (response) {
                console.log(response);
                setInvoiceData([]);
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const printInvoice = (invoiceData) => {
        postInvoice(invoiceData)
    }

    const { columns } = InvoiceDataColumns()
    useEffect(() => {
        setAppItem("itemData", JSON.stringify([]))
        setCategoriesData(itemData.categories)
        setItemsData(itemData.items)
        setItemCounterValue(JSON.parse(getAppItem("itemData")))
        setInvoiceTable()
    }, [])


    const getItem = (categoryName) => {
        setSelectedItemData(itemsData.find((val) => {
            if (val.categoryName == categoryName) {
                return val
            }
        }))
    }

    const setInvoiceTable = () => {

        setFormContent({
            dateList: {
                label: "Invoice",
                type: fieldTypes.table.type,
                col: 12,
                columns: columns,
                editable: editOptions,
                data: invoiceData,
                components: {
                    Body: props => {

                        return (
                            <>
                                <MTableBody {...props} />
                                <>
                                    <TableRow>
                                        <TableCell>
                                            <Button sx={{ color: "black" }} onClick={() => { printInvoice(invoiceData) }}><PrintIcon /></Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <strong>Total</strong>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                invoiceData && invoiceData
                                                    .reduce((acc, value) => acc + value.total, 0)}
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow></>
                            </>

                        )
                    },
                },
                tableOptions: {
                    search: false,
                    filtering: false,
                    selection: false,
                    grouping: false,
                    columnsButton: false,
                    draggable: false,
                    paging: false,
                }
            }
        })
    }

    const editOptions = {
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const updateItemData = {
                        id: oldData.id,
                        itemName: oldData.itemName,
                        quantity: newData.quantity,
                        price: newData.price,
                        total: newData.quantity * newData.price,
                    }
                    console.log("updateItemData", updateItemData);
                    const oldItemData = invoiceData.filter((data) => {
                        if (newData.itemName !== data.itemName) {
                            return data
                        }
                    })
                    setInvoiceData([...oldItemData, updateItemData])
                    setAppItem("itemData", JSON.stringify([...oldItemData, updateItemData]))
                    setInvoiceTable()
                    resolve()
                }, 500);
            }),
        onRowDelete: oldData => new Promise((resolve, reject) => {
            setTimeout(() => {

                const oldItemData = invoiceData.filter((data) => {
                    if (oldData.itemName !== data.itemName) {
                        return data
                    }
                })
                setInvoiceData([...oldItemData])
                setAppItem("itemData", JSON.stringify([...oldItemData]))
                setInvoiceTable()
                resolve()
            }, 500);
        }),
    }
    const addItemToInvoice = async (value, items) => {
        const isNewItem = await invoiceData.filter((data) => {
            if (value.itemName == data.itemName) {
                console.log(data);
                logMessage({
                    severity: statusType.warning,
                    msg: "Item Already Added To Invoice!"
                })
                debugger
                return true
            } else {
                debugger
                return false
            }
        })
        console.log(isNewItem);
        if (isNewItem == undefined) {
            debugger
            return
        } else {
            debugger
            const isNewItem = invoiceData.find((item) => {
                if (item.itemName == value.itemName) {
                    return true
                } else {
                    return false
                }
            })

            if (items != 0) {
                if (items > 1) {
                    const updateItemData = {
                        id: 1,
                        itemName: value.itemName,
                        quantity: items,
                        price: value.itemPrice,
                        total: items * value.itemPrice,
                    }
                    const oldItemData = invoiceData.filter((data) => {
                        if (value.itemName !== data.itemName) {
                            return data
                        }
                    })
                    setInvoiceData([...oldItemData, updateItemData])
                    setAppItem("itemData", JSON.stringify([...oldItemData, updateItemData]))
                    setInvoiceTable()
                } else if (items == 1) {
                    if (isNewItem) {
                        const updateItemData = {
                            id: 1,
                            itemName: value.itemName,
                            quantity: items,
                            price: value.itemPrice,
                            total: items * value.itemPrice,
                        }
                        const oldItemData = invoiceData.filter((data) => {
                            if (value.itemName !== data.itemName) {
                                return data
                            }
                        })
                        setInvoiceData([...oldItemData, updateItemData])
                        setAppItem("itemData", JSON.stringify([...oldItemData, updateItemData]))
                        setInvoiceTable()
                    } else {
                        setInvoiceData([...invoiceData, {
                            id: 1,
                            itemName: value.itemName,
                            quantity: items,
                            price: value.itemPrice,
                            total: items * value.itemPrice,
                        }])
                        setAppItem("itemData", JSON.stringify([...invoiceData, {
                            id: 1,
                            itemName: value.itemName,
                            quantity: items,
                            price: value.itemPrice,
                            total: items * value.itemPrice,
                        }]))
                        setInvoiceTable()
                    }

                }
            } else if (items == 0) {
                const removeInvoiceData = invoiceData.filter((item) => {
                    if (item.itemName !== value.itemName) {
                        return item
                    }
                })
                setAppItem("itemData", JSON.stringify(removeInvoiceData))
                setInvoiceData(removeInvoiceData)
                setInvoiceTable()
            }
            setItemCounterValue(JSON.parse(getAppItem("itemData")))
        }


    }



    useEffect(() => {
        setInvoiceTable()
    }, [invoiceData]);

    return {
        categoriesData,
        itemsData,
        getItem,
        selectedItemData,
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction,
        addItemToInvoice,
        itemCounterValue,

    }


}

export default useInvoice