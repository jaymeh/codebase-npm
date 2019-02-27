import BaseCollection from '../BaseCollection';
import Project from './Project';

export default class ProjectCollection extends BaseCollection {
    public addProject(project: Project) {
        super.addItem(project)
    }

    /**
     * Returns a new collection of active projects
     * @return Collection
     */
    public getActive() {
        let activeCollection = new ProjectCollection();

        let results = super.all();

        console.log(results);
        // $activeCollection = new ProjectCollection();
        // foreach(super.all() as project) {
        //     if ($project->getStatus() == 'active') {
        //         $activeCollection->addProject($project);
        //     }
        // }
        // return $activeCollection;
    }
}
