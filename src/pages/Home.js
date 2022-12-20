import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/user/useAuthContext'

const Home = () => {
  const [workouts, setWorkouts] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/rootcollections', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json)
      }
    }
    if (user) {
      fetchWorkouts()
    }
  }, [user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <p key={workout._id}>{workout.name}</p>
        ))}
      </div>
    </div>
  )
}

export default Home