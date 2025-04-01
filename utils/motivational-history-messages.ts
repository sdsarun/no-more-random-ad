import { USER_HISTORY_MILESTONES } from "@/constants/motivational-history-messages";

export default function getMotivationalHistoryMessage(historyEntryCount: number): string {
  let historyMilestoneCategory: keyof typeof USER_HISTORY_MILESTONES;

  if (historyEntryCount < 5) {
    historyMilestoneCategory = "beginner";
  } else if (historyEntryCount < 15) {
    historyMilestoneCategory = "intermediate";
  } else if (historyEntryCount < 30) {
    historyMilestoneCategory = "advanced";
  } else {
    historyMilestoneCategory = "legendary";
  }

  const randomMessageIndex = Math.floor(Math.random() * USER_HISTORY_MILESTONES[historyMilestoneCategory].length);
  return USER_HISTORY_MILESTONES[historyMilestoneCategory][randomMessageIndex];
}