import CodebaseHQConnector from "./CodebaseHQConnector";
import ProjectCollection from "./Project/ProjectCollection";
import UserCollection from "./User/UserCollection";
import Project from "./Project/Project";
import Category from "./Ticket/Category/Category";
import User from "./User/User";
import Priority from "./Ticket/Priority/Priority";
import Status from "./Ticket/Status/Status";
import Type from "./Ticket/Type/Type";
import Period from "./TimeSession/Period/Period";
import { TimeSession } from ".";
import Ticket from "./Ticket/Ticket";
const { forEach } = require('p-iteration');

export class CodebaseHQAccount extends CodebaseHQConnector {
  private projectCollection: ProjectCollection;
  private userCollection: UserCollection;

  constructor(apiUser: string, apiKey: string, apiHostname: string) {
      super(apiUser, apiKey, apiHostname);

      this.projectCollection = new ProjectCollection();
      this.userCollection = new UserCollection();
  }

  /**
   * Returns a collection of all projects
   * @return Project\Collection
   */
  public async projects(): Promise<ProjectCollection> {
    const { projects } = await this.get('/projects');

    if (projects) {
      await forEach(projects.project, async (project: any) => {
        const ProjectItem = new Project(
          project['project-id'],
          project.name,
          project.status,
          project.permalink,
          project['total-tickets'],
          project['open-tickets'],
          project['closed-tickets'],
        );

        await this.projectCollection.addProject(ProjectItem);
      });
    }

      return this.projectCollection;
  }

  /**
   * Returns a collection of all projects
   * @param string $permalink
   * @return Project\Project
   */
  public async project(permalink: string) : Promise<Project> {
    const {project} = await this.get(`/${permalink}`);

    const projectItem = new Project(
      project['project-id'],
      project.name,
      project.status,
      project.permalink,
      project['total-tickets'],
      project['open-tickets'],
      project['closed-tickets']
    );

    await this.categories(projectItem);
    await this.priorities(projectItem);
    await this.statuses(projectItem);
    await this.types(projectItem);

    return projectItem;
  }

  /**
   * Returns a collection of all users
   * @return User\Collection
   */
  public async users(): Promise<UserCollection> {
    const {users} = await this.get('/users');

    if(!users) {
      return this.userCollection;
    }

    await forEach(users.user, async (user: any) => {
      const userItem = new User(
        user.id,
        user.enabled ? true : false,
        user.username ? user.username : null,
        user.company ? user.company : null,
        user['email-address'] ? user['email-address'] : null,
        user['first-name'] ? user['first-name'] : null,
        user['last-name'] ? user['last-name'] : null,
        user['gravatar-url'] ? user['gravatar-url'] : null,
      );
      this.userCollection.addUser(
        userItem
      )
    })

    return this.userCollection;
  }

  /**
   * Populates categories for a project
   * @param Project\Project &$project
   * @return bool
   */
  public async categories(project: Project) : Promise<boolean>
  {
    const url = `/${project.getPermalink()}/tickets/categories`;

    let categories = await this.get(url);

    if(!categories) {
      return false;
    }

    categories = categories['ticketing-categories'];

    if(!categories['ticketing-category'] || typeof categories['ticketing-category'] !== 'object') {
      return false;
    }

    categories['ticketing-category'].forEach((category: any) => {
      if(!category.id) {
        return;
      }

      const categoryItem = new Category(category.id, category.name);

      project.addTicketCategory(categoryItem);
    })

    return true;
  }

  /**
   * Populates tickets on the given project
   * @param Project\Project &$project
   * @param int $pageNo
   * @return bool
   */
  public async tickets(project: Project, pageNo: number = 1) : Promise<boolean>
  {
    const url = `/${project.getPermalink()}/tickets?page=${pageNo}`;

    const {tickets} = await this.get(url);

    if(!tickets) {
      return false;
    }

    if(!tickets.ticket) {
      return false;
    }

    await forEach(tickets.ticket, (ticket: any) => {
      if(!ticket['ticket-id'] || typeof ticket !== 'object') {
        return;
      }

      const assignee = ticket['assignee-id'] ? this.userCollection.searchById(ticket['assignee-id']) : null;
      const reporter = ticket['reporter-id'] ? this.userCollection.searchById(ticket['reporter-id']) : null;
      const category = project.getTicketCategoryById(ticket['category-id']);
      const priority = project.getTicketPriorityById(ticket['priority-id']);
      const status = project.getTicketStatusById(ticket['status-id']);
      const type = project.getTicketTypeById(ticket['type-id']);
      const estimatedTime = ticket['estimated-time'] && typeof ticket['estimated-time'] === 'string' ? ticket['estimated-time'] : null;

      project.addTicket(
        new Ticket(
            ticket['ticket-id'],
            ticket['project-id'],
            ticket.summary,
            new Date(ticket['updated-at']),
            new Date(ticket['created-at']),
            ticket['total-time-spent'],
            reporter,
            assignee,
            category,
            priority,
            status,
            type,
            estimatedTime
        )
      )
    })

    return true;
  }

