import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

function App() {
  const [seconds, setSeconds] = useState(0)
  const time = useMemo(() => dayjs().format('MMM DD YYYY, HH:mm:ss A'), [seconds])

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s < 60 ? s + 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className='h-svh text-center'>
      <h1 className='font-bold text-xl text-dark'>Welcome to Insight Hubs</h1>
      <h2>{time}</h2>
    </div>
  )
}

export default App
