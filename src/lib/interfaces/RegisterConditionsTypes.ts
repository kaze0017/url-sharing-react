import exp from "constants";

export type PassConditionType = {
  value: number;
  message: string;
  state: boolean;
};

export type PassConditionsType = {
  length: PassConditionType;
  uppercase: PassConditionType;
  lowercase: PassConditionType;
  special: PassConditionType;
  number: PassConditionType;
};

export type PassConfirmConditionsType = {
  match: boolean;
  message: string;
};


export type EmailConditionsType = {
  valid: boolean;
  message: string;
};

