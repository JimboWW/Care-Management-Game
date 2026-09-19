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

## Product Direction

This project is both a practical personal tool and a framework for imagining a caregiving robot. The practical tool comes first. Game mechanics should make useful work more visible and engaging without making essential care dependent on points, rewards, an internet connection, or an AI service.

The system has four connected layers:

1. **Essential care:** crisis-mode tasks and other routines that protect health and need to remain simple, visible, and dependable.
2. **Self-management:** household tasks, preparation, planning, routines, assistive equipment, and other systems that reduce effort and increase independence.
3. **Robot training:** documenting routines, designing interfaces, testing workflows, and improving automation as forms of training and infrastructure work.
4. **Game layer:** robot identity, skills, personality, finances, progression, narrative, and optional rewards built around the real work.

## Real-World Care Manual

The long-term foundation of the application is a detailed, accurate record of the user's real self-care system. The fictional robot learns from this record, but the record must remain useful without the game and understandable to a trusted human caregiver.

The care manual may eventually include:

- Medications, schedules, instructions, and important cautions
- Equipment, assistive devices, and household adaptations
- Supply inventories, replenishment routines, and storage locations
- Step-by-step care procedures and preparation checklists
- Photos showing how equipment or supplies should be arranged
- Notes about preferences, warning signs, problems, and successful solutions
- A concise, current summary that can be reviewed with a doctor
- A caregiver handoff view for a trusted person who may need to help

Accuracy and clarity take priority over game presentation. The game may provide motivation, context, and a sense of progress, but it must not remove important detail or imply that fictional robot mechanics are medical guidance. Health information should be clearly identified as personal documentation, with clinical questions left for the user's healthcare professionals.

## Development Roadmap

### Foundation: reliable personal tool

- [x] Refine the visual mock-up for the first care worksheet.
- [x] Build the interactive Weekly Essential Care tracker.
- [x] Add local persistence for essential-care completions and scores.
- [x] Keep essential care separate from broader household and optional game systems.
- [x] Limit essential care to self-catheterization, water intake, and bowel care.
- [x] Add a separate Weekly Long-Term Care tracker for walking, bath, arm pulls, pedal, sit/stand, weight, and meal-calorie checks.
- [x] Add a separate Weekly Household Tasks tracker for sanitation, household maintenance, personal care, dishes, and appreciation.
- [ ] Add additional custom trackers for other self-management areas.
- [ ] Make the worksheet comfortable and dependable on a laptop, tablet, and phone.

### Self-management system

- [ ] Add separate areas for support tasks, household tasks, routines, and other non-crisis work.
- [ ] Record assistive equipment, household adaptations, and automation that reduce effort.
- [ ] Add reusable procedures for recurring activities instead of treating every action as a one-time task.
- [ ] Provide a simple log for problems, discoveries, and changes that improve daily life.

### Detailed care manual

- [ ] Add structured records for medications, equipment, supplies, and care procedures.
- [ ] Support step-by-step instructions with preparation, completion, and troubleshooting notes.
- [ ] Add secure local records for setup photos and other reference images.
- [ ] Distinguish personal documentation from medical advice and preserve the user's exact wording where accuracy matters.
- [ ] Create a concise doctor-review summary without replacing the detailed manual.
- [ ] Create a caregiver handoff view that presents practical instructions without exposing unnecessary game information.
- [ ] Add revision dates and change history so important care information can be reviewed and updated deliberately.

### Robot training and progress

- [ ] Treat interface design, workflow testing, documentation, and automation work as robot training activity.
- [ ] Create a robot profile with a name, model, personality, skills, strengths, and weaknesses.
- [ ] Represent learning through feedback, successful routines, improved systems, and completed training work.
- [ ] Add manufacturer assignments and evaluation only after the personal tool remains useful on its own.

### Financial model

- [ ] Track the value credited to the robot for completed care and household work.
- [ ] Track compensation credited to the user for care, supervision, testing, training, and system development.
- [ ] Track household costs such as equipment, supplies, services, maintenance, and future robot upgrades.
- [ ] Show the difference between robot earnings, user earnings, household costs, and overall household benefit.
- [ ] Use financial progress as the primary gamification system rather than relying mainly on points or streaks.

### Optional companion and game features

- [ ] Add a clearly labeled button that opens the user’s preferred AI service in a separate tab.
- [ ] Use an external AI conversation as an optional robot persona or companion, without making it responsible for essential records.
- [ ] Add narrative events, robot progression, manufacturer messages, and career history only when they support the practical tool.
- [ ] Consider a broader world newsfeed or shared robot-learning story after the personal system is stable.

### Privacy and portability decisions

- [ ] Keep local browser storage as the default while the application is personal and device-local.
- [ ] Avoid accounts, cloud synchronization, and backend storage until their convenience clearly outweighs their security and maintenance costs.
- [ ] Revisit multi-device synchronization only as a deliberate product decision, not as an automatic consequence of adding game features.

**Development Status**

The Weekly Essential Care, Weekly Long-Term Care, and Weekly Household Tasks trackers are implemented with independent browser-local persistence. The next design task is to add additional self-management areas without mixing them into the essential list. Broader game systems remain in development.

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

```powershell
python -m http.server 8000
```

Then visit:

`http://localhost:8000`