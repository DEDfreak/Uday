import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function ShareModal({ isOpen, onClose, weekendPlan }) {
  const planRef = useRef(null)
  
  if (!isOpen) return null

  const downloadPlan = async () => {
    if (planRef.current) {
      try {
        const canvas = await html2canvas(planRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#fcfcf8'
        })
        
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')
        const imgWidth = 210
        const pageHeight = 295
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight

        let position = 0

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }

        pdf.save('weekend-plan.pdf')
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Error generating PDF. Please try again.')
      }
    }
  }

  const downloadPNG = async () => {
    if (planRef.current) {
      try {
        const canvas = await html2canvas(planRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#fcfcf8'
        })
        
        // Create download link
        const link = document.createElement('a')
        link.download = 'weekend-plan.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      } catch (error) {
        console.error('Error generating PNG:', error)
        alert('Error generating PNG. Please try again.')
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md transform">
        <button 
          className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100" 
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-2xl text-[var(--text-primary)]">close</span>
        </button>
        
        <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-3xl p-8 shadow-2xl relative overflow-hidden" ref={planRef}>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200/50 rounded-full"></div>
          <div className="absolute -bottom-16 -right-8 w-40 h-40 bg-yellow-200/50 rounded-full"></div>
          
          <div className="relative">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">My Awesome Weekend!</h2>
              <p className="text-lg font-medium text-[var(--primary-color)]">Oct 28 - 29, 2023</p>
            </div>
            
            <div className="space-y-6">
              {Object.keys(weekendPlan).map((dayKey, index) => {
                const dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
                const dayName = dayNames[index] || `Day ${index + 1}`
                const activities = weekendPlan[dayKey] || []
                
                return (
                  <div key={dayKey}>
                    <h3 className="font-bold text-xl text-[var(--text-primary)] mb-3">{dayName}</h3>
                    <ul className="space-y-3">
                      {activities.map(activity => (
                        <li key={activity.id} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)] mt-0.5">check_circle</span>
                          <div>
                            <h4 className="font-semibold text-[var(--text-primary)]">{activity.title}</h4>
                            <p className="text-sm text-[var(--text-secondary)]">{activity.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
            
             <div className="mt-8 pt-6 border-t-2 border-dashed border-yellow-200">
               <div className="flex items-center gap-2 mb-4">
                 <svg className="h-6 w-6 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                   <g clipPath="url(#clip0_6_319)">
                     <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
                   </g>
                 </svg>
                 <span className="font-bold text-[var(--text-primary)]">Weekendly</span>
               </div>
               <div className="flex gap-3 justify-center">
                 <button 
                   className="flex items-center gap-2 rounded-full bg-[var(--primary-color)] py-2 px-4 font-bold text-[var(--text-primary)] transition-transform hover:scale-105"
                   onClick={downloadPNG}
                 >
                   <span className="material-symbols-outlined">image</span>
                   PNG
                 </button>
                 <button 
                   className="flex items-center gap-2 rounded-full bg-[var(--primary-color)] py-2 px-4 font-bold text-[var(--text-primary)] transition-transform hover:scale-105"
                   onClick={downloadPlan}
                 >
                   <span className="material-symbols-outlined">picture_as_pdf</span>
                   PDF
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
