import { Strings } from "@psoftcs"

export default function HomeProductsDataColumns() {
    const columns = [
        { title: Strings.COLUMN_ID, field: 'id' },
        { title: Strings.MENU_CATEGORIES_TITLE, field: 'categoryId' },
        { title: Strings.COLUMN_PRODUCT_NAME, field: 'productName' },
        { title: Strings.COLUMN_INVOICE_ITEM_PRICE, field: 'price' },
    ]
    return { columns }
}