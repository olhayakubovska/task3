import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  console.log("titl", title);
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function removeItem(id) {
  const notes = await getNotes();

  const updateNotes = notes.filter((item) => item.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(updateNotes));
  return;
}

async function updateItem(noteId, newNote) {
  const notes = await getNotes();

  const updatedNotes = notes.map((note) =>
    note.id === noteId ? { ...note, title: newNote } : note
  );

  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
  return updatedNotes;
}

export { addNote, getNotes, removeItem, updateItem };
