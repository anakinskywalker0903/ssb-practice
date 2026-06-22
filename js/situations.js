/**
 * SSB SRT Simulator — Situation Bank
 * 120 curated situations covering real SSB SRT categories.
 * All written in third person ("He...").
 */

const SRT_SITUATIONS = [
  // ── Emergency & Rescue ──────────────────────────────────────────────────────
  "He was walking on a road when he saw a man lying unconscious near a ditch.",
  "He saw a fire break out in a building while he was passing by on his way to an important meeting.",
  "He was travelling in a bus when it met with an accident and several passengers were injured.",
  "He noticed a child drowning in a pond while people around were just watching.",
  "He saw smoke coming out of his neighbour's house at midnight.",
  "He was on a trek when one of his teammates slipped and broke his leg on a remote trail.",
  "He saw a person being swept away by a flooded river while a crowd watched helplessly.",
  "He noticed a gas cylinder leaking in a crowded marketplace.",
  "He was the first to reach the site of a train accident before any official help arrived.",
  "He saw an old woman collapse on a busy street and people were ignoring her.",

  // ── Leadership & Group ───────────────────────────────────────────────────────
  "He was made the leader of a group project but two members were not cooperating.",
  "His team was losing morale during a difficult task and looked to him for guidance.",
  "During a group task his plan was rejected by the majority even though he believed it was correct.",
  "He was in charge of organising an event when the main speaker cancelled at the last minute.",
  "His group was split into two factions with conflicting ideas and the deadline was approaching.",
  "He was leading a night patrol when he realised his team had taken a wrong route.",
  "His subordinate refused to follow his orders during a critical mission.",
  "He was assigned to lead a new team that had a history of poor performance.",
  "His team completed the task but one member took all the credit in front of the senior officer.",
  "During a competition his team was clearly going to lose and members started giving up.",

  // ── Academic & Career ────────────────────────────────────────────────────────
  "He failed his board exams despite studying hard and his parents were disappointed.",
  "He was preparing for an important exam when his close friend met with an accident.",
  "He was offered a well-paying private job but his dream was to join the armed forces.",
  "He discovered his colleague was cheating in an internal assessment.",
  "He was not selected in the SSB despite giving his best and his friends were selected.",
  "His professor publicly humiliated him in front of the class for a mistake he did not commit.",
  "He was given a promotion over his senior colleague which created tension in the workplace.",
  "He realised mid-semester that he had been studying the wrong syllabus.",
  "He was asked to submit a report within one hour on a topic he had no prior knowledge of.",
  "His project partner disappeared the night before the submission leaving all the work to him.",

  // ── Social & Community ───────────────────────────────────────────────────────
  "He saw two groups of youth about to get into a violent fight in his neighbourhood.",
  "He found out that a poor student in his class was unable to continue studies due to lack of funds.",
  "While travelling he saw a family stranded on a highway with a broken-down vehicle at night.",
  "He noticed that the villagers near his camp were suffering from a disease and had no medical access.",
  "He saw a group of boys bullying a differently-abled student in school.",
  "During a flood his village was cut off and the villagers were panicking.",
  "He was the only one who noticed a suspicious person leaving an unattended bag at a public place.",
  "He saw a small child lost and crying alone in a crowded market.",
  "He found that a neighbour was regularly beating his wife but the neighbours were silent.",
  "He saw a group of people spreading false rumours that were causing panic in the community.",

  // ── Personal Challenges ──────────────────────────────────────────────────────
  "He was to appear for his final SSB interview but his father was suddenly hospitalised.",
  "He lost his wallet with all his money and ID while travelling alone in an unknown city.",
  "He reached the exam hall and realised he had left his admit card at home.",
  "He was alone at home when a power cut occurred and a thief tried to break in.",
  "He had to deliver an important speech but developed a severe sore throat the night before.",
  "He was stuck in a traffic jam and was going to miss an interview he had waited months for.",
  "He was on a long solo trek and his phone battery died and he was unsure of the path.",
  "He was given an extremely tight deadline for a task that normally required three days.",
  "He realised mid-journey that he had boarded the wrong train.",
  "He found a large sum of money on the road in a deserted area with no one around.",

  // ── Military & Duty ──────────────────────────────────────────────────────────
  "He was given an order by his senior that he knew was ethically wrong.",
  "He discovered a fellow soldier was leaking sensitive information to an outsider.",
  "His unit was under heavy enemy fire and his commander was injured leaving him in charge.",
  "He was posted to a remote area away from family with no communication for months.",
  "His entire section made a serious mistake on duty but blamed it on him.",
  "He was asked to punish a junior who he knew was innocent.",
  "He saw a senior officer misusing his authority to take personal benefits.",
  "He was the only one who could perform a dangerous task but had serious self-doubt.",
  "His unit was asked to complete a mission with inadequate resources and equipment.",
  "He was rotated to an extremely harsh posting that his peers had refused.",

  // ── Ethical Dilemmas ────────────────────────────────────────────────────────
  "He found out that his best friend was involved in a crime and was asked to testify.",
  "He was pressured by his seniors to falsify a report to cover up their mistake.",
  "He discovered his own family member was involved in corrupt activity.",
  "He was offered a bribe to overlook a violation but needed money urgently for medical bills.",
  "He knew the answer to an exam question because he had accidentally seen the paper the night before.",
  "He was asked to spread false information by his superior for personal gain.",
  "He discovered that a widely respected person in his community was actually a fraud.",
  "He had to choose between saving one person he knew or two strangers in a life-threatening situation.",
  "He saw his friend shoplifting but the shopkeeper had not noticed.",
  "He accidentally broke an expensive piece of equipment and no one saw it happen.",

  // ── Interpersonal ───────────────────────────────────────────────────────────
  "He had a major argument with his best friend a day before an important joint task.",
  "His parents were strongly against his decision to join the armed forces.",
  "His roommate constantly disturbed his study routine and ignored all requests to stop.",
  "He discovered his girlfriend/close friend had been lying to him for months.",
  "A senior colleague always took credit for his ideas and work in front of management.",
  "His teammates mocked him for suggesting an unconventional solution to a problem.",
  "He was unfairly blamed by his superior in front of the whole team.",
  "His junior came to him crying having been treated badly by another superior.",
  "He was very close to a colleague who was transferred to a difficult posting.",
  "He found out that someone was spreading negative rumours about him at his workplace.",

  // ── Outdoor & Adventure ─────────────────────────────────────────────────────
  "He was leading a group hike when the weather suddenly turned dangerous.",
  "He got lost in a forest with a group of friends and it was getting dark.",
  "His boat engine broke down in the middle of a river with two other people.",
  "He was part of an adventure camp when a member of the group developed a severe allergic reaction.",
  "He had to cross a flooded bridge with his team to reach a village needing help.",
  "He was the only experienced swimmer when a non-swimmer fell into a deep lake.",
  "During a camping trip a wild animal was spotted near the campsite at night.",
  "His team ran out of food and water on day two of a five-day expedition.",
  "He was descending a cliff when his rope started fraying.",
  "He was leading a cycle expedition when two cycles broke down 30 km from the nearest town.",

  // ── National & Civic ────────────────────────────────────────────────────────
  "He saw a group vandalising a public monument in broad daylight.",
  "He witnessed vote fraud being carried out openly during an election.",
  "He noticed illegal dumping of waste by a factory into a river that was the water source for a village.",
  "He came across a group spreading communal hatred and tension in a mixed neighbourhood.",
  "He found an injured stray animal on the road and it was blocking traffic.",
  "He saw someone disrespecting the national flag at a public event.",
  "He witnessed a hit-and-run accident and was the only person who saw the vehicle number.",
  "His village was struck by a cyclone and official help was not expected for two days.",
  "He was on duty when he discovered a large-scale encroachment on government land.",
  "He noticed children in his area had stopped going to school and found out they were being made to work.",

  // ── Stress & Pressure ───────────────────────────────────────────────────────
  "He had to give a presentation to the board of directors with only one hour of preparation.",
  "His entire year's work was lost when his computer crashed the night before submission.",
  "He was the only officer available when a complex crisis erupted in his area of responsibility.",
  "He was extremely exhausted but was asked to take on another urgent task.",
  "He was told his services would no longer be required just when he had taken a major financial decision.",
  "He had five urgent tasks to complete simultaneously with no one available to help.",
  "He received news of a family emergency during a critical point in an ongoing operation.",
  "His superior set an impossible deadline and held him personally responsible for the outcome.",
  "During a public event he was responsible for he realised things were going badly out of control.",
  "He was the only person awake in his unit when an emergency alert was received at 3 AM.",

  // ── Innovation & Problem Solving ────────────────────────────────────────────
  "He noticed a recurring problem in his unit that seniors had accepted as normal.",
  "He had an innovative idea that could save costs but no one in management was willing to listen.",
  "He was given an outdated tool to complete a modern task with no budget for upgrades.",
  "He found a much simpler way to do a task but it went against the standard procedure.",
  "He was tasked with solving a complex problem that no one in his team had solved before.",
  "He realised mid-task that the conventional approach was not working and time was running out.",
  "He was asked to achieve a target that had never been achieved before in his organisation.",
  "He was the only person with an engineering background in a team that had no technical knowledge.",
  "He designed a system that worked perfectly in tests but failed on the day of deployment.",
  "He was asked to train a group of people with no prior knowledge in a skill within three days.",
];

export default SRT_SITUATIONS;
