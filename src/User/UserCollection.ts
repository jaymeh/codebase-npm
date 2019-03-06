import User from "./User";
import BaseCollection from "../BaseCollection";

export default class UserCollection extends BaseCollection  {
    /**
     * Adds a user to the collection
     * @param User $user
     * @return void
     */
    public addUser(user: User) {
      super.addItem(user);
    }
    /**
     * Returns a new collection of active users
     * @return Collection
     */
    public getActive() {
        const activeCollection = new UserCollection();
        const users = this.all();

        users.forEach((user: User) => {
            if(user.getEnabled()) {
                activeCollection.addUser(user);
            }
        })

        return activeCollection;
    }
    /**
     * Searches for users by company name
     * @param string searchTerm
     * @return Collection
     */
    public searchByCompany( searchTerm: string, exactMatchOnly: boolean = false) {
        const searchResultCollection = new UserCollection();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = this.all();

        results.forEach((user: User) => {
            const lowerCaseCompany = user.getCompany()!.toLowerCase();
            if(
                (!exactMatchOnly && lowerCaseCompany.indexOf(lowerCaseSearchTerm) !== -1) ||
                (exactMatchOnly && lowerCaseCompany === lowerCaseSearchTerm)
            ) {
                searchResultCollection.addUser(user);
            }
        })

        return searchResultCollection;
    }
    /**
     * Searches for users by username
     * @param string searchTerm
     * @return Collection
     */
    public searchByUsername( searchTerm: string, exactMatchOnly: boolean = false) {
        const searchResultCollection = new UserCollection();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = this.all();

        results.forEach((user: User) => {
            const lowerCaseUsername = user.getUsername()!.toLowerCase();
            if(
                (!exactMatchOnly && lowerCaseUsername.indexOf(lowerCaseSearchTerm) !== -1) ||
                (exactMatchOnly && lowerCaseUsername === lowerCaseSearchTerm)
            ) {
                searchResultCollection.addUser(user);
            }
        })

        return searchResultCollection;
    }
}
