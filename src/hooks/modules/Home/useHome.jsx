import { MTableBody } from '@material-table/core'
import { PermDataSetting, Preview } from '@mui/icons-material'
import { Button, TableCell, TableRow } from '@mui/material'
import { appSettings, HomeInvoiceDataColumns, useLocalStorage, useAxios, axios, Context, useTableIcons } from '@psoftcs'
import React, { useContext, useEffect, useState } from 'react'
import itemData from '../../../ItemData/itemData.json'
import PrintIcon from '@mui/icons-material/Print';
function useHome() {
    const { logMessage } = useContext(Context)
    const { tableIcons } = useTableIcons();
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

    const [invoiceData, setInvoiceData] = useState([])
    const [itemCounterValue, setItemCounterValue] = useState()

    const [isNewProduct, setIsNewProduct] = useState(true);

    const { endpointConfig, fieldTypes } = appSettings

    const [{ data: AllProducts, loading: allProductsRunning, allProductsErrors }, refetchAllProducts] = useAxios(endpointConfig.products.getAll)
    const [{ data: allInvoices, loading: allInvoicesRunning, allInvoicesErrors }, refetchallInvoices] = useAxios(endpointConfig.invoices.getAll)
    const [{ }, AddInvoices] = useAxios(
        {
            url: endpointConfig.invoices.addInvoices,
            method: "POST"
        }, { manual: true })


    const postInvoice = async (invoiceData) => {
        var totalAmount = invoiceData && invoiceData
            .reduce((acc, value) => acc + value.total, 0)

        const invoice = {
            id: undefined,
            items: invoiceData,
            total: totalAmount,
            invoiceDate: new Date().toLocaleDateString(),
            invoiceTime: new Date().toLocaleTimeString()
        }
        AddInvoices({
            url: endpointConfig.invoices.getAll,
            data: invoice
        }).then(function (response) {
            console.log(response);
            setInvoiceData([]);
        }).catch(function (error) {
            console.log(error)
        })
    }
    const printInvoice = (invoiceData) => {
        postInvoice(invoiceData)
    }

    const { columns } = HomeInvoiceDataColumns()
    useEffect(() => {
        setAppItem("itemData", JSON.stringify([]))
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
                                            <Button sx={{ color: "black" }} disabled={invoiceData.length == 0 ? true : false} onClick={() => { printInvoice(invoiceData) }}><PrintIcon /></Button>

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
                setTimeout(async () => {
                    if (newData.quantity > 0) {
                        const updateProductData = {
                            id: oldData.id,
                            productName: oldData.productName,
                            quantity: newData.quantity,
                            price: newData.price,
                            total: newData.quantity * newData.price,
                        }
                        console.log("updateProductData", updateProductData);
                        const oldProductData = invoiceData.filter((data) => {
                            if (newData.productName !== data.productName) {
                                return data
                            }
                        })

                        await setInvoiceData([...oldProductData, updateProductData])
                    } else if (newData.quantity == 0) {
                        const oldProductData = invoiceData.filter((data) => {
                            if (oldData.productName !== data.productName) {
                                return data
                            }
                        })
                        setInvoiceData([...oldProductData])
                    } else {
                        logMessage({
                            severity: statusType.warning,
                            msg: "please enter positive value",
                            vertical: "top",
                            horizontal: "right"
                        })
                    }

                    resolve()
                }, 500);
            }),
        onRowDelete: oldData => new Promise((resolve, reject) => {
            setTimeout(() => {
                const oldProductData = invoiceData.filter((data) => {
                    if (oldData.productName !== data.productName) {
                        return data
                    }
                })
                setInvoiceData([...oldProductData])
                // setAppItem("itemData", JSON.stringify([...oldProductData]))
                resolve()
            }, 500);
        }),
    }
    const addItemToInvoice = async (event, value) => {

        let result = invoiceData.find((data) => data.id === value.id)
        if (typeof result === 'undefined') {
            setInvoiceData([...invoiceData, {
                id: value.id,
                productName: value.productName,
                quantity: 1,
                price: value.price,
                total: 1 * value.price,
            }])
        } else {
            logMessage({
                severity: statusType.warning,
                msg: "item already added",
                vertical: "top",
                horizontal: "right"
            })
        }
    }


    const actions = [
        {
            icon: tableIcons.Add,
            tooltip: 'Add product to invoice',
            onClick: (event, rowData) => addItemToInvoice(event, rowData)
        }
    ]



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

        AllProducts,
        allProductsRunning,
        actions
    }


}

export default useHome