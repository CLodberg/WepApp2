import { useState } from "react";
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { tasksRef } from "../firebase-config";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [list, setList] = useState("");
  const [share, setShare] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = {
      title: title,
      body: body,
      list: list,
      share: share,
      uid: "",
      createdAt: serverTimestamp(),
    };
    addDoc(tasksRef, newTask);
    console.log(newTask);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Hvilken opgave{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Hvilken liste skal opgaven på?
        <select
          type="text"
          value={list}
          onChange={(e) => setList(e.target.value)}
        >
          <option value="Gruppe">Gruppeliste</option>
          <option value="Personlig">Din liste</option>
        </select>
      </label>
      <br></br>
      <label>
        Hvordan skal opgaven fordeles?
        <select
          type="text"
          value={share}
          onChange={(e) => setShare(e.target.value)}
        >
          <option value="Deles">Fordeles mellem gruppemedlemmer</option>
          <option value="Tildeles">Tildeles bestemt person</option>
        </select>
      </label>
      <br></br>
      <label>
        Beskrivelse af opgaven
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        Beskrivelse af opgaven
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>

      <button type="submit">Opret ny opgave</button>
    </form>
  );
}
