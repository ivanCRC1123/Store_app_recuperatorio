interface CategoryPillProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {};

export function CategoryPill({ name, active, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all duration-200 ${
        active ? "scale-110" : "opacity-60 hover:opacity-100"
      }`}
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl transition-all duration-200 sm:h-20 sm:w-20 sm:text-3xl ${
          active
            ? "bg-emerald-500/20 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/50"
            : "bg-zinc-800/60 hover:bg-zinc-800 hover:shadow-md"
        }`}
      >
        {CATEGORY_ICONS[name] ?? "🍽️"}
      </span>
      <span
        className={`text-xs font-medium capitalize ${
          active ? "text-emerald-400" : "text-zinc-500"
        }`}
      >
        {name}
      </span>
    </button>
  );
}
