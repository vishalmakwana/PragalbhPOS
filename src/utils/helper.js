import {
    Dashboard,
    Schedule,
    SettingsApplications,
    ViewList,
    Help
} from "@mui/icons-material"
import { Strings, appSettings, uuidv4, moment } from "@psoftcs"

export const getDefaultValueArray = (options, data) => {
    if (!Array.isArray(data)) return []
    if (data.length === 0) return []
    return data.map(id => options.find(item => item.id === id))
}

export const validator = {
    emailValidator: {
        required: { value: true, message: "Email is required" },
        pattern: { value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/i, message: "Email is invalid" }
    },
    requiredValidator: (title) => ({
        required: { value: true, message: `${title} is required!` }
    }),
    timeValidator: {
        required: { value: true, message: "Time is required" },
        pattern: { value: /^([01]\d|2[0-3]):?([0-5]\d)$/g, message: "Time is invalid" }
    },
    hourValidator: {
        required: { value: true, message: "Time is required" },
        pattern: { value: /^([0]{0,1}[1-9]{1}|[1]\d|[2][0-3])$/g, message: "Interval is invalid. Must be a whole number between 1 to 23" }
    }
}

export const useMenus = () => {
    const { home, categories, products, invoices } = appSettings.routeConfig
    const {
        MENU_DASHBOARD_TITLE,
        MENU_HOME_TITLE,
        MENU_PRODUCTS_TITLE,
        MENU_CATEGORIES_TITLE,
        MENU_INVOICES_TITLE

    } = Strings

    const menuItems = [
        {
            id: "dashboard",
            labelText: MENU_DASHBOARD_TITLE,
            isVisible: true,
            icon: Dashboard,
            children: [
                {
                    id: "dashboard_home",
                    labelText: MENU_HOME_TITLE,
                    isVisible: true,
                    navigate: home,
                },
                {
                    id: "dashboard_categories",
                    labelText: MENU_CATEGORIES_TITLE,
                    isVisible: true,
                    navigate: categories,
                },
                {
                    id: "dashboard_products",
                    labelText: MENU_PRODUCTS_TITLE,
                    isVisible: true,
                    navigate: products,
                },
                {
                    id: "dashboard_invoices",
                    labelText: MENU_INVOICES_TITLE,
                    isVisible: true,
                    navigate: invoices,
                },
            ],
        },

    ]
    return menuItems
}

export const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
    }, {})
}

// a little function to help us with reordering the result
export const reorderWidget = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}
/**
 * Moves an item from one list to another list.
 */
export const copyWidget = (jobID, source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const item = sourceClone[droppableSource.index]
    if (item.category === 'single' && destClone.some(widget => widget.title === item.title)) return destClone
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4(), fileProcessingTemplateId: Number(jobID) })
    return destClone
};

export const weekDays = [
    {
        text: "Select Weekday", val: 0,
    },
    {
        text: "Monday", val: 1,
    },
    {
        text: "Tuesday", val: 2,
    },
    {
        text: "Wednesday", val: 3,
    },

    {
        text: "Thursday", val: 4,
    },
    {
        text: "Friday", val: 5,
    },
    {
        text: "Saturday", val: 6,
    },
    {
        text: "Sunday", val: 7,
    }
]

export const getActualDates = (dates) => {
    return dates?.map((item) => ({
        startDate: moment(item.startDate).unix(),
        endDate: moment(item.endDate).unix()
    })) ?? []
}
export const getRefactoredDates = (dates, color) => {
    return dates?.map((item) => ({
        startDate: new Date(moment.unix(item.startDate).format("llll")),
        endDate: new Date(moment.unix(item.endDate).format("llll")),
        color: color
    })) ?? []
}