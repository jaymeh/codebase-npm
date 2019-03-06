import BaseCollection from '../BaseCollection';
import Project from './Project';

export default class ProjectCollection extends BaseCollection {
    public addProject(project: Project) {
      super.addItem(project)
    }

    public first(callback = null) {
      return super.first(callback);
    }

    public getActive() {
        const activeCollection = new ProjectCollection();
        const results = this.all();

        results.forEach((project: Project) => {
            if(project.getStatus() === 'active') {
                activeCollection.addProject(project);
            }
        })

        return activeCollection;
    }

    public searchByName(searchTerm: string, exactMatchOnly: boolean = false)
    {
        const searchResultCollection = new ProjectCollection();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = this.all();
        results.forEach((project: Project) => {
            const lowerCaseProjectName = project.getName().toLowerCase();
            if(
                (!exactMatchOnly && lowerCaseProjectName.indexOf(lowerCaseSearchTerm) !== -1) ||
                (exactMatchOnly && lowerCaseProjectName === lowerCaseSearchTerm)
            ) {
                searchResultCollection.addProject(project);
            }
        });

        return searchResultCollection;
    }
}
