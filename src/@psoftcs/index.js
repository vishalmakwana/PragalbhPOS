//#region utils
export { ContextProvider as Provider, Context } from 'utils/context'
export { Strings } from 'utils/Strings'
export { appSettings } from 'utils/appSettings'
export { getDefaultValueArray, validator, useMenus, groupBy, reorderWidget, copyWidget, weekDays, getRefactoredDates, getActualDates } from 'utils/helper'
//#endregion

//#region Packages
// export { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
export { default as PropTypes } from "prop-types"
export { styled } from '@mui/material/styles'
export { TreeView, TreeItem, TabList, TabPanel, TabContext, LocalizationProvider, TimePicker, LoadingButton, MobileDateRangePicker } from '@mui/lab'
export { default as AdapterMoment } from '@mui/lab/AdapterMoment'
export { treeItemClasses, useTreeItem } from '@mui/lab/TreeItem'
export { default as MaterialTable } from '@material-table/core'
export { default as useAxios, configure } from 'axios-hooks'
export { default as axios } from 'axios'
export { ConfirmProvider, useConfirm } from 'material-ui-confirm'
export { format } from 'react-string-format'
export { default as Counter } from 'react-mui-counter'
export { default as moment } from 'moment'
export { v4 as uuidv4 } from 'uuid'
//#endregion:

//#region JsonData //// firebase
export { default as firebaseConfig } from 'utils/config'
//#endregion

//#region Hooks
export { default as useStyles } from 'hooks/useStyles'
export { default as useStartup } from 'hooks/useStartup'
export { default as useLocalStorage } from 'hooks/useLocalStorage'
export { default as useFlyoutMenus } from 'hooks/modules/shell/useFlyoutMenus'
export { default as useMenuState } from 'hooks/modules/shell/useMenuState'
export { default as useNavTabs } from 'hooks/modules/shell/useNavTabs'
export { default as useTableIcons } from 'hooks/useTableIcons'
export { SearchBar } from 'components/SearchBar'
export { SearchBox } from 'components/SearchBox'
export { default as useHome } from 'hooks/modules/Home/useHome'
export { default as useCategories } from 'hooks/modules/categories/useCategories'
export { default as useInvoices } from 'hooks/modules/Invoices/useInvoices'
export { default as useItems } from 'hooks/modules/items/useProducts'
export { default as useLogin } from 'hooks/auth/useLogin'
export { default as useRegister } from 'hooks/auth/useRegister'

//#endregion

//#region Components
export { default as Switch } from 'components/Switch'
export { default as Themeify } from 'components/Themeify'
export { StyledTreeItem } from 'components/StyledTreeItem'
export { default as SmartDialog } from 'components/SmartDialog'
export { default as SmartContent } from 'components/SmartContent'
export { default as SmartToolbar } from 'components/SmartToolbar'
export { default as SmartLayout } from 'components/SmartLayout'
export { default as Column } from 'components/Column'
export { default as Widget } from 'components/Widget'
export { default as Startup } from 'components/Startup'
export { default as AppShell } from 'components/modules/shell/AppShell'
export { default as Header } from 'components/modules/shell/Header'
export { default as NavProfile } from 'components/modules/shell/NavProfile'
export { default as NavTabs } from 'components/modules/shell/NavTabs'
export { default as Flyout } from 'components/modules/shell/Flyout'
export { default as Main } from 'components/modules/shell/Main'
export { default as SmartCalendar } from 'components/SmartCalendar'
export { default as Home } from 'components/modules/Home/Home'
export { default as Products } from 'components/modules/Products/Products'
export { default as Invoices } from 'components/modules/Invoices/Invoices'
export { default as Categories } from 'components/modules/categories/Categories'
export { default as Login } from 'components/auth/Login'
export { default as Register } from 'components/auth/Register'
//#endregion

//#region DataColumns
// export { default as invoiceDataColumns } from 'dataColumns/InvoiceDataColumns'
export { default as HomeInvoiceDataColumns } from 'dataColumns/HomeInvoiceDataColumns'
export { default as CategoriesDataColumns } from 'dataColumns/CategoriesDataColumns'
export { default as InvoicesDataColumns } from 'dataColumns/InvoicesDataColumns'
export { default as ProductsDataColumns } from 'dataColumns/ProductsDataColumns'
export { default as HomeProductsDataColumns } from 'dataColumns/HomeProductsDataColumns'
//#endregion

