import { useState } from 'react'
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import WeekendPlan from './components/WeekendPlan'
import ActivityBrowser from './components/ActivityBrowser'
import ShareModal from './components/ShareModal'

// Sample data
const initialActivities = [
  {
    id: 'reading',
    title: 'Reading',
    description: 'Get lost in a good book.',
    category: 'Relaxing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCf4u8sqyZXnRr2N-Uef2_W0HmlW6MuZ4JdmvQXPfnRg5svcBUgcLGZWlXKxwuI66ADpXPYHoaOxQXvv0KdnRhY43WuNJlwk1nqHTbNEd9tcfeSOQHWkbH6GdKllDi4Kz5LFknAgG9ID5scE_T2dUugVf_dTmDMuTCaQGlFNcz17D1Q-hmFd7DZ7Llg4rv4lP_NRLhxWp6Pj-aiTuEUgPCoDukcxqtp9txo19xMK1xXBI4UpKkqGziqGOZkPjLfq_Kk6QDrafk8CoW'
  },
  {
    id: 'board-games',
    title: 'Board Games',
    description: 'Friendly competition.',
    category: 'Social',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDomkBOgXtdllytXBGE3vb3gZZ8qeTvM41BEqZ_9UXtJBo8l0YiKCmuw5c9SOgu7xmJL0K4Y2itMmpzacPhBxczwGhMxXBrYZkshJCcR-Epmo8Zuq7tjUlEIbvNt2dLF_FYI-sPi9-zeVvW1LbiZmse6A6YWrp_F9w24DO9qhUCh1W9XleYChFwsJnge3m_kFjVYMOkQVNGzeMlTTzw30SkrKh3T6D-M4j4Go4WEVFFAcJ7OhJ5au08Ynl36PQO7jZG5vQ2MM1TW5JK'
  },
  {
    id: 'cooking',
    title: 'Cooking',
    description: 'Try a new recipe.',
    category: 'Creative',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ466tuLJV2IGyBG5yKHtZhkFBHZ5zRPg4g3m2Kt1dYjFSdjrB3JUFthwPd7b0IDC_Pq7V7UFIi-ChozfG0-X_n5rFRBFtwyZyWXQTMU9fhWWPWlwiolYe8iSh_CBCzF6pYfc4IRmMHArSqTAvhID6xIXcbwLIbdujLxRn06hfxDbm0xmRJjLB2QVCFZZyR_i7s57Z3OCKrQdZf-P-7Awu9T2iGa_uSdmyADwh8tvDkw_M_mrnWSB3I1ggA2D6WWlhwc8UcewFGQdO'
  },
  {
    id: 'gardening',
    title: 'Gardening',
    description: 'Connect with nature.',
    category: 'Adventurous',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpsxhLcJDh_aDn_kfSuQRsz3J_ktpobJVJaqMktp6BCLf5rwbj_BygxJfwOcHGq6dZDWvWuhTnN_r1yA588gH-IWTUQRYX5Dgjh_qOiJBtom0SOractLf-u0uJgmmjTO2URh75XuppO0r0prpaZjMq5kLzvUM81BCQGxU_ESNff0ym1qZR3LNgwFHR1PuRzLZZZX6rtlMiX8sD-S1yoQprur4fnFc2IAJK8KlqlxG9LJaiCXxUThKOVqOWkOqWVZ_93oVu8BWv-33o'
  },
  {
    id: 'baking',
    title: 'Baking',
    description: 'Sweet treats for the soul.',
    category: 'Cozy',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400'
  }
]

const initialWeekendPlan = {
  day0: [
    {
      id: 'brunch',
      title: 'Brunch with Friends',
      description: '10:00 AM - 12:00 PM at The Sunny Side',
      category: 'Relaxing'
    },
    {
      id: 'hike',
      title: 'Hike at Sunrise Peak',
      description: '2:00 PM - 5:00 PM',
      category: 'Adventurous'
    }
  ],
  day1: [
    {
      id: 'movie',
      title: 'Movie Marathon',
      description: 'All afternoon, at home',
      category: 'Cozy'
    }
  ]
}

