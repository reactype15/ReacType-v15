<p align="center">
  <img width="100" src="https://i.imgur.com/Yn70tqI.png">
  <h1 align="center">ReacType Change Log</h1>
</p>

**Version 15.0.0 Changes**

Changes:<br>

- Developer Improvements:
  - Redux Toolkit:
    - Migrated state from a combination of useReducer/useContext and Redux to only using Redux Toolkit. This is the recommended modern approach to handling large state management in this sort of application. Enhances the developer experience by enabling the use of the Redux Devtools to debug, and see state/actions in real-time.
  - Dependency Updates
    - New developers can easily npm install without having to use an older version of node or using --legacy-peer-deps
    - Updated to modern versions to take advantage of newer features
- User Features:
  - Websockets:
    - Users can now join rooms to collaborate in realtime
  - Tailwind CSS:
    - In the customization panel users can now choose between inline CSS and Tailwind. These changes are reflected in the live code preview.
  - OAuth:
    - Users may now log in using OAuth which enhances security, and makes sign in a breeze.
  - Deployed Website:
    - Containerized and deployed a working version of the application. Instead of having to download an application users may now interact live.

Recommendations for Future Enhancements:<br>

- Continue working on State Management. There are some changes that can be made to make the application cleaner. Right now the appStateSlice is a large file which houses a lot of the reducer functions. We believe there is a way to further modularize this to make it simpler to read, and iterate upon in the future.
- Convert to using Vite. While developing we ran into issues with webpack taking a long time to reflect changes. Vite is lightweight and enhances the developer experience.
- Expand Testing Coverage. Making a large move of state management made a lot of the testing innefective since it was based upon old ways.
- Refactor away from MUI. MUI is very opinionated and while creating components with it is easy it leaves a lot to be desired.
- Residual Bugs. While migrating state there are a few lingering bugs within the application. This process should be easier now with Redux Devtools availability, but we did not have time to go through every action and conduct thorough testing.

**Version 14.0.0 Changes**

Changes:<br>

- Added functionality & improvements:
  - Event listeners:
    - Added ability to assign event listeners to elements in the bottom customization tab
    - Can name the function on the event or use the default name provided
    - Updates reflected in the code preview render
  - Live code preview: Bottom tool tabs code preview box updates immediately and automatically to reflect the latest changes in state
  - Converted the annotation button into a delete button on the canvas elements and reusable components
  - Code preview render: The formatting for generated code has been corrected for improved readability
- Major UI changes:
  - Left panel:
    - Only display when mouse hovered over
    - When extended, floats in front of the canvas without affecting the main window formatting
  - Bottom panel
    - Retractable feature added
    - Has internal scroll ability in the tabs
    - Resized functionality is stable
  - Added indicator tabs to each signifying to the user their presence
  - Canvas container (upper left):
    - Changed the formatting to a center column with readable size and label orientation
    - Standardized the size of components and rate of growth when nesting
  - Tutorial:
    - Users can now reference tutorials in split-screen mode without the canvas being auto-cleared when going back and forth from the tutorial
- Bug fixes:
  - Reusable component: The drag-and-drop feature for reusable components is now functioning smoothly and without bugs

Recommendations for Future Enhancements:<br>

- Add function content in the current event listeners' function skeleton.
- The code output formatting in generateCode.ts is currently difficult to read, and could be improved for better readability.
- Currently, the project uses two sets of state management tools: useReducer/useContext and Redux. useReducer/useContext is used for handling the customization state, and Redux for managing the code preview, context manager, and dark mode reducer state. However, there seems to be some confusion around how to integrate these two tools effectively. For instance, both tools are used for managing the code preview state, and changing the useReducer/useContext state would replace the corresponding redux state. Need to clean up the logic and find a solution to solve this issue.
- Some of the files structure is not accurate (e.g., customizationPanel.tsx is in the containers folder instead of the bottom folder), need to rearrange the file hierarchy.
- Update packages and resolve package dependency issues.

**Version 13.0.0 Changes**

New Functionality:<br>

