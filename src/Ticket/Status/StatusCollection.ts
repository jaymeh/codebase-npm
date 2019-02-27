import BaseCollection from "../../BaseCollection";
import Status from "./Status";

export default class StatusCollection extends BaseCollection {
    /**
     * Adds a ticket status to the collection
     * @param Status $status
     * @return void
     */
    addTicketStatus(status: Status)
    {
        this.addItem(status);
    }
}
