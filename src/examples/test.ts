import ProjectCollection from '../Project/ProjectCollection';
import Project from '../Project/Project';

let project = new Project(1, 'name', 'active', 'link', 1, 0, 1);
let collection = new ProjectCollection();

collection.addItem(project);

collection.getActive();
