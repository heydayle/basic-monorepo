export default function ErrorMessage({ message }: { message?: string }) {
  const visibleClass = message ? 'h-4' : 'h-0 opacity-0'
  return (
    <div className={`relative text-red-500 text-sm transition-all duration-300 ${visibleClass}`}>
      {message}
    </div>
  )
}
