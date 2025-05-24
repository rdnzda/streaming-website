export default function ToggleButton({ selected, onSelect }) {
  return (
    <div className="relative flex border-1 border-black rounded-full overflow-hidden w-fit text-md">
      <div
        className={`absolute top-0 left-0 h-full rounded-full transition-transform duration-300 bg-gray-900 z-10 ${
          selected === "week" ? "translate-x-32 w-[150px]" : "translate-x-0 w-[130px]"
        }`}
      />

      <button
        onClick={() => onSelect("day")}
        className={`flex items-center px-5 py-1 font-semibold relative z-10 transition-colors duration-300 ${
          selected === "day" ? "bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text" : "text-black"
        }`}
      >
        Aujourd'hui
      </button>

      <button
        onClick={() => onSelect("week")}
        className={`flex items-center px-5 py-1 font-semibold relative z-10 transition-colors duration-300 ${
          selected === "week" ? "bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text" : "text-black"
        }`}
      >
        Cette semaine
      </button>
    </div>
  );
}
