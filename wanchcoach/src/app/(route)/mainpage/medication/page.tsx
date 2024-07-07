import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export default function Medication() {
  const familyId = Cookies.get("myFamilyId");
  redirect(`/mainpage/medication/taking/${familyId}`);
}
