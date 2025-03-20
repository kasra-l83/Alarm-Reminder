import { useEffect, useState } from "react"
import type { IAlarm } from "./types/alarm"
import { useAlarm } from "./hooks/useAlarms"
import AlarmForm from "./components/alarmForm"
import { AlarmList } from "./components/alarmList"
import { EditModal } from "./components/editModal"
import { AlarmModal } from "./components/alarmModal"

function App() {
  const [editAlarm, setEditAlarm] = useState<IAlarm | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [alarmModalOpen, setAlarmModalOpen] = useState<boolean>(false);
  const [triggeredAlarm, setTriggeredAlarm] = useState<IAlarm | null>(null);
  const { alarms, addAlarm, sortAlarms, deleteAlarm, updateAlarm } = useAlarm()

  const handleEdit= (alarm: IAlarm) =>{
    setEditAlarm(alarm)
    setEditModalOpen(true)
  }
  const handleSaveEdit= (updatedAlarm: IAlarm) =>{
    updateAlarm(updatedAlarm)
    setEditModalOpen(false)
  }
  const delet= () =>{
    deleteAlarm(triggeredAlarm?.id as string)
    setAlarmModalOpen(false)
  }
  const disableHandler= (id: string) =>{
    const alarmToDisable= alarms.find(alarm => alarm.id=== id);
    if (alarmToDisable) {
      const updatedAlarm= { ...alarmToDisable, active: false };
      updateAlarm(updatedAlarm);
    }
    setAlarmModalOpen(false);
  }
  const handleSnooze = (id: string) =>{
    const alarmToSnooze = alarms.find(alarm => alarm.id === id);
    
    if (alarmToSnooze) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5);
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const newTime = `${hours}:${minutes}`;
      const updatedAlarm = { ...alarmToSnooze, time: newTime };
      updateAlarm(updatedAlarm);
    }
    setAlarmModalOpen(false);
  }

  useEffect(() =>{
    const interval= setInterval(() =>{
      const current= new Date().toTimeString().slice(0, 5);
      alarms.forEach((alarm) =>{
        if (alarm.time=== current) {
          setTriggeredAlarm(alarm);
          setAlarmModalOpen(true);
        }
      })
    }, 1000)
    return () => clearInterval(interval);
  }, [alarms])

  return (
    <main className="container mx-auto space-y-5 my-5">
      <h1 className="text-3xl text-center font-bold">Alarm Reminder App</h1>
      <AlarmForm onSubmit={addAlarm}/>
      <AlarmList alarms={alarms} sort={sortAlarms} onDelete={deleteAlarm} edit={handleEdit}/>
      <EditModal alarm={editAlarm} onSubmit={handleSaveEdit} open={editModalOpen} close={() => setEditModalOpen(false)}/>
      <AlarmModal alarm={triggeredAlarm} open={alarmModalOpen} onDelete={delet} disable={disableHandler} snooze={handleSnooze}/>
    </main>
  )
}
export default App