export enum RoastPersona {
  COMEDIAN = 'Sarcastic Comedian',
  DRILL_SERGEANT = 'Drill Sergeant',
  SASSY_FRIEND = 'Sassy Friend',
  GRUMPY = 'Old Grumpy Person',
  GEN_Z = 'Gen Z'
}

export enum RoastCategory {
  GENERAL = 'General',
  APPEARANCE = 'Appearance',
  INTELLIGENCE = 'Intelligence',
  SKILLS = 'Skills',
  HABITS = 'Habits'
}

export type RoastLevel = 1 | 2 | 3 | 4 | 5;

export interface RoastRequest {
  criticism: string;
  persona: RoastPersona;
  category: RoastCategory;
  level: RoastLevel;
}

export interface RoastResponse {
  roast: string;
}

export interface RoastError {
  message: string;
}
