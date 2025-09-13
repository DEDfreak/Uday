import { useState, useEffect } from 'react'
import { useDraggable } from '@dnd-kit/core'
import aiService from '../services/aiService'

function DraggableActivityCard({ activity, isAI = false }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: activity.id,
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
      style={{...style, touchAction: 'none'}} 
      {...listeners} 
      {...attributes}
      className={`group snap-center shrink-0 cursor-grab rounded-2xl bg-white p-3 sm:p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] select-none ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="relative">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
          <div 
            className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
            style={{ backgroundImage: `url("${activity.image}")` }}
          />
        </div>
        {isAI ? (
          <span className="absolute top-2 right-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI
          </span>
        ) : (
          <span className={`absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${categoryColors[activity.category] || 'bg-gray-200 text-gray-800'}`}>
            {activity.category}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold leading-tight line-clamp-2">{activity.title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-3 leading-relaxed">{activity.description}</p>
    </div>
  )
}

function ActivityBrowser({ activities, aiActivities, onAiActivitiesGenerated, onPlanNow }) {
  const [activeTab, setActiveTab] = useState('normal')
  const [aiSearch, setAiSearch] = useState('')
  const [generatedActivities, setGeneratedActivities] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  const getNextLongWeekend = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    
    // Common long weekends in 2024-2025
    const longWeekends = [
      { name: 'New Year\'s Day', date: new Date(currentYear, 0, 1) },
      { name: 'Martin Luther King Jr. Day', date: new Date(currentYear, 0, 15) },
      { name: 'Presidents\' Day', date: new Date(currentYear, 1, 19) },
      { name: 'Memorial Day', date: new Date(currentYear, 4, 27) },
      { name: 'Independence Day', date: new Date(currentYear, 6, 4) },
      { name: 'Labor Day', date: new Date(currentYear, 8, 2) },
      { name: 'Thanksgiving', date: new Date(currentYear, 10, 28) },
      { name: 'Christmas Day', date: new Date(currentYear, 11, 25) },
    ]
    
    // Add next year's holidays if we're past this year's
    if (today.getMonth() > 10) {
      longWeekends.push(
        { name: 'New Year\'s Day', date: new Date(currentYear + 1, 0, 1) },
        { name: 'Martin Luther King Jr. Day', date: new Date(currentYear + 1, 0, 15) },
        { name: 'Presidents\' Day', date: new Date(currentYear + 1, 1, 19) },
        { name: 'Memorial Day', date: new Date(currentYear + 1, 4, 27) },
        { name: 'Independence Day', date: new Date(currentYear + 1, 6, 4) },
        { name: 'Labor Day', date: new Date(currentYear + 1, 8, 2) },
        { name: 'Thanksgiving', date: new Date(currentYear + 1, 10, 28) },
        { name: 'Christmas Day', date: new Date(currentYear + 1, 11, 25) }
      )
    }
    
    // Find the next long weekend
    const nextLongWeekend = longWeekends
      .filter(holiday => holiday.date > today)
      .sort((a, b) => a.date - b.date)[0]
    
    return nextLongWeekend
  }

  const nextLongWeekend = getNextLongWeekend()

  const generateAIActivities = async (query) => {
    if (!query.trim()) return
    
    setIsGenerating(true)
    try {
      // Use client-side AI service
      const activities = await aiService.generateActivitiesAsync(query, 'All', 4)
      setGeneratedActivities(activities)
      // Pass generated activities to parent
      if (onAiActivitiesGenerated) {
        onAiActivitiesGenerated(activities)
      }
    } catch (error) {
      console.error('Error generating activities:', error)
      // Fallback to static activities
      setGeneratedActivities(aiActivities)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAISearch = (e) => {
    const query = e.target.value
    setAiSearch(query)
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        generateAIActivities(query)
      } else {
        setGeneratedActivities([])
      }
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }

  const filteredAiActivities = aiActivities.filter(activity =>
    activity.title.toLowerCase().includes(aiSearch.toLowerCase()) ||
    activity.description.toLowerCase().includes(aiSearch.toLowerCase())
  )

  const displayActivities = activeTab === 'ai' ? generatedActivities : filteredAiActivities

  const scrollCarousel = (direction) => {
    const carousel = document.querySelector('.carousel-container')
    if (carousel) {
      const cardWidth = 280 // Approximate card width + gap
      const scrollAmount = cardWidth * 2 // Scroll by 2 cards
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(carousel.scrollWidth - carousel.clientWidth, scrollPosition + scrollAmount)
      
      carousel.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setScrollPosition(newPosition)
    }
  }

  return (
    <>
      <section className="mb-16 px-2 sm:px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Browse Activities</h3>
            <div className="flex items-center rounded-full bg-[var(--bg-secondary)] p-1">
              <button 
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  activeTab === 'normal' 
                    ? 'bg-white text-[var(--text-primary)] shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                onClick={() => setActiveTab('normal')}
              >
                Normal
              </button>
              <button 
                className={`flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  activeTab === 'ai' 
                    ? 'bg-white text-[var(--text-primary)] shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                onClick={() => setActiveTab('ai')}
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                AI
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors"
              onClick={() => scrollCarousel('left')}
            >
              <span className="material-symbols-outlined text-[var(--text-primary)]">arrow_back</span>
            </button>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors"
              onClick={() => scrollCarousel('right')}
            >
              <span className="material-symbols-outlined text-[var(--text-primary)]">arrow_forward</span>
            </button>
          </div>
        </div>

        {activeTab === 'normal' && (
          <div className="relative w-full">
            <div className="carousel-container flex snap-x snap-mandatory overflow-x-auto pb-6 -mb-6 gap-4 sm:gap-6 w-full px-2 sm:px-4">
              {activities.map(activity => (
                <DraggableActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}
      </section>

      {activeTab === 'ai' && (
        <section className="mb-16 px-2 sm:px-4">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">auto_awesome</span>
              AI Generated Activities
            </h3>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-xl sm:text-2xl text-[var(--text-secondary)]">search</span>
              <input 
                className="w-full rounded-full border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-[var(--text-primary)] shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50" 
                id="ai-search" 
                placeholder="Enter a topic, e.g., 'Rainy day activities for kids'" 
                type="text"
                value={aiSearch}
                onChange={handleAISearch}
              />
            </div>
            
            {displayActivities.length > 0 && (
              <div className="flex items-center gap-2">
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors"
                  onClick={() => scrollCarousel('left')}
                >
                  <span className="material-symbols-outlined text-[var(--text-primary)]">arrow_back</span>
                </button>
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors"
                  onClick={() => scrollCarousel('right')}
                >
                  <span className="material-symbols-outlined text-[var(--text-primary)]">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
          
          {isGenerating ? (
            <div className="col-span-full flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto mb-2"></div>
                <p className="text-[var(--text-secondary)]">Generating activities...</p>
              </div>
            </div>
          ) : displayActivities.length > 0 ? (
            <div className="relative w-full">
              <div className="carousel-container flex snap-x snap-mandatory overflow-x-auto pb-6 -mb-6 gap-4 sm:gap-6 w-full px-2 sm:px-4">
                {displayActivities.map(activity => (
                  <DraggableActivityCard key={activity.id} activity={activity} isAI />
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-[var(--text-secondary)]">No activities found. Try searching for something else!</p>
            </div>
          )}
        </section>
      )}

      <footer className="w-full mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="relative rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-400 p-4 sm:p-8 shadow-lg overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full"></div>
            <div className="absolute -bottom-16 -left-8 w-40 h-40 bg-white/20 rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-900">Long Weekend Alert!</h3>
                <p className="text-yellow-800 mt-1 text-sm sm:text-base">
                  {nextLongWeekend 
                    ? `${nextLongWeekend.name} is coming up on ${nextLongWeekend.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}. Time for a 4-day plan!`
                    : 'No upcoming long weekends found.'
                  }
                </p>
              </div>
              <button 
                className="flex-shrink-0 rounded-full bg-white px-6 py-3 font-bold text-yellow-900 shadow-md transition-transform hover:scale-105 hover:bg-yellow-50"
                onClick={() => onPlanNow?.(nextLongWeekend?.date)}
              >
                Plan Now
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ActivityBrowser
