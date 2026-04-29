import { useState } from "react";
import Button from "../ui/Button";

export default function DisasterReportForm() {
  const [title, setTitle] = useState("");
  return (
    <form className="form">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Disaster title" />
      <Button type="button">Submit Report</Button>
    </form>
  );
}
