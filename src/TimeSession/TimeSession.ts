import Project from "../Project/Project";
import Ticket from "../Ticket/Ticket";
import User from "../User/User";
import BaseModelInterface from "../BaseModelInterface";

var js2xmlparser = require("js2xmlparser");
const decamelizeKeys = require('decamelize-keys');

export default class TimeSession implements BaseModelInterface {
    private id: number;
    private project: Project;
    private summary: string;
    private minutes: number;
    private sessionDate: Date;
    private user: User|null;
    private ticket: Ticket|null;
    private updatedAt: Date;
    private createdAt: Date;
    /**
     * Constructor
     * @param int $id
     * @param Project\Project $project
     * @param string $summary
     * @param int $minutes
     * @param \DateTime $sessionDate
     * @param User\User $user
     * @param null|Ticket\Ticket $ticket
     * @param \DateTime $updatedAt
     * @param \DateTime $createdAt
     * @return void
     */
    constructor(
        id: number,
        project: Project,
        summary: string,
        minutes: number,
        sessionDate: Date,
        updatedAt: Date,
        createdAt: Date,
        user: User|null = null,
        ticket: Ticket|null = null,
    ) {
        this.id = id;
        this.project = project;
        this.summary = summary;
        this.minutes = minutes;
        this.sessionDate = sessionDate;
        this.user = user;
        this.ticket = ticket;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    convertToXml() {
        let timeSession = JSON.stringify(this);
        let sessionString = JSON.parse(timeSession);
        sessionString.project = this.project.getId();
        sessionString.userId = null;
        if(this.user) {
          sessionString.userId = this.user!.getId();
        }

        sessionString.ticketId = null;
        if(this.ticket) {
            sessionString.ticketId = this.ticket.getId();
        }

        delete sessionString.user;
        delete sessionString.ticket;

        sessionString = decamelizeKeys(sessionString, '-');

        return js2xmlparser.parse("time-session", sessionString);
    }

    /**
     * Gets Time Session id
     * @return int
     */
    getId() {
        return this.id;
    }
    /**
     * Gets Time Session Project
     * @return Project\Project
     */
    getProject() {
        return this.project;
    }
    /**
     * Gets Time Session summary
     * @return string
     */
    getSummary() {
        return this.summary;
    }
    /**
     * Gets Time Session minutes
     * @return int
     */
    getMinutes() {
        return this.minutes;
    }
    /**
     * Gets Time Session date
     * @return \DateTime
     */
    getSessionDate() {
        return this.sessionDate;
    }
    /**
     * Gets Time Session User
     * @return null|User\User
     */
    getUser() {
        return this.user;
    }
    /**
     * Gets Time Session Ticket
     * @return null|Ticket\Ticket
     */
    getTicket() {
        return this.ticket;
    }
    /**
     * Gets Time Session updated date
     * @return \DateTime
     */
    getUpdatedAt() {
        return this.updatedAt;
    }
    /**
     * Gets Time Session created date
     * @return \DateTime
     */
    getCreatedAt() {
        return this.createdAt;
    }
}
