import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-ruled bg-paper p-4">
            <div className="card-index w-full max-w-md space-y-6 p-8 pl-10 text-center">
                <div className="space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                        Card not found
                    </p>
                    <h1 className="font-display text-7xl font-semibold tracking-tight text-rule">
                        404
                    </h1>
                    <h2 className="font-display text-2xl font-semibold text-ink">
                        This page isn't in the catalog
                    </h2>
                    <p className="px-4 text-sm text-ink-soft">
                        The page you're looking for doesn't exist, has been removed, or
                        is temporarily unavailable.
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        to="/"
                        className="inline-block w-full rounded-md bg-ink py-2.5 font-semibold text-paper shadow-sm transition-all duration-200 hover:bg-ink/90 hover:shadow"
                    >
                        Back to my notes
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
