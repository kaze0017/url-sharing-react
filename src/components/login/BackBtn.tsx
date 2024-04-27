
export default function BackBtn({
  message,
  backToHref,
}: {
  message: string;
  backToHref: string;
}) {
  return (
    <a href={backToHref}>
      <p className="text-xs">{message}</p>
    </a>
  );
}
