# User Stories

## User

### Sign Up


- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the /signup page:
    - I would like to be able to enter my first name, last name, email, zip code, profile picture, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on the /login page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the lob-up form.
      - So that I can seamlessly access the site's functionality
    - When I enter invalid data on the log-up form:
      - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the /signup and /login pages to allow me to visit the site as a guest without signing up or logging in.
  - When I'm on either the /signup or /login pages:
    - I can click on a Demo User button to log me in and allow me access as a normal user.
      - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  - While on any page of the site:
    - I can log out of my account and be redirected to the landing page.
      - So that I can easily log out to keep my information secure.

### Profile

- As a logged in user I want to be able to view my profile via an easy to find profile button on the navigation bar.
  - While on any page of the site:
    - I can access my profile
  - While on my profile:
    - I can view and edit my personal information
    - I can change my password
    - I can cancel a task
      - A list of all my scheduled tasks will allow me to cancel one of them.

## Tasks

### Scheduled Tasks

- As a logged in user I want to be see all my scheduled tasks via an easy to find button on the navigation bar.
  - While on any page of the site:
    - I can access my scheduled tasks.
  - While viewing my task list:
    - I can seed all of the tasks that I have scheduled.
    - I can edit the tasks as needed.
    - If I need to, I can cancel a task.

### Create Task

- As a logged in user I want to be able to book a task from an easy to find button on the navigation bar.
  - While in any page of the site:
    - I can start to book a new task.
  - Book task, step one:
    - The first step in booking a task should include my address, the estimated completion time of the task, and the details of that task.
    - Once filled in I can click a button to move on to the next step.
  - Book task, step two:
    - On this page I should be able to seed a list of available taskers.
    - There should be options to input the date and time that I am available and the price I'm willing to pay.
      - The tasker list should update accordingly.
    - Once I know which tasker I want for the job I can click on a button to select them.
  - Book task, step three:
    - on this page I should see a page to confirm the task.
      - There should be a section that shows the description of the task that I entered earlier with the ability to edit it.
      - There should be a section that shows the tasker that I selected fot the job and appointment information.
        - There should also be a button to edit this information.
      - There should be a section that shows the hourly rate of the selected tasker, any taxes/fees, and the total estimated cost.

### Tasker profile

- Any users, regardless of if they're logged in, should be able to view the profile of taskers.
  - There should be a section to show the tasker's profile image, their name, average review, and total tasks completed, and information about them.
  - There should be a section that shows a list of the categories that they are skilled in.
    - Each category will show their hourly rate, the average review, the number of completed tasks, and the reviews for that category.
- If a user is logged in there will be a button to select that tasker and start a new task.
