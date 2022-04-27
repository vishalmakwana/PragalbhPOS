import { Strings } from "@psoftcs"

export default function InvoicesDataColumns() {
    const columns = [
        { title: Strings.COLUMN_INVOICE_NO, field: 'id' },
        { title: Strings.COLUMN_INVOICE_DATE, field: 'invoiceDate' },
        { title: Strings.COLUMN_INVOICE_ITEM_TOTAL, field: 'total' },
    ]
    return { columns }
}