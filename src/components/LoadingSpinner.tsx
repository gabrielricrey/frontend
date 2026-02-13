
export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex items-center justify-center"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
    </div>
  )
}