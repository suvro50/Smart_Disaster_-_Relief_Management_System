import { useState } from "react";
import Button from "../ui/Button";

export default function ResourceForm() {
  const [name, setName] = useState("");
  return (
    <form className="form">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Resource name" />
      <Button type="button">Save Resource</Button>
    </form>
  );
}
