import TicketCollection from "../Ticket/TicketCollection";
import TimeSessionCollection from "../TimeSession/TimeSessionCollection";
import CategoryCollection from "../Ticket/Category/CategoryCollection";
import PriorityCollection from "../Ticket/Priority/PriorityCollection";
import StatusCollection from "../Ticket/Status/StatusCollection";
import TypeCollection from "../Ticket/Type/TypeCollection";
import Ticket from '../Ticket/Ticket';
import BaseModelInterface from "../BaseModelInterface";

export default class Project implements BaseModelInterface {
    private id: number;
    private name: string;
    private status: string;
    private permalink: string;
    private totalTicketCount: number;
    private openTicketCount: number;
    private closedTicketCount: number;
    private ticketCategoryCollection: CategoryCollection;
    private ticketPriorityCollection: PriorityCollection;
    private ticketStatusCollection: StatusCollection;
    private ticketTypeCollection: TypeCollection;
    private ticketCollection: TicketCollection;
    private timeSessionCollection: TimeSessionCollection;

    constructor(
        id: number,
        name: string,
        status: string,
        permalink: string,
        totalTicketCount: number,
        openTicketCount: number,
        closedTicketCount: number
        ) {
            this.id = id;
            this.name = name;
            this.status = status;
            this.permalink = permalink;
            this.totalTicketCount = totalTicketCount;
            this.openTicketCount = openTicketCount;
            this.closedTicketCount = closedTicketCount;

            this.ticketCollection = new TicketCollection();
            this.timeSessionCollection = new TimeSessionCollection();
            this.ticketCategoryCollection = new CategoryCollection();
            this.ticketPriorityCollection = new PriorityCollection();
            this.ticketStatusCollection = new StatusCollection();
            this.ticketTypeCollection = new TypeCollection();
    }

    convertToXml(model: any) {

    }

    /**
     * Gets project id
     * @return number
     */
    public getId()
    {
        return this.id;
    }

    /**
     * Gets project name
     * @return string
     */
    public getName()
    {
        return this.name;
    }

    public getStatus() {
        return this.status;
    }

    public getPermalink() {
        return this.permalink;
    }

    public getTotalTicketCount() {
        return this.totalTicketCount;
    }

    public getOpenTicketCount() {
        return this.openTicketCount;
    }

    public getClosedTicketCount() {
        return this.closedTicketCount;
    }

    public getTickets() {
        return this.ticketCollection;
    }

    public addTicket(ticket: Ticket) {
        this.ticketCollection.addTicket(ticket);

        return this;
    }

    public getTimeSessions() {
        return this.timeSessionCollection;
    }

    // public addTimeSession(timeSession: TimeSession) {
    //     this.timeSessionCollection.addTimeSession(timeSession);

    //     return this;
    // }

    public getTicketCategories() {
        return this.ticketCategoryCollection;
    }

    public getTicketCategoryById(id: number) {
        return this.ticketCategoryCollection.searchById(id);
    }

    // public addTicketCategory(ticketCategory: Category) {
    //     this.ticketCategoryCollection.addticketCategory(ticketCategory);

    //     return this;
    // }

    public getTicketPriorities() {
        return this.ticketPriorityCollection;
    }

    public getTicketPriorityById(id: number) {
        return this.ticketPriorityCollection.searchById(id);
    }

    // public addTicketPriority(ticketPriority: Priority) {
    //     this.ticketPriorityCollection.addTicketPriority(ticketPriority);

    //     return this;
    // }

    public getTicketStatuses() {
        return this.ticketStatusCollection;
    }

    public getTicketStatusById(id: number) {
        return this.ticketStatusCollection.searchById(id);
    }

    // public addTicketStatus(ticketStatus: Status) {
    //     this.ticketStatusCollection.addTicketStatus(ticketStatus);
    // }

    public getTicketTypes() {
        return this.ticketTypeCollection;
    }

    public getTicketTypeById(id: number) {
        return this.ticketTypeCollection.searchById(id);
    }

    // public addTicketType(ticketType: Type) {
    //     return this.ticketTypeCollection.addTicketType(ticketType);
    // }
}
