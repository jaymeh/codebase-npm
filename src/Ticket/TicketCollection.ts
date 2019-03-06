import BaseCollection from "../BaseCollection";
import Ticket from "./Ticket";

export default class TicketCollection extends BaseCollection {
    private readonly STATUS_CLOSED = true;
    private readonly STATUS_OPEN = false;

    /**
     * Adds a ticket to the collection
     * @param Ticket $ticket
     * @return void
     */
    public addTicket(ticket: Ticket)
    {
        this.addItem(ticket);
    }
    /**
     * Returns a new collection of open tickets
     * @return Collection
     */
    public getOpen()
    {
        return this.getByStatus(this.STATUS_OPEN);
    }
    /**
     * Returns a new collection of closed tickets
     * @return Collection
     */
    public getClosed()
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
        const collection = new TicketCollection();
        const allTickets = this.all();
        allTickets.forEach((ticket: Ticket) => {
            const status = ticket.getStatus();
            if(status && status.isClosed() === returnClosed) {
                collection.addTicket(ticket);
            }
        });

        return collection;
    }
}