  /**
   * Populates time sessions on the given project
   * @param Project\Project &$project
   * @param Period\Period $period
   * @return bool
   */
  public async times(project: Project, period: Period) : Promise<boolean>
  {
    const url = `/${project.getPermalink()}/time_sessions${period.getPeriod()}`;

    let timeSessions = await this.get(url);
    timeSessions = timeSessions['time-sessions'];

    if(!timeSessions) {
      return false;
    }

    if (!timeSessions['time-session']) {
        return false;
    }

    if(typeof timeSessions['time-session'].length === 'undefined') {
      let session = timeSessions['time-session'];
      timeSessions['time-session'] = [session];
    }

    timeSessions['time-session'].forEach((timeSession: any) => {
      if (!timeSession.id || typeof timeSession !== 'object') {
        return
      }

      const user = timeSession['user-id'] ? this.userCollection.searchById(timeSession['user-id']) : null;
      const ticket = (!timeSession['ticket-id']) || typeof timeSession['ticket-id'] === 'object' ? null : project.getTickets().searchById(timeSession['ticket-id']);

      const newTimeSession = new TimeSession(
        timeSession.id,
        project,
        timeSession.summary,
        timeSession.minutes,
        new Date(timeSession['session-date']),
        new Date(timeSession['created-at']),
        new Date(timeSession['updated-at']),
        user,
        ticket
      );

      project.addTimeSession(newTimeSession);

      if (ticket) {
          ticket.addTimeSession(newTimeSession);
      }

      if (user) {
          user.addTimeSession(newTimeSession);
      }
    })

    return true;
  }

  /**
   * Populates priorities for a project
   * @param Project\Project &$project
   * @return bool
   */
  public async priorities(project: Project): Promise<boolean> {
    const url = `/${project.getPermalink()}/tickets/priorities`;

    let priorities = await this.get(url);

    if(!priorities) {
      return false;
    }

    priorities = priorities['ticketing-priorities'];

    if (!priorities['ticketing-priority'] || typeof priorities['ticketing-priority'] !== 'object') {
        return false;
    }

    priorities['ticketing-priority'].forEach((priority: any) => {
      if(!priority.id) {
        return;
      }

      project.addTicketPriority(
        new Priority(
          priority.id,
          priority.name ? priority.name : null,
          priority.colour ? priority.colour : null,
          priority.default ? priority.default : null,
          priority.position ? priority.position : null
        )
      );
    })

    return true;
  }

  /**
   * Populates statuses for a project
   * @param Project\Project &$project
   * @return bool
   */
  public async statuses(project: Project): Promise<boolean> {
    const url = `/${project.getPermalink()}/tickets/statuses`;

    let statuses = await this.get(url);

    if(!statuses) {
      return false;
    }

    statuses = statuses['ticketing-statuses']

    if (!statuses['ticketing-status'] || typeof statuses['ticketing-status'] !== 'object') {
          return false;
    }

    statuses['ticketing-status'].forEach((status: any) => {
      if (typeof status !== 'object' || !status.id) {
        return;
      }

      project.addTicketStatus(
        new Status(
          status.id,
          status.name ? status.name : null,
          status.colour ? status.colour : null,
          status['treat-as-closed'] ? true : null,
          status.order ? status.order : null
        )
      );
    })

    return true;
  }


  /**
   * Populates types for a project
   * @param Project\Project &$project
   * @return bool
   */
  public async types(project: Project): Promise<boolean> {
    const url = `/${project.getPermalink()}/tickets/types`;

    let types = await this.get(url);

    if(!types) {
      return false;
    }

    types = types['ticketing-types'];

    if (!types['ticketing-type'] || typeof types['ticketing-type'] !== 'object') {
        return false;
    }

    types['ticketing-type'].forEach((type: any) => {
      if (!type.id || typeof type !== 'object') {
        return;
      }

      project.addTicketType(
        new Type(
          type.id,
          type.name ? type.name : null
        )
      );
    })

    return true;
  }
}
