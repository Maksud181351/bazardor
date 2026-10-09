/* eslint-disable @next/next/no-img-element */
export default function Avatar({
  name,
  image,
  className = "h-9 w-9",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();
  if (image) {
    return (
      <img
        src={image}
        alt={name ?? "প্রোফাইল ছবি"}
        referrerPolicy="no-referrer"
        className={`${className} rounded-full object-cover`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`${className} grid place-items-center rounded-full bg-primary/15 font-bold text-primary`}
    >
      {initial}
    </span>
  );
}
