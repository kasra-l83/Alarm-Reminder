import { useAlarm } from "./hooks/useAlarms"
import AlarmForm from "./components/alarmForm"

function App() {
  const { addAlarm } = useAlarm()
  return (
    <main className="container mx-auto space-y-5 mt-5">
      <h1 className="text-3xl text-center font-bold">Alarm Reminder App</h1>
      <AlarmForm onSubmit={addAlarm}/>
    </main>
  )
}
export default App