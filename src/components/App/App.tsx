import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {fetchNotes} from "../../services/noteService";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Paginate from "../Pagination/Pagination";
import { useDebouncedCallback } from 'use-debounce';
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"

export default function App(){

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(search.trim() === "" ? { page } : { page, search }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) return;

      if (data.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [data, search]);

  const noteData = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

const debouncedSearch = useDebouncedCallback((value: string) => {
  setSearch(value);
  setPage(1);
}, 500);

const openModal = () =>{
  setIsModalOpen(true)
}

const closeModal = () =>{
  setIsModalOpen(false);
}



  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBar onSearch={debouncedSearch}/>
        {isSuccess && noteData.length > 0 && (
        <Paginate total={totalPages} onChange={setPage} page={page} />
      )}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isLoading && <Loader/>}
      {isError && <ErrorMessage />}
      {noteData.length>0 && <NoteList dataForMurkup={noteData} />}
      {isModalOpen && 
      <Modal closeModal={closeModal}>
      <NoteForm closeModal={closeModal}/>
      </Modal>
      }
    </div>)
}

