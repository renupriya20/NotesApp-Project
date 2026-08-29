import { FaRegEdit, FaRegTrashAlt, FaThumbtack } from "react-icons/fa";

const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
    return (
        <div className="card-index group relative flex flex-col justify-between p-5 pl-9 pt-6">
            {note.pinned && <span className="washi-tape" aria-hidden="true" />}

            <button
                type="button"
                onClick={() => onTogglePin(note)}
                title={note.pinned ? "Unpin note" : "Pin note"}
                className={`absolute right-4 top-4 rounded-full p-1.5 transition-colors ${note.pinned
                        ? "text-rule"
                        : "text-paper-line opacity-0 group-hover:opacity-100 group-hover:text-ink-soft hover:!text-rule"
                    }`}
            >
                <FaThumbtack className="text-sm" />
            </button>

            <div className="pr-6">
                <h3 className="mb-2 line-clamp-1 font-display text-lg font-semibold text-ink">
                    {note.title}
                </h3>
                <p className="line-clamp-4 whitespace-pre-wrap text-sm text-ink-soft">
                    {note.content}
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-paper-line pt-3">
                <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                    {formatDate(note.updatedAt)}
                </span>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onEdit(note)}
                        title="Edit note"
                        className="text-ink-faint transition-colors hover:text-ink"
                    >
                        <FaRegEdit />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(note)}
                        title="Delete note"
                        className="text-ink-faint transition-colors hover:text-rule"
                    >
                        <FaRegTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
