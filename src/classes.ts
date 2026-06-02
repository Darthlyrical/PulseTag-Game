import { PlayerClass, ShotType } from "./types";

export type ClassConfig = {
  hp: number;
  cooldown: number;
  allowedShotTypes: ShotType[];
  disablingCharges: number;
};

export const classConfigs: Record<PlayerClass, ClassConfig> = {
  assault: {
    hp: 100,
    cooldown: 300,
    allowedShotTypes: ["standard", "rapid", "charged", "disabling"],
    disablingCharges: 3,
  },
  tank: {
    hp: 150,
    cooldown: 300,
    allowedShotTypes: ["standard", "charged"],
    disablingCharges: 0,
  },
  sniper: {
    hp: 100,
    cooldown: 700,
    allowedShotTypes: ["charged", "disabling"],
    disablingCharges: 2,
  },
  scout: {
    hp: 80,
    cooldown: 150,
    allowedShotTypes: ["rapid", "standard", "disabling"],
    disablingCharges: 2,
  },
  support: {
    hp: 100,
    cooldown: 300,
    allowedShotTypes: ["standard", "disabling"],
    disablingCharges: 5,
  },
};
