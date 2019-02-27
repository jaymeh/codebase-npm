import BaseCollection from "../../BaseCollection";
import Category from "./Category";

export default class CategoryCollection extends BaseCollection {
    /**
     * Adds a category to the collection
     * @param Category $category
     * @return void
     */
    addTicketCategory(category: Category)
    {
        this.addItem(category);
    }
}
