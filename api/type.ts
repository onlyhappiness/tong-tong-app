/** 펫 단계 */
export type PetStage = "EGG" | "HATCHED" | "EVOLVED" | "RELEASED";

/** 펫 종류 */
export type Species = "POODLE" | "CAT" | "TURTLE";

export type PetResponse = {
  id: string;
  stage: PetStage;
  species: Species | null;
  hatchedAt: string;
  evolvedAt: string;
  releasedAt: string | null;
  hunger: number;
  intimacy: number;
  petting: { used: number; max: number };
  coins?: number;
};

export type Pet = Omit<PetResponse, "coins">;

export type Wallet = { coins: number };

export type AttendanceStatus = { checkedIn: boolean };

export type AttendanceCheckIn = { amount: number; coins: number };
