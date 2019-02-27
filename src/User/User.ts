import TimeSessionCollection from "../TimeSession/TimeSessionCollection";
import TimeSession from "../TimeSession/TimeSession";

export default class User {
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
    /**
     * Gets user id
     * @return int
     */
    getId()
    {
        return this.id;
    }
    /**
     * Gets username
     * @return null|string
     */
    getUsername()
    {
        return this.username;
    }
    /**
     * Gets company
     * @return null|string
     */
    getCompany()
    {
        return this.company;
    }
    /**
     * Gets email address
     * @return null|string
     */
    getEmailAddress()
    {
        return this.emailAddress;
    }
    /**
     * Gets first name
     * @return null|string
     */
    getFirstName()
    {
        return this.firstName;
    }
    /**
     * Gets last name
     * @return null|string
     */
    getLastName()
    {
        return this.lastName;
    }
    /**
     * Gets gravatar url
     * @return null|string
     */
    getGravatarUrl()
    {
        return this.gravatarUrl;
    }
    /**
     * Gets enabled
     * @return bool
     */
    getEnabled()
    {
        return this.enabled;
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
