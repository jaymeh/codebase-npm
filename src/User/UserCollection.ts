import User from "./User";
import BaseCollection from "../BaseCollection";

export default class UserCollection extends BaseCollection  {
    /**
     * Adds a user to the collection
     * @param User $user
     * @return void
     */
    addUser(user: User) {
      super.addItem(user);
    }
    /**
     * Returns a new collection of active users
     * @return Collection
     */
    getActive() {
        let activeCollection = new UserCollection();

        let users = this.all();

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
    searchByCompany( searchTerm: string, exactMatchOnly: boolean = false) {
        let searchResultCollection = new UserCollection();
        let lowerCaseSearchTerm = searchTerm.toLowerCase();

        let results = this.all();

        results.forEach((user: User) => {
            let lowerCaseCompany = user.getCompany()!.toLowerCase();
            if(
                (!exactMatchOnly && lowerCaseCompany.indexOf(lowerCaseSearchTerm) !== -1) ||
                (exactMatchOnly && lowerCaseCompany == lowerCaseSearchTerm)
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
    searchByUsername( searchTerm: string, exactMatchOnly: boolean = false) {
        let searchResultCollection = new UserCollection();
        let lowerCaseSearchTerm = searchTerm.toLowerCase();

        let results = this.all();

        results.forEach((user: User) => {
            let lowerCaseUsername = user.getUsername()!.toLowerCase();
            if(
                (!exactMatchOnly && lowerCaseUsername.indexOf(lowerCaseSearchTerm) !== -1) ||
                (exactMatchOnly && lowerCaseUsername == lowerCaseSearchTerm)
            ) {
                searchResultCollection.addUser(user);
            }
        })

        return searchResultCollection;
    }
}
