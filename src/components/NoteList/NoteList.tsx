import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import {deleteNote} from "../../services/noteService"
import { toast } from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: (noteId: number)=>{return deleteNote(noteId);},
  onSuccess: () => {
    toast.success("Note deleted");
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
  onError(){
    toast.error("Failed to delete note");
  }
});

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={()=> mutation.mutate(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
