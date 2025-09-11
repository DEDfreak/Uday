
import { useState, useEffect, useRef } from 'react'
import aiService from '../services/aiService'

const categories = ['All', 'Relaxing', 'Adventurous', 'Cozy', 'Social', 'Creative']

function Sidebar({ isOpen, onClose, filters, onFiltersChange, newActivity, onNewActivityChange, onAddActivity, weekendDays, selectedDate, focusActivityName, onFocusActivityName }) {
  const activityNameRef = useRef(null)
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (focusActivityName && activityNameRef.current) {
      activityNameRef.current.focus()
      onFocusActivityName()
    }
  }, [focusActivityName, onFocusActivityName])

  const handleActivityNameChange = async (e) => {
    const value = e.target.value
    onNewActivityChange({ ...newActivity, name: value })
    
    if (value.length > 2) {
      try {
        const suggestions = await aiService.generateActivities(value, newActivity.category || 'All', 3)
        setAiSuggestions(suggestions)
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error generating suggestions:', error)
      }
    } else {
      setShowSuggestions(false)
      setAiSuggestions([])
    }
  }

  const selectSuggestion = (suggestion) => {
    onNewActivityChange({
      ...newActivity,
      name: suggestion.title,
      description: suggestion.description,
      category: suggestion.category
    })
    setShowSuggestions(false)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activityNameRef.current && !activityNameRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-20 flex w-72 transform flex-col border-r border-[var(--border-color)] bg-[var(--bg-primary)] p-6 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close button for mobile */}
        <button 
          className="lg:hidden absolute top-4 right-4 text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="flex items-center gap-2.5 mb-8">
          <svg className="h-8 w-8 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_319)">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
            </g>
            <defs>
              <clipPath id="clip0_6_319">
                <rect fill="white" height="48" width="48"></rect>
              </clipPath>
            </defs>
          </svg>
          <h1 className="text-2xl font-bold tracking-tight">Weekendly</h1>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Filter Activities</h3>
          
          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="category">Category</label>
            <select 
              className="mt-1 block w-full rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
              id="category"
              value={filters.category}
              onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="search">Search</label>
            <input 
              className="mt-1 block w-full rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
              id="search" 
              placeholder="e.g. Brunch, Hiking" 
              type="text"
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            />
          </div>

          <hr className="border-t border-[var(--border-color)] my-6"/>

          <h3 className="text-lg font-bold text-[var(--text-primary)]">Add New Activity</h3>
          
          <div className="relative">
            <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="activityName">Activity Name</label>
            <input 
              ref={activityNameRef}
              className="mt-1 block w-full rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
              id="activityName" 
              type="text"
              value={newActivity.name}
              onChange={handleActivityNameChange}
              placeholder="Type to get AI suggestions..."
            />
            
            {/* AI Suggestions Dropdown */}
            {showSuggestions && aiSuggestions.length > 0 && (
              <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-[var(--border-color)] max-h-60 overflow-y-auto">
                <div className="p-2 text-xs text-[var(--text-secondary)] font-medium border-b border-[var(--border-color)]">
                  <span className="material-symbols-outlined text-sm mr-1">auto_awesome</span>
                  AI Suggestions
                </div>
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id || index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left p-3 hover:bg-[var(--bg-secondary)] transition-colors border-b border-[var(--border-color)] last:border-b-0"
                  >
                    <div className="font-medium text-[var(--text-primary)]">{suggestion.title}</div>
                    <div className="text-sm text-[var(--text-secondary)] mt-1">{suggestion.description}</div>
                    <div className="text-xs text-[var(--primary-color)] mt-1 font-medium">{suggestion.category}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="activityDescription">Description</label>
            <textarea 
              className="mt-1 block w-full rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
              id="activityDescription" 
              rows="3"
              value={newActivity.description}
              onChange={(e) => onNewActivityChange({ ...newActivity, description: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="activityCategory">Category</label>
            <select 
              className="mt-1 block w-full rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
              id="activityCategory"
              value={newActivity.category || ''}
              onChange={(e) => onNewActivityChange({ ...newActivity, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.filter(cat => cat !== 'All').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]" htmlFor="activityDate">Add to Date</label>
            <select 
              className="mt-1 block w-full rounded-lg border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
              id="activityDate"
              value={newActivity.selectedDay || ''}
              onChange={(e) => onNewActivityChange({ ...newActivity, selectedDay: e.target.value })}
            >
              <option value="">Select Day</option>
              {Array.from({ length: weekendDays }, (_, i) => {
                const date = new Date(selectedDate)
                date.setDate(selectedDate.getDate() + i)
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                const dayName = dayNames[date.getDay()]
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                return (
                  <option key={i} value={i}>
                    {dayName}, {formattedDate}
                  </option>
                )
              })}
            </select>
          </div>

          <button 
            className="mt-4 w-full rounded-lg bg-[var(--primary-color)] py-2.5 px-4 font-bold text-[var(--text-primary)] transition-colors hover:bg-yellow-400" 
            type="submit"
            onClick={onAddActivity}
          >
            Add Activity
          </button>
        </form>
      </aside>
    </>
  )
}

export default Sidebar
