import { Card } from '@mui/material'
import { SmartDialog, Strings, MaterialTable, useStyles, useItems, ProductsDataColumns } from '@psoftcs'
import React from 'react'

const Products = () => {
    const { columns } = ProductsDataColumns()
    const {
        openDialog,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        actions,
        AllProducts,
        allProductsRunning,
        handleModalClose
    } = useItems()
    const { materialTableStyle: tableStyle } = useStyles()
    return (
        <Card>
            <MaterialTable
                columns={columns}
                data={AllProducts}
                title={Strings.MENU_PRODUCTS_TITLE}
                actions={actions}
                options={{
                    ...tableStyle,
                    selection: false
                }}
                isLoading={allProductsRunning}
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

export default Products