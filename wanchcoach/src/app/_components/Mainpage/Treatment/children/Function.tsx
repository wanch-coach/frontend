import { TreatmentCalendarItems } from "@/app/util/controller/treatmentController";

export const extractFirstFamilyColor = (
  calendarData: TreatmentCalendarItems[],
  familyId: number
): string | null => {
  if (familyId == 0) {
    return "#757575";
  }

  for (const item of calendarData) {
    for (const treatmentItem of item.treatmentItems) {
      if (treatmentItem.familyColor) {
        return treatmentItem.familyColor;
      }
    }
  }
  return null;
};
