import { useState } from "react";
import Button from "../ui/Button";

export default function AidRequestForm() {
  const [requestType, setRequestType] = useState("food");
  return (
    <form className="form">
      <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
        <option value="food">Food</option>
        <option value="water">Water</option>
        <option value="medicine">Medicine</option>
        <option value="shelter">Shelter</option>
        <option value="rescue">Rescue</option>
        <option value="clothing">Clothing</option>
      </select>
      <Button type="button">Send Aid Request</Button>
    </form>
  );
}
