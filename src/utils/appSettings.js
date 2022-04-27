import { indigo, red, amber, lightBlue } from '@mui/material/colors'
const appSettings = {
    appLogo: `${process.env.PUBLIC_URL}/img/logo.svg`,
    // oktaConfig: {
    //     clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    //     issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    //     redirectUri: `${process.env.REACT_APP_BASE_URL}/login/callback`, // this makes it so redirects to login if not logged in for secure routes
    //     scopes: ['openid', 'profile', 'email'],
    //     pkce: JSON.parse(`${process.env.REACT_APP_OKTA_ENABLE_PKCE}`),
    //     disableHttpsCheck: JSON.parse(`${process.env.REACT_APP_OKTA_DISABLE_HTTPS_CHECK}`),
    // },
    axiosConfig: {
        baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
        validateStatus: false
    },
    routeConfig: {
        login: "/Login",
        register: "/Register",
        home: "/Home",
        categories: "/categories",
        products: "/products",
        invoices: "/invoices",
    },
    endpointConfig: {
        categories: {
            getAll: '/categories',
            addCategories: '/categories',
            updateCategories: '/categories/{0}',
            getCategoriesById: '/categories/{0}',
            deleteCategoriesById: '/categories/{0}',
        },
        products: {
            getAll: '/products',
            addProducts: '/products',
            updateProducts: '/products/{0}',
            getProductsById: '/products/{0}',
            deleteProductsById: '/products/{0}',
        },
        invoices: {
            getAll: '/invoices',
            addInvoices: '/invoices',
            updateInvoices: '/invoices/{0}',
            getInvoicesById: '/invoices/{0}',
            deleteInvoicesById: '/invoices/{0}',
        },
        authUsers: {
            getAll: '/users',
        }

    },
    fieldGroupTypes: {
        array: 'array',
        nullable: 'nullable',
        boolean: 'boolean'
    },
    fieldTypes: {
        component: { type: 'component' },
        table: { type: 'table' },
        select: { type: 'select' },
        multiSelect: { type: 'select-multiple', group: 'array' },
        text: { type: 'text' },
        password: { type: 'password' },
        email: { type: 'email' },
        numeric: { type: 'numeric', group: 'nullable' },
        switch: { type: 'switch', group: 'boolean' },
        checkbox: { type: 'checkbox', group: 'boolean' },
        radio: { type: 'radio' },
        radioGroup: { type: 'radioGroup' },
        textArea: { type: 'textarea' },
        autoComplete: { type: 'autocomplete' },
        autoCompleteMultiple: { type: 'autocomplete-multiple', group: 'array' },
        date: { type: 'date', group: 'nullable' },
        time: { type: 'time', group: 'nullable' },
        dateTime: { type: 'datetime', group: 'nullable' },
        image: { type: 'image', group: 'array' },
        dateRange: { type: 'dateRange', group: 'array' },
        label: { type: 'label' },
        counter: { type: 'counter', group: 'nullable' },
        aceEditor: { type: 'aceEditor' },
    },
    statusType: {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning',
        default: 'info',
    },
    defaultDuration: 6000,
    defaultSnackContent: {
        severity: 'info',
        msg: '',
        vertical: "bottom",
        horizontal: "left"
    },
    documentsURL: `${process.env.REACT_APP_BASE_URL}/documents/`,
    calendarConfig: {
        colors: {
            Selected: indigo[500],
            Executed: red[500],
            Holiday: amber[500],
            Weekend: lightBlue[500]
        },
        type: {
            daily: { id: 0, title: 'Daily' },
            weekly: { id: 1, title: 'Weekly' },
            monthly: { id: 2, title: 'Monthly' },
        }
    }
}
export { appSettings }