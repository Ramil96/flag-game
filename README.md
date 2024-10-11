# Flags are Fun
## A game built to test country knowledge
## - Ramil Jose Tyrone Tuazon

![My amiresponsive picture](assets/images/amiresponsiveIndex)

## [Live site](https://ramil96.github.io/flag-game/)

## [Repository](https://github.com/Ramil96)

## Table of contents

1. [UX](#ux)
2. [Features](#features)
3. [Future features](#future-features)
4. [Technology used](#technology-used)
5. [Testing](#testing)
6. [Bugs](#bugs)
7. [Deployment](#deployment)
8. [Credits](#credits)
9. [Content](content)
10. [Acknowledgements](#acknowledgements)

## UX

### Pre-project planning
> When embarking on this project, I wanted to create a flag game that not only captures the excitement and challenge of learning world flags but also provides a fun and engaging platform for people of all ages. I was driven by my passion for geography and the joy of learning about different cultures. As someone who has always been fascinated by the diversity of the world, I wanted to share that experience with others through an interactive and enjoyable game that encourages curiosity and exploration. I wanted to create a story of leaving the dock and arriving at an island where the user starts to answer questions. Initially I wanted to add a destination depending on the amount of points the user gets but I didn't have enough time to add this feature.

## UX Design

### Strategy Plane
---
To determine the best approach to this project, I began by identifying and understanding both user and educational needs. My primary goal was to create a flag game that would be enjoyable for both children and older players, ensuring it could engage a wide audience. By focusing on these needs, I could design a game that is not only fun but also educational, helping users learn about world flags in an interactive and accessible way. My strategy was to build a platform that encourages learning while being simple and user-friendly, making it easy for players of all ages to enjoy and explore.

## User Stories
### User
> As a user, I want to play a fun and interactive flag game that helps me learn world flags.

> As a user I want to be able to be able to choose the level through a dificulty screen.

> As a user I want to be able to Track my progress while playing the game.

> As a user I want to be able to see a warm friendly feel.

> As a user I want to be able to go to the home screen from any of the difficulty levels.

### Business Owner
> As the site owner I want to be able to showcase my game to potential users.

> As the site owner, I want to share world flags, creating a fun and educational experience for users.

> As a site owner I want to display a selection of different score rewards.

## Scope Plane
> The game should have a home button when playing on the flag option screen.

> The game should neatly and appropriately list the different levels of difficulty.

## Structure Plane
> To achieve the goals of the above the website will include at least 2 pages consisting of: Level selection screen and play screen.

#### Home Page
> Navigation with links consistent across all pages.

> Users greeted by instructions and bright image of cartoon dock.

> Rules are outlined on main page.

#### Game page
> Game page will contain options for the flag.

> Game page will contain timer and score amount.

> Game page will contain the amount of questions the level has.

> Game page will contain timer.

## Skeleton Plane

### Wireframe

![Home page wireframe](assets/images/wireframes/Wireframe%20index.PNG)
> The design flow of this website is meant to showcase a minimal design showing necessary information which is in the header.

## Surface Plane

### Color

> I decided that the best approach to this game was a minimalistic design that influences a island vibe so I used the color violet for the main highlights of the text as it blends well with the yellow and blue colours so it stands out.

### Typography 
> The font's chosen for this project were 
- Baloo Paaji 2

> The reason I used this font is to influence the idea of an island discovery feel as this is a maori type font.

## Testing
> Testing on this project was done manually by me by myself and some family members to determine the functionality of the site with both usability and responsiveness to make sure it is easily usable by a new user.

#### Testing links

| Test                                                         | Outcome |
|--------------------------------------------------------------|---------|
| Easy button works when clicked                               | Pass    |
| Medium button takes user to medium level                     | Pass    |
| Home icon takes the user back to the level select page       | Pass    |
| User will get James Cook on medium level if all correct      | Pass    |
| User will see 3 options for each flag on all difficulty level| Pass    |
| Message when timer runs out                                  | Pass    |

#### Testing responsiveness

| Test                                                         | Outcome |
|--------------------------------------------------------------|---------|
| Main difficulty page and level displays correctly on screens larger than 950px  | Pass    |
| Main difficulty page and level displays correctly on screens smaller than 950px | Pass    |

### User testing
#### User testing challenge
> 5 users are given some basic tasks prior to visiting game the results totaled to give result (20% per successful user result.)

| Test                                                         | Outcome |
|--------------------------------------------------------------|---------|
| Upon arrival please navigate to the easy level                                            | 100%    |
| Please navigate from the easy level back to the difficulty screen                         | 100%    |
| Please navigate to the medium level and back to the difficulty screen                     | 100%    |
| Please let the timer run out and click new try again                                      | 100%    |
| Select a correct and incorrect answer they should show green or red depending on answer   | 100%    |

#### User responsive testing
> 5 users were asked to view the website on their mobile devices and/or tablets to provide any feedback on errors or page overlapping issues.

| Test                                                         | Result |
|--------------------------------------------------------------|---------|
| Issues Reported         | None    |

## Google Lighthouse Testing 
### index.html
![index.html lighthouse test](assets/images/testing/lh%20index.PNG)

### about.html
![about.html lighthouse test](assets/images/testing/lh%20about.PNG)

### prices.html
![prices.html lighthouse test](assets/images/testing/lh%20prices.PNG)

### contact-us.html
![contact-us.html lighthouse test](assets/images/testing/lh%20contact.PNG)

## HTML Validation

### index.html
![HTML Validation with W3C testing](assets/images/testing/w3%20test.PNG)
#### Result: No Errors

### about.html
![about.html validation with W3C testing](assets/images/testing/about%20w3c.PNG)
#### Result: No Errors

### prices.html
![prices.html validation with W3C testing](assets/images/testing/prices%20w3c%20test.PNG)
#### Result: No Errors

### contact-us.html
![contact-us.html validation with W3C testing](assets/images/testing/contact%20w3c%20testing.PNG)
#### Result: No Errors

## CSS Validation 
![CSS W3C Validator](assets/images/testing/jigsaw%20css%20validator.PNG)
#### Result: No Errors

## Bugs

> Hero image text not responsive. Fixed - Added bootstrap sm -lg to resize ratio when scaled down in size using indentation to fix the element in desired place.

> Issues with navigation links on about us page. Fixed - Reconnected the href as when copying over the style from index to other pages the href and link was missing.

> Issues with contact us button only going to contact page and not selected div. Fixed - Re linked the href due to switching styles and information being deleted due to manual error.

> Navbar displaying white space on both sides and not filling the whole width of element. Fixed - Scaled full width of the color by using CSS 100% width to fill the whole navbar.

> Footer image showing on top of screen. Fixed - Adjusted the image using bootstrap comman image fluid and not fixed as fixed was pushing the footer image to the top of the page.

> About page location and prices header brings user to "no webpage found" error when clicking the location in header. Fixed

## Deployment
> To deploy the project I followed these steps from the main project repository [here](https://github.com/Ramil96/raptors-muay-thai)

1. Clicked on Settings on the navigation menu in the repository
2. I then selected the Pages menu on the side bar.
3. In the first dropdown menu labeled Source I selected the branch of the name main from the dropdown.
4. In the next dropdown labeled /root I left as the default option.
5. Selected Save

## Credits

### All images sourced are from pexels.com Links for images included  below

> hero image https://www.pexels.com/photo/man-and-woman-during-a-kickboxing-workout-8611942/

> about image https://www.pexels.com/photo/men-training-in-a-gym-5750838/

> about us image https://www.pexels.com/photo/two-contestant-doing-kick-boxing-match-598686/

> prices image https://www.pexels.com/photo/woman-in-black-dress-walking-down-the-stairs-4754138/

> contact us main image https://www.pexels.com/photo/strong-male-personal-trainer-showing-kickboxing-technique-to-young-woman-7991668/

> contact us secondary image https://www.pexels.com/photo/man-in-black-tank-top-and-brown-pants-doing-exercise-4761788/

> footer image https://www.pexels.com/photo/a-man-doing-kickboxing-4804068/

## Content and Resources 

### Maps
> Used to embed googlemaps iframe https://www.google.co.uk/maps

### Pexels.com
> Images used in this project.

### w3 schools
> Used for general help for HTML AND CSS syntax.

### bootstrap
> Used for help regarding the responsive side of development.

### stack overflow 
> For help with general quiries in regards to CSS and HTML

### Code Institute 
> Project created in line with course content and within project 1 scope.

## Acknowledgements 
### Alan Bushell
> My mentor who provided me with constructive feedback and positive reinforcement where applicable.
