import { Strings } from "@psoftcs"

export default function HomeInvoiceDataColumns() {
    const columns = [
        { title: Strings.COLUMN_ID, field: 'id', editable: 'never' },
        { title: Strings.COLUMN_INVOICE_PRODUCT_NAME, field: 'productName', editable: 'never' },
        { title: Strings.COLUMN_INVOICE_ITEM_QUANTITY, field: 'quantity' },
        { title: Strings.COLUMN_INVOICE_ITEM_PRICE, field: 'price', editable: 'never' },
        { title: Strings.COLUMN_INVOICE_ITEM_TOTAL, field: 'total', editable: 'never' }
    ]
    return { columns }
}

