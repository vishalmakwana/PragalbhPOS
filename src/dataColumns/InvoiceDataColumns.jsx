import { Strings } from "@psoftcs"

export default function InvoiceDataColumns() {
    const columns = [
        { title: Strings.COLUMN_ID, field: 'id' },
        { title: Strings.COLUMN_INVOICE_ITEM_NAME, field: 'itemName' },
        { title: Strings.COLUMN_INVOICE_ITEM_QUANTITY, field: 'quantity' },
        { title: Strings.COLUMN_INVOICE_ITEM_PRICE, field: 'price' },
        { title: Strings.COLUMN_INVOICE_ITEM_TOTAL, field: 'total' }
    ]
    return { columns }
}

