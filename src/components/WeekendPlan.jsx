import { useDroppable, useDraggable } from '@dnd-kit/core'
import { useState } from 'react'

function DropZone({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  
  return (
    <div 
      ref={setNodeRef} 
      className={`space-y-6 rounded-2xl bg-[var(--bg-secondary)] p-6 shadow-inner ${isOver ? 'ring-2 ring-[var(--primary-color)]' : ''}`}
    >
      {children}
    </div>
  )
}

function DraggableActivityCard({ activity, dayIndex, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `activity-${activity.id}-${dayIndex}`,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const categoryColors = {
    'Relaxing': 'bg-[var(--primary-color)] text-[var(--text-primary)]',
    'Adventurous': 'bg-[#e6f5c8] text-[#4d6613]',
    'Cozy': 'bg-[#dbeafe] text-[#1e40af]',
    'Social': 'bg-[#fee2e2] text-[#991b1b]',
    'Creative': 'bg-[#fef3c7] text-[#92400e]'
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      {...listeners} 
      {...attributes}
      className={`group cursor-grab rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-4">
        <span className="material-symbols-outlined mt-1 text-2xl text-[var(--text-secondary)]">drag_indicator</span>
        <div className="flex-1">
          <h4 className="font-bold">{activity.title}</h4>
          <p className="text-sm text-[var(--text-secondary)]">{activity.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[activity.category] || 'bg-gray-200 text-gray-800'}`}>
            {activity.category}
          </span>
          <button 
            onClick={() => onRemove(activity.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function EmptySlot() {
  return (
    <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-color)] bg-white/50 p-6 text-center">
      <div className="text-[var(--text-secondary)]">
        <span className="material-symbols-outlined text-4xl">add_box</span>
        <p className="mt-2 text-sm font-medium">Drag an activity here or add a new one</p>
      </div>
    </div>
  )
}

function WeekendPlan({ weekendPlan, weekendDays, onWeekendDaysChange, onWeekendPlanChange, selectedDate, onSelectedDateChange }) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getDateRange = (startDate, days) => {
    const dates = []
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const generateDayNames = (startDate, days) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dates = getDateRange(startDate, days)
    return dates.map(date => ({
      name: dayNames[date.getDay()],
      date: formatDate(date),
      id: `day-${date.getTime()}`
    }))
  }

  const dayNames = generateDayNames(selectedDate, weekendDays)

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value)
    onSelectedDateChange(newDate)
    setShowCalendar(false)
  }

  const handleDaysChange = (newDays) => {
    onWeekendDaysChange(newDays)
    // Update weekend plan structure to match new number of days
    const newPlan = {}
    for (let i = 0; i < newDays; i++) {
      const dayKey = `day${i}`
      newPlan[dayKey] = weekendPlan[dayKey] || []
    }
    onWeekendPlanChange(newPlan)
    // Reset carousel to first day
    setCurrentDayIndex(0)
  }

  const handleRemoveActivity = (activityId) => {
    const newPlan = { ...weekendPlan }
    Object.keys(newPlan).forEach(dayKey => {
      newPlan[dayKey] = newPlan[dayKey].filter(activity => activity.id !== activityId)
    })
    onWeekendPlanChange(newPlan)
  }

  const handleMoveActivity = (activityId, fromDayIndex, toDayIndex) => {
    const newPlan = { ...weekendPlan }
    const fromDayKey = `day${fromDayIndex}`
    const toDayKey = `day${toDayIndex}`
    
    // Find and remove activity from source day
    const activity = newPlan[fromDayKey]?.find(a => a.id === activityId)
    if (activity) {
      newPlan[fromDayKey] = newPlan[fromDayKey].filter(a => a.id !== activityId)
      // Add to destination day
      newPlan[toDayKey] = [...(newPlan[toDayKey] || []), activity]
      onWeekendPlanChange(newPlan)
    }
  }

  const nextDay = () => {
    setCurrentDayIndex(prev => Math.min(prev + 2, weekendDays - 2))
  }

  const prevDay = () => {
    setCurrentDayIndex(prev => Math.max(prev - 2, 0))
  }

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Your Weekend Plan</h2>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">Drag activities from the list or create new ones to plan your weekend.</p>
      </div>

      <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-4 rounded-lg bg-[var(--bg-secondary)] p-3 shadow-inner">
          <span className="font-bold text-[var(--text-primary)]">Selected Weekend:</span>
          <span className="text-lg font-bold text-[var(--primary-color)]">
            {dayNames.length > 1 
              ? `${dayNames[0].date} - ${dayNames[dayNames.length - 1].date}`
              : dayNames[0].date
            }
          </span>
          <div className="relative">
            <button 
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-100"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span className="material-symbols-outlined text-xl text-[var(--text-primary)]">calendar_today</span>
            </button>
            {showCalendar && (
              <div className="absolute top-12 left-0 z-50 bg-white rounded-lg shadow-lg border border-[var(--border-color)] p-4">
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={handleDateChange}
                  className="w-full p-2 border border-[var(--border-color)] rounded focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="weekend-days">Number of days:</label>
          <input 
            className="w-20 rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
            id="weekend-days" 
            type="number" 
            value={weekendDays}
            onChange={(e) => handleDaysChange(parseInt(e.target.value) || 2)}
            min="1"
            max="7"
          />
        </div>
      </div>

      {weekendDays <= 2 ? (
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
          {dayNames.map((day, index) => (
            <div key={day.id} className="space-y-8">
              <h3 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                <span className="material-symbols-outlined text-4xl text-[var(--primary-color)]">calendar_month</span>
                {day.name}, {day.date}
              </h3>
              
              <DropZone id={`day-${index}-drop`}>
                {(weekendPlan[`day${index}`] || []).map(activity => (
                  <DraggableActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    dayIndex={index}
                    onRemove={handleRemoveActivity}
                  />
                ))}
                <EmptySlot />
              </DropZone>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Carousel Navigation */}
          <div className="flex items-center justify-between">
            <button 
              onClick={prevDay}
              disabled={currentDayIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(weekendDays / 2) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentDayIndex(i * 2)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentDayIndex / 2) === i ? 'bg-[var(--primary-color)]' : 'bg-[var(--border-color)]'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextDay}
              disabled={currentDayIndex >= weekendDays - 2}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Two Day Cards */}
          <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
            {[currentDayIndex, currentDayIndex + 1].map((dayIndex) => {
              if (dayIndex >= weekendDays) return null
              const day = dayNames[dayIndex]
              return (
                <div key={day.id} className="space-y-8">
                  <h3 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                    <span className="material-symbols-outlined text-4xl text-[var(--primary-color)]">calendar_month</span>
                    {day.name}, {day.date}
                  </h3>
                  
                  <DropZone id={`day-${dayIndex}-drop`}>
                    {(weekendPlan[`day${dayIndex}`] || []).map(activity => (
                      <DraggableActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        dayIndex={dayIndex}
                        onRemove={handleRemoveActivity}
                      />
                    ))}
                    <EmptySlot />
                  </DropZone>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <hr className="border-t border-[var(--border-color)] my-12"/>
    </>
  )
}

export default WeekendPlan
