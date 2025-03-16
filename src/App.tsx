import { useState } from "react"
import { IAlarm } from "./types/alarm"
import { useAlarm } from "./hooks/useAlarms"
import AlarmForm from "./components/alarmForm"
import { AlarmList } from "./components/alarmList"
import { EditModal } from "./components/editModal"

function App() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editingAlarm, setEditingAlarm] = useState<IAlarm | null>(null);
  const { alarms, addAlarm, sortAlarms, deleteAlarm, updateAlarm } = useAlarm()

  const handleEdit= (alarm: IAlarm) =>{
    setEditingAlarm(alarm)
    setEditModalOpen(true)
  }

  const handleSaveEdit= (updatedAlarm: IAlarm) =>{
    updateAlarm(updatedAlarm)
    setEditModalOpen(false)
    setEditingAlarm(null)
  }

  return (
    <main className="container mx-auto space-y-5 my-5">
      <h1 className="text-3xl text-center font-bold">Alarm Reminder App</h1>
      <AlarmForm onSubmit={addAlarm}/>
      <AlarmList alarms={alarms} sort={sortAlarms} onDelete={deleteAlarm} edit={handleEdit}/>
      <EditModal alarm={editingAlarm} save={handleSaveEdit} open={editModalOpen}/>
    </main>
  )
}
export default App