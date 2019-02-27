import BaseCollection from "../../BaseCollection";
import Priority from "./Priority";

export default class PriorityCollection extends BaseCollection {
    /**
     * Adds a priority to the collection
     * @param Priority $priority
     * @return void
     */
    addTicketPriority(priority: Priority)
    {
        this.addItem(priority);
    }
}
