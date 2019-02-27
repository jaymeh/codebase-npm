import BaseCollection from "../BaseCollection";
import Ticket from "./Ticket";

export default class TicketCollection extends BaseCollection {
    readonly STATUS_CLOSED = true;
    readonly STATUS_OPEN = false;
    /**
     * Adds a ticket to the collection
     * @param Ticket $ticket
     * @return void
     */
    addTicket(ticket: Ticket)
    {
        this.addItem(ticket);
    }
    /**
     * Returns a new collection of open tickets
     * @return Collection
     */
    getOpen()
    {
        return this.getByStatus(this.STATUS_OPEN);
    }
    /**
     * Returns a new collection of closed tickets
     * @return Collection
     */
    getClosed()
    {
        return this.getByStatus(this.STATUS_CLOSED);
    }
    /**
     * Returns a new collection of tickets that are open/closed
     * @param bool $returnClosed
     * @return type
     */
    private getByStatus(returnClosed: boolean)
    {
        let collection = new TicketCollection();
        let allTickets = this.all();
        allTickets.forEach((ticket: Ticket) => {
            let status = ticket.getStatus();
            if(status && status.isClosed() == returnClosed) {
                collection.addTicket(ticket);
            }
        });

        return collection;
    }
}
