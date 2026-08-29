
import { lazy, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch } from "react-icons/fi";
import { AxiosInstance } from "../config/axiosIntance";
import { useAuth } from "../context/UserContextProvider";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";

const Navbar = lazy(() => import("../components/Navbar"));

const Home = () => {
  const { user } = useAuth();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); // null = add mode
  const [isSaving, setIsSaving] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const resp = await AxiosInstance.get(
        `/notes?userId=${user.id}&_sort=updatedAt&_order=desc`
      );
      setNotes(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const openAddModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleSaveNote = async (formData) => {
    setIsSaving(true);
    const now = new Date().toISOString();

    try {
      if (editingNote) {
        const resp = await AxiosInstance.patch(`/notes/${editingNote.id}`, {
          ...formData,
          updatedAt: now,
        });
        setNotes((prev) =>
          prev.map((n) => (n.id === editingNote.id ? resp.data : n))
        );
        toast.success("Note updated");
      } else {
        const resp = await AxiosInstance.post("/notes", {
          ...formData,
          userId: user.id,
          pinned: false,
          createdAt: now,
          updatedAt: now,
        });
        setNotes((prev) => [resp.data, ...prev]);
        toast.success("Note added");
      }
      setIsModalOpen(false);
      setEditingNote(null);
    } catch (error) {
      console.log(error);
      toast.error(editingNote ? "Unable to update note" : "Unable to add note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (note) => {
    const confirmed = window.confirm(`Delete "${note.title}"? This can't be undone.`);
    if (!confirmed) return;

    const previousNotes = notes;
    setNotes((prev) => prev.filter((n) => n.id !== note.id)); // optimistic update

    try {
      await AxiosInstance.delete(`/notes/${note.id}`);
      toast.success("Note deleted");
    } catch (error) {
      console.log(error);
      setNotes(previousNotes); // rollback on failure
      toast.error("Unable to delete note");
    }
  };

  const handleTogglePin = async (note) => {
    const previousNotes = notes;
    const updated = { ...note, pinned: !note.pinned };
    setNotes((prev) => prev.map((n) => (n.id === note.id ? updated : n)));

    try {
      await AxiosInstance.patch(`/notes/${note.id}`, { pinned: updated.pinned });
    } catch (error) {
      console.log(error);
      setNotes(previousNotes);
      toast.error("Unable to update note");
    }
  };

  const filteredNotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = term
      ? notes.filter(
          (n) =>
            n.title.toLowerCase().includes(term) ||
            n.content.toLowerCase().includes(term)
        )
      : notes;

    return [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [notes, search]);

  return (
    <div className="bg-ruled min-h-screen bg-paper">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Notebook
            </p>
            <h1 className="font-display text-2xl font-semibold text-ink">
              Hey {user?.username} 👋
            </h1>
            <p className="text-sm text-ink-soft">
              {notes.length} note{notes.length !== 1 ? "s" : ""} in your notebook
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-paper-line bg-card py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20 sm:w-64"
              />
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-ink px-4 py-2.5 font-semibold text-paper shadow-sm transition-all duration-200 hover:bg-ink-dark hover:shadow"
            >
              <FiPlus /> New Note
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-md border border-paper-line bg-card"
              />
            ))}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="card-index flex flex-col items-center justify-center py-20 pl-10 text-center">
            <p className="text-5xl">📝</p>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink">
              {search ? "No notes match your search" : "This page is blank"}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              {search
                ? "Try a different keyword."
                : "Click 'New Note' to write your first entry."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={openEditModal}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        initialData={editingNote}
        onClose={closeModal}
        onSave={handleSaveNote}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Home;
