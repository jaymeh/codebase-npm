// import CodebaseHQAccount as codebase from './CodebaseHQAccount';

import CodebaseHQAccount from "./CodebaseHQAccount";
import TimeSession from './TimeSession/TimeSession';
import Project from './Project/Project';
import User from './User/User';
import Ticket from './Ticket/Ticket';

import All from './TimeSession/Period/All';
import Day from './TimeSession/Period/Day';
import Week from './TimeSession/Period/Week';
import Month from './TimeSession/Period/Month';

const codebase = CodebaseHQAccount;

export {
    TimeSession,
    Project,
    User,
    Ticket,
    All,
    Day,
    Week,
    Month
}

export default codebase;
