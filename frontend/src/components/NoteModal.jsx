import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const emptyForm = { title: "", content: "" };

const NoteModal = ({ isOpen, initialData, onClose, onSave, isSaving }) => {
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (isOpen) {
            setFormData(
                initialData
                    ? { title: initialData.title, content: initialData.content }
                    : emptyForm
            );
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) return;
        onSave(formData);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-[2px]"
            onClick={onClose}
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                className="card-index w-full max-w-lg space-y-5 p-6 pl-10 pt-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                            {initialData ? "Editing entry" : "New entry"}
                        </p>
                        <h2 className="font-display text-xl font-semibold text-ink">
                            {initialData ? "Edit Note" : "New Note"}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-ink-faint hover:bg-paper hover:text-ink"
                    >
                        <IoClose className="text-xl" />
                    </button>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="title"
                        className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Note title"
                        value={formData.title}
                        onChange={handleChange}
                        maxLength={80}
                        autoFocus
                        className="w-full rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="content"
                        className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={6}
                        placeholder="Write your note here..."
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full resize-none rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2.5 font-semibold text-ink-soft transition-colors hover:bg-paper"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-lg bg-ink px-5 py-2.5 font-semibold text-paper shadow-sm transition-all duration-200 hover:bg-ink-dark hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSaving ? "Saving..." : initialData ? "Save Changes" : "Add Note"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteModal;
