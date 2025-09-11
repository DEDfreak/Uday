import { useDroppable } from '@dnd-kit/core'

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

function ActivityCard({ activity }) {
  const categoryColors = {
    'Relaxing': 'bg-[var(--primary-color)] text-[var(--text-primary)]',
    'Adventurous': 'bg-[#e6f5c8] text-[#4d6613]',
    'Cozy': 'bg-[#dbeafe] text-[#1e40af]',
    'Social': 'bg-[#fee2e2] text-[#991b1b]',
    'Creative': 'bg-[#fef3c7] text-[#92400e]'
  }

  return (
    <div className="group cursor-grab rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        <span className="material-symbols-outlined mt-1 text-2xl text-[var(--text-secondary)]">drag_indicator</span>
        <div className="flex-1">
          <h4 className="font-bold">{activity.title}</h4>
          <p className="text-sm text-[var(--text-secondary)]">{activity.description}</p>
        </div>
        <span className={`ml-auto rounded-full px-3 py-1 text-xs font-bold ${categoryColors[activity.category] || 'bg-gray-200 text-gray-800'}`}>
          {activity.category}
        </span>
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

function WeekendPlan({ weekendPlan, weekendDays, onWeekendDaysChange }) {
  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Your Weekend Plan</h2>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">Drag activities from the list or create new ones to plan your weekend.</p>
      </div>

      <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-4 rounded-lg bg-[var(--bg-secondary)] p-3 shadow-inner">
          <span className="font-bold text-[var(--text-primary)]">Selected Weekend:</span>
          <span className="text-lg font-bold text-[var(--primary-color)]">Oct 28 - 29, 2023</span>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-100">
            <span className="material-symbols-outlined text-xl text-[var(--text-primary)]">calendar_today</span>
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="weekend-days">Number of days:</label>
          <input 
            className="w-20 rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
            id="weekend-days" 
            type="number" 
            value={weekendDays}
            onChange={(e) => onWeekendDaysChange(parseInt(e.target.value) || 2)}
            min="1"
            max="7"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <h3 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <span className="material-symbols-outlined text-4xl text-[var(--primary-color)]">calendar_month</span>
            Saturday, Oct 28
          </h3>
          
          <DropZone id="saturday-drop">
            {weekendPlan.saturday.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            <EmptySlot />
          </DropZone>
        </div>

        <div className="space-y-8">
          <h3 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <span className="material-symbols-outlined text-4xl text-[var(--primary-color)]">calendar_month</span>
            Sunday, Oct 29
          </h3>
          
          <DropZone id="sunday-drop">
            {weekendPlan.sunday.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            <EmptySlot />
            <EmptySlot />
          </DropZone>
        </div>
      </div>

      <hr className="border-t border-[var(--border-color)] my-12"/>
    </>
  )
}

export default WeekendPlan
