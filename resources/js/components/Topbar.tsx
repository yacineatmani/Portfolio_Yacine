export default function Topbar({
    onMenuClick,
    user,
    darkMode,
    onToggleDarkMode,
}: {
    onMenuClick: () => void;
    user: { name: string; photo?: string };
    darkMode: boolean;
    onToggleDarkMode: () => void;
}) {
    return (
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <span className="material-icons">menu</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleDarkMode}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <span className="material-icons">light_mode</span> : <span className="material-icons">dark_mode</span>}
                    </button>

                    <div className="flex items-center gap-2">
                        <img
                            src={
                                user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=32`
                            }
                            alt="Avatar"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="hidden text-sm font-medium text-gray-700 sm:block dark:text-gray-300">{user.name}</span>
                    </div>

                    <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                        <span className="material-icons">settings</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
