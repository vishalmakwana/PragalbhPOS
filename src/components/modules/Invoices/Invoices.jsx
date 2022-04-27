import { Card } from '@mui/material'
import { SmartDialog, Strings, MaterialTable, useStyles, InvoicesDataColumns, useInvoices } from '@psoftcs'
import React from 'react'

const Invoices = () => {
    const { columns } = InvoicesDataColumns()
    const {
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
    } = useInvoices()
    const { materialTableStyle: tableStyle } = useStyles()
    return (
        <Card>
            <MaterialTable
                columns={columns}
                data={allInvoices}
                title={Strings.MENU_PRODUCTS_TITLE}
                actions={actions}
                options={{
                    ...tableStyle,
                    selection: false
                }}
                isLoading={allInvoicesLoading}
            />

            <SmartDialog open={openDialog}
                handleClose={handleModalClose}
                modalHeader={modalHeader}
                modalContent={modalContent}
                modalActions={modalActions}
                modalFormResetKeys={modalFormResetKeys}
                modalTaskRunning={modalTaskRunning}
            />
        </Card>
    )
}

export default Invoices