import { useState } from "react";
import Button from "../ui/Button";

export default function VolunteerForm() {
  const [skills, setSkills] = useState("");
  return (
    <form className="form">
      <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills" />
      <Button type="button">Register Volunteer</Button>
    </form>
  );
}
