import TimeSessionCollection from "../TimeSession/TimeSessionCollection";
import TimeSession from "../TimeSession/TimeSession";
import BaseModelInterface from "../BaseModelInterface";

const js2xmlparser = require("js2xmlparser");
const decamelizeKeys = require('decamelize-keys');

export default class User implements BaseModelInterface {
    private id: number;
    private username: string|null;
    private company: string|null;
    private emailAddress: string|null;
    private firstName: string|null;
    private lastName: string|null;
    private gravatarUrl: string|null;
    private enabled: boolean;
    private timeSessionCollection: TimeSessionCollection;
    /**
     * Constructor
     * @param int $id
     * @param string $username
     * @param string $company
     * @param string $emailAddress
     * @param string $firstName
     * @param string $lastName
     * @param string $gravatarUrl
     * @param bool $enabled
     * @return void
     */
    constructor(
        id: number,
        enabled: boolean,
        username: string|null = null,
        company: string|null = null,
        emailAddress: string|null = null,
        firstName: string|null = null,
        lastName: string|null = null,
        gravatarUrl: string|null = null
    ) {
        this.id = id;
        this.username = username;
        this.company = company;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gravatarUrl = gravatarUrl;
        this.enabled = enabled;
        this.timeSessionCollection = new TimeSessionCollection();
    }

    public convertToXml() {
      const user = JSON.stringify(this);
      let userString = JSON.parse(user);

      delete userString.timeSessionCollection;

      userString = decamelizeKeys(userString, '-');

      return js2xmlparser.parse("user", userString);
  }

    /**
     * Gets user id
     * @return int
     */
    public getId()
    {
        return this.id;
    }
    /**
     * Gets username
     * @return null|string
     */
    public getUsername()
    {
        return this.username;
    }
    /**
     * Gets company
     * @return null|string
     */
    public getCompany()
    {
        return this.company;
    }
    /**
     * Gets email address
     * @return null|string
     */
    public getEmailAddress()
    {
        return this.emailAddress;
    }
    /**
     * Gets first name
     * @return null|string
     */
    public getFirstName()
    {
        return this.firstName;
    }
    /**
     * Gets last name
     * @return null|string
     */
    public getLastName()
    {
        return this.lastName;
    }

    public getFullName() {
      return `${this.getFirstName()} ${this.getLastName()}`;
    }
    /**
     * Gets gravatar url
     * @return null|string
     */
    public getGravatarUrl()
    {
        return this.gravatarUrl;
    }
    /**
     * Gets enabled
     * @return bool
     */
    public getEnabled()
    {
        return this.enabled;
    }
    /**
     * Returns time session collection
     * @return TimeSession\Collection
     */
    public getTimeSessions()
    {
        return this.timeSessionCollection;
    }

    public addTimeSession(timeSession: TimeSession)
    {
        this.timeSessionCollection.addTimeSession(timeSession);
        return this;
    }
}
