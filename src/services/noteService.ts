import axios from "axios";
import type { Note } from "../types/note";

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesProps {
  page: number;
  search?:string
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;


export default async function fetchNotes({page, search}:fetchNotesProps): Promise<NoteHttpResponse> {
  const url = `https://notehub-public.goit.study/api/notes`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      search,
      page,
      perPage: 12,
      ...(search ? { search } : {}),
    }
  };

  const response = await axios.get<NoteHttpResponse>(url, options);
  return response.data;
}
