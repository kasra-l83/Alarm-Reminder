import { useAlarm } from "./hooks/useAlarms"
import AlarmForm from "./components/alarmForm"
import { AlarmList } from "./components/alarmList"

function App() {
  const { alarms, addAlarm, sortAlarms } = useAlarm()
  return (
    <main className="container mx-auto space-y-5 my-5">
      <h1 className="text-3xl text-center font-bold">Alarm Reminder App</h1>
      <AlarmForm onSubmit={addAlarm}/>
      <AlarmList alarms={alarms} sortAlarms={sortAlarms}/>
    </main>
  )
}
export default App