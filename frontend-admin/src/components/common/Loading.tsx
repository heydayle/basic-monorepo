function Loading() {
    const waves = [1, 2, 3]
  return (
    <div className='flex justify-center items-center h-screen w-full bg-white dark:bg-neutral-800'>
      <div className='flex gap-1'>
        {waves.map((wave) => (
          <div key={wave} className={`w-2 h-10 rounded-full animate-pulse bg-blue-500 dark:bg-blue-400 wave-${wave}`}></div>
        ))}
      </div>
    </div>
  )
}

export default Loading
