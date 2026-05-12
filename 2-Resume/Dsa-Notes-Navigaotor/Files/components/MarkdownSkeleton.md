export default function MarkdownSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div
        className="h-8 w-3/4 rounded bg-transparent hover:bg-gray-300"
      />
      <div className="h-4 w-full rounded bg-gray-100" />
      <div className="h-4 w-5/6 rounded bg-gray-100" />
      <div className="h-4 w-4/6 rounded bg-gray-100" />

      <div className="h-6 w-1/2 rounded bg-gray-200 mt-6" />
      <div className="h-4 w-full rounded bg-gray-100" />
      <div className="h-4 w-5/6 rounded bg-gray-100" />
      <div className="h-4 w-3/6 rounded bg-gray-100" />
    </div>
  );
}
