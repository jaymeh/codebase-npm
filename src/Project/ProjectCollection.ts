import BaseCollection from '../BaseCollection';
import Project from './Project';

export default class ProjectCollection extends BaseCollection {
    addProject(project: Project) {
        super.addItem(project)
    }

    getActive() {
        let activeCollection = new ProjectCollection();
        let results = this.all();

        results.forEach((project: Project) => {
            if(project.getStatus() == 'active') {
                activeCollection.addProject(project);
            }
        })

        return activeCollection;
    }

    searchByName(searchTerm: string, exactMatchOnly: boolean = false)
    {
        let searchResultCollection = new ProjectCollection();
        let lowerCaseSearchTerm = searchTerm.toLowerCase();
        let results = this.all();
        results.forEach((project: Project) => {
            let lowerCaseProjectName = project.getName().toLowerCase();
            if(
                (!exactMatchOnly && lowerCaseProjectName.indexOf(lowerCaseSearchTerm) !== -1) ||
                (exactMatchOnly && lowerCaseProjectName == lowerCaseSearchTerm)
            ) {
                searchResultCollection.addProject(project);
            }
        });

        return searchResultCollection;
    }
}
