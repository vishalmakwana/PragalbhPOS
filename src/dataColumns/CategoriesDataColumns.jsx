import { Strings } from "@psoftcs"

export default function CategoriesDataColumns() {
    const columns = [
        { title: Strings.COLUMN_ID, field: 'id' },
        { title: Strings.MENU_CATEGORIES_TITLE, field: 'categoryName' },
    ]
    return { columns }
}