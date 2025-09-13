function Header({ onMenuClick, onShareClick, sidebarOpen }) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-5">
        <button className="lg:hidden flex items-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors" onClick={onMenuClick}>
          <span className="material-symbols-outlined text-base sm:text-lg md:text-xl text-[var(--text-primary)]">menu</span>
          <span className="text-xs sm:text-sm md:text-base font-medium text-[var(--text-primary)] hidden sm:block">Menu</span>
        </button>
        
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 ml-auto">
          <button 
            className="flex h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] transition-colors hover:bg-[var(--border-color)]"
            onClick={onShareClick}
            title="Share Plan"
          >
            <span className="material-symbols-outlined text-xs sm:text-sm md:text-base lg:text-lg text-[var(--text-primary)]">ios_share</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
