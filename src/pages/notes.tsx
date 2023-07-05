import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SubmitNote from "~/components/submitNote";
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "~/firebaseConfig";
import styles from "~/styles/Notes.module.css";

async function fetchNotes() {
  try {
    const notes = await getDocs(query(collection(db, "notes")));
    const result = notes.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default function NotesApp() {
  function deleteNote(noteId: string) {
    deleteDoc(doc(db, "notes", noteId))
      .then(() => {
        console.log("Note deleted successfully.");
      })
      .catch((error) => {
        console.log("Error deleting note:", error);
      });
  }

  const [filteredNotes, setFilteredNotes] = useState<
    { id: string; title: string; content: string }[]
  >([]);
  const [fuse, setFuse] = useState<Fuse<{ id: string }>[] | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "notes")),
      (snapshot) => {
        const updatedNotes = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setFilteredNotes(updatedNotes);
        setFuse((prevFuse) => {
          if (prevFuse) {
            prevFuse[0] = new Fuse(updatedNotes, {
              keys: ["title", "content"],
            });
            return prevFuse;
          }
          return [new Fuse(updatedNotes, { keys: ["title", "content"] })];
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (fuse) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const results = fuse[0].search(e.target.value);
      setFilteredNotes(
        results.map(
          (result) =>
            result.item as { id: string; title: string; content: string }
        )
      );
    }
  }

  function handleNoteSubmitted() {
    fetchNotes().catch((error) => console.log(error));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-4xl font-bold">Notes</h1>
      <div className="mb-4">
        <input
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          type="text"
          placeholder="Search notes"
          onChange={handleChange}
        />
      </div>
      <div>
        <ul>
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              className="mb-4 rounded-md border border-gray-300 p-4"
            >
              <h2 className="mb-2 text-xl font-bold">{note.title}</h2>
              <p>{note.content}</p>
              <button
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.navbar}>
        <SubmitNote onNoteSubmitted={handleNoteSubmitted} />
      </div>
    </div>
  );
}
