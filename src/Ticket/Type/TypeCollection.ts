import BaseCollection from "../../BaseCollection";
import Type from "./Type";

export default class TypeCollection extends BaseCollection {
    /**
     * Adds a ticket type to the collection
     * @param Type $status
     * @return void
     */
    addTicketType(type: Type) {
        this.addItem(type);
    }
}
