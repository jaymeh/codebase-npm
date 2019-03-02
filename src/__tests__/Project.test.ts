import {Project} from '../index'

test('Project can be initialised', () => {
  let project = new Project(
    1,
    'Codebase',
    'active',
    'codebase',
    3,
    2,
    1
  );

  expect(project.getId()).toBe(1);
  expect(project.getName()).toBe('Codebase');
  expect(project.getStatus()).toBe('active');
  expect(project.getPermalink()).toBe('codebase');
  expect(project.getTotalTicketCount()).toBe(3);
  expect(project.getOpenTicketCount()).toBe(2);
  expect(project.getClosedTicketCount()).toBe(1);
});
