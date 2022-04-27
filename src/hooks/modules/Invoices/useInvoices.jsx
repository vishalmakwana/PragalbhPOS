import { appSettings, Context, useTableIcons, useAxios, useConfirm, format } from "@psoftcs"
import { useContext, useState } from "react"

function useInvoices() {
    const { logMessage } = useContext(Context)
    const { endpointConfig, fieldTypes, statusType } = appSettings
    const { tableIcons } = useTableIcons()
    const confirm = useConfirm()

    const [openDialog, setOpenDialog] = useState(false)
    const [modalHeader, setModalHeader] = useState({})
    const [modalContent, setModalContent] = useState({})
    const [modalActions, setModalActions] = useState([])
    const [modalFormResetKeys, setModalFormResetKeys] = useState([])
    const [modalTaskRunning, setModalTaskRunning] = useState(false)

    const [{ data: allInvoices, loading: allInvoicesLoading, allInvoicesErrors }, refetchAllInvoices] = useAxios(endpointConfig.invoices.getAll)
    const [{ }, refetchAllInvoicesById] = useAxios(endpointConfig.invoices.getInvoicesById, { manual: true })
    const [{ }, saveProducts] = useAxios(
        {
            url: endpointConfig.invoices.addInvoices,
            method: "POST"
        },
        { manual: true })
    const [{ }, updateProducts] = useAxios(
        {
            url: endpointConfig.invoices.updateInvoices,
            method: "PUT"
        },
        { manual: true })

    const [{ }, deleteInvoice] = useAxios(
        {
            url: endpointConfig.invoices.deleteInvoicesById,
            method: "DELETE"
        },
        { manual: true })

    console.log(allInvoices);

    const actions = [
        // {
        //     icon: tableIcons.Add,
        //     tooltip: 'Add Products',
        //     isFreeAction: true,
        //     onClick: (event, rowData) => handleActionClick(event, false, false, {})
        // },
        // {
        //     icon: tableIcons.Edit,
        //     tooltip: 'Edit Products',
        //     onClick: (event, rowData) => new Promise((resolve) => {
        //         // setIsLoading(true)
        //         setModalFormResetKeys([])
        //         refetchAllInvoicesById({ url: format(endpointConfig.invoices.getInvoicesById, rowData.id) }).then(res => {
        //             if (res.status === 200) {
        //                 resolve(res.data)
        //             }
        //         }).catch(err => err)

        //     }).then(data => handleActionClick(event, true, false, data))
        // },
        {
            icon: tableIcons.Delete,
            tooltip: 'Delete Products',
            onClick: (event, rowData) => new Promise((resolve) => {
                // setIsLoading(true)
                confirm({ description: 'Are you sure you want to delete?' })
                    .then(() => {
                        setModalFormResetKeys([])
                        deleteInvoice({ url: format(endpointConfig.invoices.deleteInvoicesById, rowData.id) })
                            .then((res) => {
                                if (res.status === 200) {
                                    refetchAllInvoices()
                                    resolve()
                                }
                            })
                            .catch(err => err)
                    })
            })
        }
    ]

    const handleSubmit = (data, isEdit, id) => {
        const response = isEdit === true ? updateProducts({
            url: format(endpointConfig.products.updateProducts, id),
            data: {
                id: Number(id),
                ...data
            }
        }) : saveProducts({ data })
        response.then((res) => {
            const { msg, errorMessage, message, title } = res.data
            if (res.status === 200 || res.status === 201) {
                handleModalClose()
                refetchAllInvoices()
            }
            logMessage({
                severity: res.status === 200 ? statusType.success : statusType.error,
                msg: msg ?? errorMessage ?? message ?? title
            })
        })
            .catch(err => err)
            .finally(() => setModalTaskRunning(false))
    }



    const handleActionClick = (event, isEdit = false, isView = false, rowData = {}) => {
        console.log(rowData);
        setModalHeader({
            isForm: true,
            title: isEdit === true ? "Edit Products" : "Add Products",
            header: isEdit === true ? "Edit this existing Products" : "Create a new Products",
            modalWidth: 'md'
        })
        setModalContent({
            categoryId: {
                label: "Category Name",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.categoryId ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "Category name is required" }
                }
            },
            productName: {
                label: "Products Name",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.productName ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "Products name is required" }
                }
            },

        })
        setModalActions(isView === true ? [] : [
            {
                label: isEdit === true ? "Update" : "Save",
                icon: isEdit === true ? tableIcons.Edit : tableIcons.Save,
                isSubmit: true,
                action: isEdit === true ? (data) => handleSubmit(data, true, rowData?.id) : (data) => handleSubmit(data, false)
            }
        ])
        setOpenDialog(true)
    }

    const handleModalClose = () => {
        setOpenDialog(false)
        setModalFormResetKeys([])
    }

    return {
        openDialog,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        actions,
        allInvoices,
        allInvoicesLoading,
        handleModalClose

    }


}

export default useInvoices