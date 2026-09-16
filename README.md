# Care Management Game

A browser-based care-management and household-management game built around the idea of future robotic assistance.

## The Premise

You play as yourself: a person receiving care, a tester of experimental caregiver robots, and a financial decision-maker for your household.

A newly deployed robot is assigned to your home. Although it shares general knowledge with millions of other robots, it must learn your household’s routines, abilities, preferences, and priorities.

The robot assists with personal care and the needs of the entire household, including your spouse and aging dogs.

## The Game

You train and evaluate each robot through household tasks such as:

- Personal care and mobility support
- Meal preparation
- Dishes
- Laundry
- Household cleaning
- Pet care
- Assistance for your spouse
- Other services as the robot’s abilities develop

The manufacturer pays you to test each robot according to its standards. Your household also pays for the robot’s services at rates based on the type of work and its local market value.

You must balance:

- Personal care needs
- Household needs
- Robot training and skill development
- Manufacturer testing assignments
- Robot performance and approval
- Service costs and tester income
- Long-term household finances

If a robot performs poorly, the manufacturer may recall it and replace it with an upgraded model. The previous robot’s experience contributes to the next robot’s starting experience.

## Robot Progression

Each robot has a randomly generated:

- Name
- Model number
- Personality
- Skills
- Strengths and weaknesses

The robot learns by watching, listening, receiving feedback, and benefiting from knowledge shared by other robots.

## Care Worksheet

The game includes a practical weekly care worksheet:

- Care tasks appear in rows.
- Days appear in columns.
- Completed tasks are marked by clicking their cells.
- Completion data is saved locally in the browser.

The worksheet is a core personal care tool and should remain useful independently of the game systems.

## Design Principles

- Real care needs come before game mechanics.
- The game should be engaging without becoming stressful or judgmental.
- Essential care functions should remain simple and reliable.
- Game progress should never be required to record care tasks.
- The application should work locally and preserve user privacy.

This project is a personal tool first, with the possibility of serving a small audience of people managing their own care and household needs.

## Privacy and AI

The core application is designed to run locally, with data stored in the browser.

Optional AI features may later support:

- Robot dialogue
- Personality-driven interactions
- Manufacturer messages
- Dynamic testing scenarios
- Feedback summaries

AI will remain optional and should not control essential care reminders, task records, financial calculations, or care decisions. Any future external AI service would require careful consideration of privacy, cost, reliability, and the handling of personal information.

## Technology

The project uses:

- HTML
- CSS
- JavaScript
- JSON
- Browser `localStorage`

## Development Roadmap

Refine the visual mockups.
Build the interactive weekly care worksheet.
Add local persistence for completed tasks.
Develop robot profiles, skills, personalities, and progression.
Add household services, finances, and manufacturer testing.
Add replacement and career-history systems.
Consider optional AI features after the core game works reliably.
Development Status
The project is currently in the mockup and design phase. Static screens are being refined before interactive game systems are added

## Notes on conversations about future improvements

### Add a World Newsfeed to the game

A compelling meta-layer for the game. It gives the players work meaning beyond one household:

* Robots learn from each household and pass improvements to future
  generations.
* A world-news feed reports advances, setbacks, and adoption of care  
  robotics.
* Other players or households gradually become part of a growing 
  community.
* The players care decisions contribute to a larger social and 
  technological movement.
* The game can inspire real-world advocacy, demonstrations, and 
  conversations about independent living.

The real-world outcome you describe could become an extension of the game: not seeking investment, but seeking visibility, collaboration, and access to people capable of accelerating the idea.

For the fictional story, Elon Musk and Mark Cuban could appear as fictionalized public figures or narrative references, without implying real endorsement, friendship, or involvement. The game could present the players ambition as:

“We are not asking for money. We are asking for an audience, because people managing care deserve a voice in the future of robotics.”

This adds a powerful theme: the player is not merely using technology—they are helping define what technology should become.

## Running the Project

Open `index.html` directly in a browser, or start a local server from this folder:

````powershell
python -m http.server 8000

Then visit:

http://localhost:8000