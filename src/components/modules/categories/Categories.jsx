import { Card } from '@mui/material'
import { CategoriesDataColumns, SmartDialog, Strings, useCategories, MaterialTable, useStyles } from '@psoftcs'
import React from 'react'

const Categories = () => {
    const { columns } = CategoriesDataColumns()
    const {
        openDialog,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        actions,
        AllCategories,
        allCategoriesLoading,
        handleModalClose
    } = useCategories()
    const { materialTableStyle: tableStyle } = useStyles()
    return (
        <Card>
            <MaterialTable
                columns={columns}
                data={AllCategories}
                title={Strings.MENU_CATEGORIES_TITLE}
                actions={actions}
                options={{
                    ...tableStyle,
                    selection: false
                }}
                isLoading={allCategoriesLoading}
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

export default Categories