/**
 * SSB SRT Simulator — Situation Bank (300 Situations)
 * Based on authentic SSB SRT patterns from SSBCrack, official prep resources,
 * and real SSB candidate experiences. Covers all 12 major OLQ categories.
 *
 * Format: Third-person situations ("He was..." / "He saw..." / "He found...")
 * Randomised each session. 5 full SRTs (5 × 60 = 300).
 */

const SRT_SITUATIONS = [

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 1 — EMERGENCY, RESCUE & ACCIDENT
  // ════════════════════════════════════════════════════════════

  "He was going for an important interview when he saw a road accident ahead with injured people lying on the road.",
  "He saw a child fall into a deep well in a village while playing.",
  "While travelling in a bus he noticed smoke coming from underneath the bus engine.",
  "He was the first to arrive at the scene of a building collapse with people trapped inside.",
  "He saw a person being electrocuted by a fallen wire on a flooded road.",
  "While trekking he found an injured hiker lying unconscious in a remote area with no phone network.",
  "He noticed a young boy drowning in a river while the people on the bank were shouting helplessly.",
  "While passing a house he saw flames and heard screams from inside.",
  "He was driving when he saw a truck lose control and hit a group of schoolchildren.",
  "He saw a man collapse suddenly on a busy railway platform during rush hour.",
  "While on a night shift he heard a loud explosion from the nearby factory.",
  "He saw a passenger faint inside a moving train with no doctor on board.",
  "He was swimming when he noticed his friend struggling in a deep pool and sinking.",
  "A gas cylinder burst in his neighbour's kitchen and the fire was spreading rapidly.",
  "He noticed a cyclist fall off a bridge onto a shallow riverbed below.",
  "He found an old woman lying on the road in the rain with no one helping her.",
  "His vehicle's brakes failed while going downhill on a mountain road with passengers.",
  "He saw a small child wandering alone on a busy highway far from any village.",
  "While at the beach he saw a swimmer being carried away by a strong current.",
  "He witnessed a chemical tanker accident on the highway with fumes spreading.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 2 — LEADERSHIP & TEAM MANAGEMENT
  // ════════════════════════════════════════════════════════════

  "He was made the team leader for a project but two senior members refused to follow his instructions.",
  "His entire team was demoralised after a major setback and was on the verge of quitting.",
  "His team leader suddenly fell ill during a critical phase of an operation leaving him in charge.",
  "He noticed that his team was working inefficiently and would not meet the deadline at the current pace.",
  "Two members of his group had a serious fight that was affecting the whole team's work.",
  "His group was split into two opposing factions and could not agree on any plan.",
  "He was leading a military patrol when he discovered they had taken a wrong route in the dark.",
  "His junior team member was making repeated mistakes but was afraid to ask for help.",
  "He was assigned to a team that had consistently failed under previous leaders.",
  "During a group task one dominant member was making all decisions and ignoring others.",
  "His team won a task but one member who contributed little was taking all the credit.",
  "During a competition his team was clearly going to lose and members were giving up.",
  "He discovered his second-in-command was secretly communicating with a rival team.",
  "His team of volunteers panicked during a relief operation and started acting on their own.",
  "He was in charge of a march and two team members fell seriously behind due to exhaustion.",
  "His subordinate refused to carry out a direct order during a field exercise.",
  "He found that a team member was leaking confidential project details to outsiders.",
  "His group had a strong plan but no one was willing to take responsibility for execution.",
  "He had to coordinate five different teams simultaneously during a crisis with limited communication.",
  "His seniors praised another person for his work without giving him credit.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 3 — PERSONAL CHALLENGE & ADVERSITY
  // ════════════════════════════════════════════════════════════

  "He was travelling to appear for SSB when he lost his wallet and ticket on the train.",
  "He reached the examination hall and realised he had left his admit card at home.",
  "He was to present a project to the director but his laptop crashed an hour before.",
  "He was stuck in a severe traffic jam and was going to miss a once-in-a-lifetime interview.",
  "He arrived at a new city for a job posting and found his accommodation booking had been cancelled.",
  "He was on a solo cycling expedition when his cycle broke down 40 km from the nearest town.",
  "He realised mid-journey that he had boarded the completely wrong train.",
  "His phone battery died in an unfamiliar city at night with no money for a cab.",
  "He was the only member of his unit awake when an emergency distress signal came in at 3 AM.",
  "He was asked to submit a critical report within two hours on a topic he had never studied.",
  "His entire year of research data was accidentally deleted the night before the submission deadline.",
  "He fell seriously ill the night before an exam he had prepared for all year.",
  "He was about to deliver an important public speech when he lost his prepared notes.",
  "He was given an extremely difficult task that no one in the organisation had ever completed.",
  "He received notice that his posting had been changed to a remote area at the last minute.",
  "He was working on an important task when the power went out and backup systems also failed.",
  "He missed the last bus in an unknown area at night with no phone network.",
  "He was given a task with completely inadequate resources and an impossible deadline.",
  "He discovered that he had been wrongly marked absent for an exam he had attended.",
  "His project partner disappeared completely the night before the final submission.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 4 — MORAL DILEMMA & ETHICAL DECISION
  // ════════════════════════════════════════════════════════════

  "He accidentally saw the exam paper the night before and his classmates were asking him to share it.",
  "He found a wallet with a large sum of money, a government ID, and a family photo.",
  "He was pressured by seniors to sign a false report to cover up their mistake.",
  "He witnessed a senior officer accepting a bribe from a contractor.",
  "He discovered that his best friend had been involved in a serious crime.",
  "His own elder brother was involved in an illegal business and asked him for help.",
  "He was offered a large sum of money to overlook a minor but critical safety violation.",
  "He knew that the popular person chosen for an award had not actually done the work claimed.",
  "He was the only witness to a hit-and-run accident and the driver was a well-known local figure.",
  "He found government documents left behind in a public place.",
  "He discovered that a widely trusted and respected NGO was misusing public donations.",
  "He accidentally broke an expensive piece of military equipment and no one saw it happen.",
  "He was offered an unfair advantage in a promotion process in exchange for a favour.",
  "He saw a friend shoplifting in a store while the shopkeeper was distracted.",
  "He was asked to spread false information to protect a senior's reputation.",
  "His unit was ordered to do something that he believed was ethically wrong.",
  "He discovered his neighbour was running an illegal operation from their house.",
  "He realised the official data in a government report he was required to submit was incorrect.",
  "He was given stolen goods to hold temporarily by someone claiming to be in danger.",
  "He was the only one who knew his team had violated an important safety rule.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 5 — SOCIAL RESPONSIBILITY & COMMUNITY
  // ════════════════════════════════════════════════════════════

  "He saw a group of youth about to attack another person in a lane at night.",
  "He found a poor but brilliant student in his class could no longer afford to continue studying.",
  "He saw workers at a construction site being made to work in clearly dangerous conditions.",
  "He discovered that villagers near his camp were suffering from an unknown disease with no access to a doctor.",
  "He saw a family stranded on a national highway in the middle of the night with a broken vehicle.",
  "He witnessed a shopkeeper openly cheating illiterate elderly customers.",
  "He came to know that child labourers were working in a factory near his locality.",
  "He found that false rumours were spreading in his neighbourhood causing communal tension.",
  "He saw people dumping industrial waste into the local river that supplied drinking water.",
  "He noticed a gang of older boys routinely bullying a physically disabled student.",
  "During a flood his village was cut off and villagers were panicking with no outside help for two days.",
  "He saw that elderly people in his colony had no one to help them during a curfew.",
  "He found that a local politician was misusing public relief funds.",
  "He noticed children in his area had dropped out of school and were being made to work.",
  "He saw a group of people spreading fake news on social media causing public panic.",
  "He discovered a nearby factory was dumping toxic chemicals that were killing the local crops.",
  "He witnessed vote fraud being carried out openly during an election in his area.",
  "He found a group of people vandalising a war memorial in broad daylight.",
  "He saw someone disrespecting the national flag during a public event.",
  "He noticed a seriously injured stray animal on a busy road blocking traffic.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 6 — MILITARY, DUTY & SERVICE
  // ════════════════════════════════════════════════════════════

  "He was on guard duty alone at night when he saw a suspicious person near the perimeter.",
  "He discovered a colleague in his unit was leaking sensitive information to an outsider.",
  "His unit was ambushed in unfamiliar terrain and the commanding officer was badly injured.",
  "He was posted to an extremely harsh and remote area far from his family for two years.",
  "His entire section made a serious mistake during training and placed the blame on him alone.",
  "He was asked to punish a junior soldier he knew was completely innocent.",
  "He received a direct order from a superior that he believed was tactically incorrect.",
  "His equipment malfunctioned at the start of a critical operation with no replacement available.",
  "He was the last line of defence and had to make a split-second decision that could cost lives.",
  "His unit was given an impossible target with only half the required manpower.",
  "He was the only officer available when a serious border incident was reported at midnight.",
  "A senior officer was misusing his authority to get personal benefits at the cost of junior soldiers.",
  "His unit was running critically low on supplies during a long field deployment.",
  "He was denied leave to attend a family emergency due to an ongoing operation.",
  "His regiment's reputation was at stake in an upcoming inter-unit competition.",
  "He was asked to rotate to an extremely difficult posting that several other officers had refused.",
  "He discovered that confidential maps of his patrol route had gone missing.",
  "His unit faced a serious morale crisis after losing a colleague in an accident.",
  "He was appointed to a peacekeeping mission in a high-tension area with very strict rules.",
  "He was decorated for an act of bravery but knew that another person deserved the credit more.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 7 — ACADEMIC, CAREER & PROFESSIONAL
  // ════════════════════════════════════════════════════════════

  "He failed his final engineering exams despite working very hard throughout the year.",
  "He discovered that a colleague was regularly taking credit for his innovative ideas.",
  "He was offered a very high-paying private sector job just as he was about to join the armed forces.",
  "His professor publicly humiliated him for a mistake he had not actually made.",
  "He was given a promotion over a senior colleague which created serious resentment.",
  "He found out his colleague was submitting fabricated data in a joint research project.",
  "He was transferred to a new department where none of his qualifications were being utilised.",
  "He was the only one who spotted a critical flaw in his organisation's five-year plan.",
  "He realised mid-semester that he had been preparing the completely wrong syllabus.",
  "He was asked to train a group of inexperienced recruits in a specialised skill within three days.",
  "He was passed over for selection despite clearly being the most qualified candidate.",
  "He was asked to give a two-hour lecture to a group of senior officers on a topic at one hour's notice.",
  "His project received a very poor grade due to the negligence of his partner, not him.",
  "He was the only person in his batch who did not receive a recommendation letter due to a clerical error.",
  "He had to choose between completing his postgraduate studies or accepting an immediate commission.",
  "He was given a performance review that was factually inaccurate and unjustly negative.",
  "His supervisor took sole credit in a public forum for a project he had single-handedly completed.",
  "He discovered that a shortlisting process at his workplace had been rigged against him.",
  "He was the only experienced person available when a complex technical failure occurred.",
  "He found out that new policy changes would make his years of specialised training irrelevant.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 8 — OUTDOOR, ADVENTURE & SURVIVAL
  // ════════════════════════════════════════════════════════════

  "He was leading a group of cadets on a mountain trek when the weather suddenly turned dangerous.",
  "He was on a night march with his team when they got completely lost in a dense forest.",
  "His team's boat engine broke down in the middle of a wide river with the current getting stronger.",
  "He was on a five-day expedition when they ran completely out of food and water on day two.",
  "He was descending a steep cliff when the rope he was using began to fray.",
  "A team member developed a severe allergic reaction during an outdoor training camp far from medical help.",
  "His entire team fell asleep on night watch during a survival exercise.",
  "He had to cross a flooded bridge with a team of younger cadets to reach a stranded village.",
  "A wild animal was spotted near their campsite at 2 AM during a jungle survival exercise.",
  "He was leading a cycle expedition when two bicycles broke down 25 km from any habitation.",
  "He got separated from his group during a night navigation exercise in dense forest.",
  "His team's communication equipment failed during a river crossing in difficult terrain.",
  "He found they had brought the wrong map for a critical navigation challenge.",
  "He had to make a shelter for ten people in harsh cold with very limited available material.",
  "He was the only trained swimmer when a non-swimmer fell into a fast-flowing river.",
  "His parachute partially failed to open during a training jump.",
  "His team had to cross a minefield zone on an unfamiliar route with no mine detection equipment.",
  "Heavy snowfall cut off his patrol from the base camp with rations for only one more day.",
  "He found a badly injured animal in the middle of a jungle trail that was blocking their only path.",
  "His climbing partner froze in fear halfway up a rock face and could neither go up nor come down.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 9 — INTERPERSONAL & FAMILY
  // ════════════════════════════════════════════════════════════

  "His parents were strongly opposed to his decision to join the armed forces as a career.",
  "He discovered his closest friend had been deliberately lying to him for several months.",
  "His roommate was consistently disturbing his study schedule despite repeated polite requests.",
  "A senior colleague always mocked his unconventional ideas in group meetings.",
  "His junior came to him crying after being severely mistreated by another senior.",
  "He was unfairly blamed in front of the entire team by his superior for something he did not do.",
  "He had a serious argument with his best friend the night before they had to work together on a vital task.",
  "He found out that negative rumours about his character were being deliberately spread at his workplace.",
  "His close friend was spiralling into depression and isolating himself from everyone.",
  "His younger sibling had fallen into bad company and was skipping school regularly.",
  "He found that his long-trusted colleague had been spreading misinformation about him to superiors.",
  "A teammate constantly underperformed but always had believable excuses ready.",
  "His mentor suddenly became cold and distant without any explanation right before a critical assessment.",
  "He had to tell a close friend that the business plan they were excited about had a serious flaw.",
  "His partner in a joint venture was not putting in equal effort but expected equal credit.",
  "He found out that a friend was planning to make a decision that could ruin their career.",
  "He was extremely close to a colleague who was suddenly transferred to a very difficult posting.",
  "His family was upset with him for spending too much time on his duties rather than at home.",
  "He discovered his roommate had been using his identity documents without permission.",
  "His best friend's family was in a severe financial crisis and had nowhere to turn.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 10 — STRESS, PRESSURE & TIME MANAGEMENT
  // ════════════════════════════════════════════════════════════

  "He had five equally urgent tasks to complete simultaneously with no one available to assist.",
  "He received critical news of a family emergency in the middle of an ongoing important operation.",
  "His supervisor set an impossible deadline and held him personally responsible for the outcome.",
  "He was extremely exhausted after 36 hours of continuous duty when another urgent task came in.",
  "He was told without warning that he had to present his entire year's work to a panel in 30 minutes.",
  "He was responsible for a major public event that was spiralling completely out of control.",
  "He had to make a high-stakes decision in ten seconds with incomplete information.",
  "He was the only available officer when four separate emergencies erupted simultaneously.",
  "He had just completed a gruelling 20-km march when he was immediately assigned a rescue mission.",
  "He was woken at midnight to handle a situation that required technical knowledge he had not revised in years.",
  "He was asked to cut costs by 40 percent without reducing the quality of an ongoing project.",
  "He had to reorganise a failing project within 48 hours after his predecessor walked out.",
  "He received conflicting urgent orders from two different superiors at the same time.",
  "He was given the responsibility of an unfamiliar department on two days' notice.",
  "His planned presentation got deleted and he had to present from memory in thirty minutes.",
  "He was blamed publicly for a delay that was actually caused by a supplier he had no control over.",
  "He had to simultaneously manage a flood relief operation and a separate unit assessment.",
  "He had to finish a complex technical job with tools that were not designed for that purpose.",
  "His team failed to meet the target at the last minute due to external factors beyond his control.",
  "He was told that funding for his project had been cancelled on the day before final implementation.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 11 — INNOVATION, PROBLEM SOLVING & INITIATIVE
  // ════════════════════════════════════════════════════════════

  "He noticed a serious recurring problem in his unit that everyone else had simply accepted as normal.",
  "He had a cost-saving idea that could benefit the whole organisation but no one senior was willing to listen.",
  "He was given an outdated machine to complete a precision task for which modern equipment was required.",
  "He discovered mid-task that the standard textbook method was not working and time was running out.",
  "He found a significantly better way to accomplish a task but it was against the established procedure.",
  "He was asked to achieve a target that had not been achieved by anyone in his organisation before.",
  "He was the only person with a technical background in a team that needed urgent engineering solutions.",
  "He designed a system from scratch that worked in all tests but failed on the actual day of deployment.",
  "He had only local and improvised materials to complete a task that normally required specialised equipment.",
  "He found that the official plan for an operation had a serious flaw that no one else had noticed.",
  "He was asked to set up a fully operational camp in a new location within 12 hours.",
  "He had to manage a communication breakdown between two units with no electronic equipment.",
  "He was required to map an unknown area using only basic instruments and no GPS.",
  "He found a faster solution to a complex logistics problem but needed approval to implement it.",
  "He was given a budget that was clearly insufficient for the task he had been assigned.",
  "He discovered that none of the standard operating procedures applied to the unique situation he faced.",
  "He had to create a training module for a new skill that no one in his unit had ever learned.",
  "He was tasked with finding a water source for his camp in terrain where water was not visible.",
  "He had to improvise a medical solution when the standard medication was not available.",
  "He was required to communicate a complex technical plan to a group of non-technical villagers.",

  // ════════════════════════════════════════════════════════════
  //  CATEGORY 12 — NATIONAL, CIVIC & PATRIOTIC DUTY
  // ════════════════════════════════════════════════════════════

  "He overheard two strangers in a café discussing what appeared to be a plan to cause public unrest.",
  "He found suspicious unmarked packages abandoned near a crowded public building.",
  "He was on holiday when he heard gunshots near a public market in his city.",
  "He saw a group of people trying to provoke violence between two communities in his town.",
  "He witnessed a group of youths attempting to sabotage a key railway line.",
  "He found out that a trusted person in his neighbourhood was harbouring individuals with extremist links.",
  "He received information suggesting that someone was planning to disrupt a major national event.",
  "He saw a person photographing restricted military infrastructure from a public road.",
  "He was a civilian who found classified documents in a bag left at a bus stop.",
  "He discovered that supplies meant for flood-affected villagers were being stolen and resold.",
  "He was home when he saw armed men forcefully enter a neighbouring house.",
  "He found out that a local official was facilitating the illegal crossing of people across the border.",
  "He saw a factory discharging untreated waste into a river that was a source of drinking water for three villages.",
  "He witnessed encroachment on land officially designated as a wildlife sanctuary.",
  "He found that election material was being distributed in a polling zone in violation of the model code.",
  "He saw a police officer taking money from a driver involved in a minor accident.",
  "He discovered that a local leader was misappropriating funds meant for school infrastructure.",
  "He came across a social media campaign that was deliberately spreading misinformation before an election.",
  "He was the only serviceman present when a natural disaster struck a remote tribal village.",
  "He found that medical supplies sent by the government for a rural health camp had not reached the villagers.",
];

export default SRT_SITUATIONS;