- Manage state locally: Users can now manage state dynamically within nested components using React Hooks within the state manager tab.
- Add/delete props: For a selected component, users can see a list of available props from the parent, add props, and delete props in case they are not - required later on.
- State/props flow: If state or props are deleted upstream, it will automatically update the state for its children components.
- Visualize state/props flow: Within the display sub-tab of the state manager tab, users can visualize an interactive tree diagram depicting the state initialized in the current component and passed down props from the parent component.

Enhancements:<br>

- Live code preview: Live rendering of code based on any changes in the state and dragging and nesting of components.
- Next.js & Gatsby compatibility: New state manager tab is now compatible with next.js and Gatsby.
- Tutorial: Tutorial is functional and has the latest guides to navigate through the newly added state management tab.

Deployment Updates:<br>

- Electron app is now available for Windows users.
- Web based version of the app is available on Heroku.

Bug Fixes:<br>

- User dashboard: The dashboard works now and shows private and shared projects with the ability for users to drop comments.
- Login/logout: Users can now signup/login/logout now on both development and production environments.
- Manage Projects: Github authenticated users are now able to create and save projects.
- Customization: Use State works as expected now within HTML elements.

What’s next:<br>

- Adding on click functionality within components. Goal: Make a fully functional tic-tac-toe app.
- Incorporating material ui into the components so that exported app has visually appealing components.
- Enabling auto save functionality when dragging and dropping components, and amending component state.
- Allowing users to click and access projects within the dashboard for review.
- Adding more integration and E2E testing.
- Fixing bugs in the heroku (web based) deployment: login/logout, GitHub oauth etc.
- Enabling google oauth in all environments.
- Packaging electron app for Linux users.
- Conversion from monolithic to micro services for better scaling in the future.

**Version 12.0.0 Changes**

- Context Visualizer: You can now visually see what component is consuming which context. As you click on the interactive tree, the component assigned to the context will be revealed.
- React 18: Updated to React 18
- Export Feature: Created an exportable context file, integrated with original codebase. Ready to go code: Added boilerplate codes to components based on which contexts they are consuming.

**A note to future contributors**

Attempted to implement Facebook and Google OAuth via passport but as of Electron’s current version, neither of them not compatible with electron.

**Version 11.0.0 Changes:**

- Added Next.js functionality
  - Next.js projects will generate the right code needed for exporting a Next.js application
  - Link & Image elements have been added
  - Link components are able to couple with a page to enable SSR
  - Next Link components have a drop down menu to quickly and easily link pages
  - Current canvas can be saved as a page to be coupled with a Next.js Link element
  - Files are exported with the appropriate Next.js imports and structure
- Added Redux and began migrating some state over for ease of development (debugging & readability)
- Fixed bug causing electron to crash when closing the window rather than going to file > exit
- Fixed bug causing app to crash when project was changed to either Next.js or Gatsby.js
- Fixed GitHub OAuth
  - added Passport.js & Passport-Github libraries for strategies which takes care of all the credential exchanges and session information
  - linked electron front end to talk to backend to exchange credentials
- Fixed code preview not displaying properly
- Fixed demo render preview so that changes in the canvas appears instantly
  - any links in the demo render preview can now be clicked on and it will take you to its related page
- Properties of each component now persist in the customization tab
- Fixed dark mode not syncing properly across pages

**Version 11.0.0 Stretch Features:**

- Move more state away from the react hook & context API and into the Redux store
  - This will be very time consuming but will make implementing new features much easier
  - Highly suggest you read Redux documentation on best practices before diving into this
  - This will improve performance by reducing the amount of unneccessary re-render. The context API causes certain pieces of state to be needlessly coupled
  - Debugging is much easier by the use of Redux dev tools which allow time travel debugging
  - Code will be easier to read and thus data flow will be easier to visualize
  - Don't move **everything** onto Redux. ie: Material UI uses the context API to handle theme changes
- Enable remote work similar to vscode's live share
  - Tried to implement peer to peer communication via webRTC with redux swarmlog but was not successful
  - Look into using websockets
  - Think about security. What features needs to be implemented for secure sharing?
  - Transfer actions through websockets via Redux middleware (Thunk)?
- Save project (state) onto local storage for guests
- Redesign UI to be more flexible
  - Read material ui docs for best practices.
  - creation panel should be redesigned. Its react component structure is too fragmented.
- Add missing Next.js features
  - Image components need sizing & loading options to capitalize on Next.js' Image optimization
