import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

function ThemaToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('thema');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;

      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('thema', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('thema', 'light');
      }

      return next;
    });
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full transition bg-slate-200 dark:bg-slate-700  cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiMoon className="h-5 w-5 text-yellow-400" />
      ) : (
        <FiSun className="h-5 w-5 text-orange-500" />
      )}
    </button>
  );
}

export default ThemaToggle;
