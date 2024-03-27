import { HiStar } from "react-icons/hi";

export default function RatingStar({ rate }: { rate: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <HiStar
          key={index}
          className={`size-6 transition-colors ${
            rate > index ? "text-amber-500" : "text-neutral-300"
          }`}
        />
      ))}
    </div>
  );
}
