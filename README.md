# Tasks
Simple task application replicating feature set and design of MacOS Reminders. Additional features replicating that which exist in Things3 and Todoist are planned in the coming future. This project is built with Javascript, React, and tailwindcss. All components are custom built with a few exceptions. 

This project is purely for learning purposes. 

The site is [currently hosted here](https://jorstad-tasks.netlify.app/)

There is a demo button on the sign up page to view the features without signing up for an account. Note that race conditions exist within the demo account.

This is not at a stable release, data stored in the datastore may be wiped at any moment to support new features in development.

## Features

- Create Lists to organize tasks
  - Editable list names and color
  - Filter tasks in the list view based on task due dates (today and the upcoming week)
- Create Sections within each list for further organization
  - Editable section names
  - Quick complete every task within a section
- Tasks
  - Editable task content and notes
  - Select due date inspired by Todoist date selector
- List views to view all tasks, all tasks due today, and all tasks due within the upcoming weeks

### Planned Improvements
- Tasks, Lists, and Sections will all become draggable for easy reorganization
- Shortcuts to create a quick add task gui and other features 
- Search all tasks and lists
- Nestable Lists and tasks

- Refactor to use Redux/MobX rather than prop drilling
- Add documentation/comments
- Separate some components out into multiple components
- Restructure component hierarchy


### Known bugs
- Completing all tasks within a section does not remove the section header
- Unnusually large memory consumption

## Installation
- Either visit the website linked above or clone the repo and run `npm run electron` after installing the dependencies with `npm install`
