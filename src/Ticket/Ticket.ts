import Category from "./Category/Category";
import Priority from "./Priority/Priority";
import Status from "./Status/Status";
import Type from "./Type/Type";
import TimeSessionCollection from "../TimeSession/TimeSessionCollection";
import TimeSession from "../TimeSession/TimeSession";
import User from "../User/User";
import BaseModelInterface from "../BaseModelInterface";

var js2xmlparser = require("js2xmlparser");
const decamelizeKeys = require('decamelize-keys');

export default class Ticket implements BaseModelInterface {
    private id: number;
    private projectId: number;
    private summary: string;
    private updatedAt: Date;
    private createdAt: Date;
    private totalTimeSpent: number;
    private reporter: User|null;
    private assignee: User|null;
    private category: Category|null;
    private priority: Priority|null;
    private status: Status|null;
    private type: Type|null;
    private estimatedTime: number|null;
    private timeSessionCollection: TimeSessionCollection;

    constructor(
        id: number,
        projectId: number,
        summary: string,
        updatedAt: Date,
        createdAt: Date,
        totalTimeSpent: number,
        reporter: User|null = null,
        assignee: User|null = null,
        category: Category|null = null,
        priority: Priority|null = null,
        status: Status|null = null,
        type: Type|null = null,
        estimatedTime: number|null = null,
    ) {
        this.id = id;
        this.projectId = projectId;
        this.summary = summary;
        this.reporter = reporter;
        this.assignee = assignee;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.type = type;
        this.estimatedTime = estimatedTime;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.totalTimeSpent = totalTimeSpent;
        this.timeSessionCollection = new TimeSessionCollection();
    }

    convertToXml() {
      let ticket = JSON.stringify(this);
      let ticketString = JSON.parse(ticket);

      if(this.reporter) {
        ticketString.reporterId = this.reporter!.getId();
        ticketString.reporter = this.reporter.getFullName();
      }

      if(this.assignee) {
        ticketString.assigneeId = this.assignee!.getId();
        ticketString.assignee = this.assignee.getFullName();
      }

      if(this.category) {
        ticketString.categoryId = this.category.getId();
      }

      if(this.priority) {
        ticketString.priorityId = this.priority.getId();
      }

      if(this.status) {
        ticketString.statusId = this.status.getId();
      }

      delete ticketString.reporter;
      delete ticketString.assignee;
      delete ticketString.category;
      delete ticketString.priority;
      delete ticketString.status;

      ticketString = decamelizeKeys(ticketString, '-');

      return js2xmlparser.parse("ticket", ticketString);
  }

    /**
     * Gets Ticket id
     * @return number
     */
    getId() {
        return this.id;
    }
    /**
     * Gets Ticket Project ID
     * @return number
     */
    getProjectId() {
        return this.projectId;
    }
    /**
     * Gets Ticket summary
     * @return string
     */
    getSummary() {
        return this.summary;
    }
    /**
     * Gets Ticket Reporter
     * @return null|User
     */
    getReporter() {
        return this.reporter;
    }
    /**
     * Gets Ticket Assignee
     * @return null|User
     */
    getAssignee() {
        return this.assignee;
    }
    /**
     * Gets Ticket category
     * @return null|Category
     */
    getCategory() {
        return this.category;
    }
    /**
     * Gets Ticket priority
     * @return null|Priority\Priority
     */
    getPriority() {
        return this.priority;
    }
    /**
     * Gets Ticket status
     * @return null|Status\Status
     */
    getStatus() {
        return this.status;
    }
    /**
     * Gets Ticket type
     * @return null|Type\Type
     */
    getType() {
        return this.type;
    }
    /**
     * Gets Ticket estimated time
     * @return null|int
     */
    getEstimate() {
        return this.estimatedTime;
    }
    /**
     * Gets Ticket total time spent
     * @return int
     */
    getTotalTimeSpent() {
        return this.totalTimeSpent;
    }
    /**
     * Gets Ticket updated date
     * @return \DateTime
     */
    getUpdatedAt() {
        return this.updatedAt;
    }
    /**
     * Gets Ticket created date
     * @return \DateTime
     */
    getCreatedAt() {
        return this.createdAt;
    }
    /**
     * Returns time session collection
     * @return TimeSession\Collection
     */
    getTimeSessions()
    {
        return this.timeSessionCollection;
    }

    addTimeSession(timeSession: TimeSession)
    {
        this.timeSessionCollection.addTimeSession(timeSession);
        return this;
    }
}
