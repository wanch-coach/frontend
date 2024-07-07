import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export default function Treatment() {
  const familyId = Cookies.get("myFamilyId");
  redirect(`/mainpage/medication/diagnosis/${familyId}`);
}