const aiActivities = [
  {
    id: 'pillow-fort',
    title: 'Build a Pillow Fort',
    description: 'Create a cozy hideaway with blankets and pillows.',
    category: 'Creative',
    isAI: true,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'
  },
  {
    id: 'treasure-hunt',
    title: 'Indoor Treasure Hunt',
    description: 'Hide clues around the house leading to a prize.',
    category: 'Social',
    isAI: true,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'
  },
  {
    id: 'diy-pizza',
    title: 'DIY Pizza Making',
    description: 'Let everyone choose their own toppings.',
    category: 'Creative',
    isAI: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
  },
  {
    id: 'arts-crafts',
    title: 'Arts & Crafts Session',
    description: 'Painting, drawing, or making collages.',
    category: 'Creative',
    isAI: true,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'
  }
]

function App() {
  const [activities] = useState(initialActivities)
  const [aiGeneratedActivities] = useState(aiActivities)
  const [weekendPlan, setWeekendPlan] = useState(initialWeekendPlan)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: 'All',
    search: ''
  })
  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    category: '',
    selectedDay: ''
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [weekendDays, setWeekendDays] = useState(2)
  const [activeId, setActiveId] = useState(null)

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    // Handle dropping activities onto weekend plan
    if (over.id.startsWith('day-') && over.id.endsWith('-drop')) {
      const dayIndex = over.id.match(/day-(\d+)-drop/)?.[1]
      if (dayIndex !== undefined) {
        const dayKey = `day${dayIndex}`
        
        // Check if it's an existing activity being moved
        if (active.id.startsWith('activity-')) {
          const activityId = active.id.split('-')[1]
          const fromDayIndex = active.id.split('-')[2]
          
          // Move activity between days
          if (fromDayIndex !== dayIndex) {
            const newPlan = { ...weekendPlan }
            const fromDayKey = `day${fromDayIndex}`
            const activity = newPlan[fromDayKey]?.find(a => a.id === activityId)
            
            if (activity) {
              newPlan[fromDayKey] = newPlan[fromDayKey].filter(a => a.id !== activityId)
              newPlan[dayKey] = [...(newPlan[dayKey] || []), activity]
              setWeekendPlan(newPlan)
            }
          }
        } else {
          // New activity from browser
          const activity = [...activities, ...aiGeneratedActivities].find(a => a.id === active.id)
          
          if (activity && !weekendPlan[dayKey]?.find(a => a.id === activity.id)) {
            setWeekendPlan(prev => ({
              ...prev,
              [dayKey]: [...(prev[dayKey] || []), {
                id: activity.id,
                title: activity.title,
                description: activity.description,
                category: activity.category
              }]
            }))
          }
        }
      }
    }
  }

  const addNewActivity = (e) => {
    e.preventDefault()
    if (newActivity.name.trim() && newActivity.category && newActivity.selectedDay !== '') {
      const activityId = `custom-${Date.now()}`
      const newActivityData = {
        id: activityId,
        title: newActivity.name,
        description: newActivity.description,
        category: newActivity.category
      }
      
      // Add to the selected day
      const dayKey = `day${newActivity.selectedDay}`
      setWeekendPlan(prev => ({
        ...prev,
        [dayKey]: [...(prev[dayKey] || []), newActivityData]
      }))
      
      // Reset form
      setNewActivity({ name: '', description: '', category: '', selectedDay: '' })
    }
  }

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = filters.category === 'All' || activity.category === filters.category
    const matchesSearch = activity.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         activity.description.toLowerCase().includes(filters.search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="relative flex size-full min-h-screen">
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        newActivity={newActivity}
        onNewActivityChange={setNewActivity}
        onAddActivity={addNewActivity}
        weekendDays={weekendDays}
        selectedDate={selectedDate}
      />
      
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out lg:ml-72">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          onShareClick={() => setShareModalOpen(true)}
        />
        
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
          <WeekendPlan 
            weekendPlan={weekendPlan}
            weekendDays={weekendDays}
            onWeekendDaysChange={setWeekendDays}
            onWeekendPlanChange={setWeekendPlan}
            selectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
          />
          
          <ActivityBrowser 
            activities={filteredActivities}
            aiActivities={aiGeneratedActivities}
          />
        </main>
      </div>

      <DndContext 
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <DragOverlay>
          {activeId ? (
            <div className="drag-ghost rounded-xl bg-white p-4 shadow-lg">
              <div className="font-bold">
                {[...activities, ...aiGeneratedActivities].find(a => a.id === activeId)?.title}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <ShareModal 
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        weekendPlan={weekendPlan}
      />
      </div>
  )
}

export default App