function Header({ onMenuClick, onShareClick }) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button className="lg:hidden" onClick={onMenuClick}>
          <span className="material-symbols-outlined text-2xl text-[var(--text-primary)]">menu</span>
        </button>
        
        <div className="flex items-center gap-4 ml-auto">
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] transition-colors hover:bg-[var(--border-color)]"
            onClick={onShareClick}
          >
            <span className="material-symbols-outlined text-[var(--text-primary)]">ios_share</span>
          </button>
          
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] transition-colors hover:bg-[var(--border-color)]">
            <span className="material-symbols-outlined text-[var(--text-primary)]">wb_sunny</span>
          </button>
          
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] transition-colors hover:bg-[var(--border-color)]">
            <span className="material-symbols-outlined text-[var(--text-primary)]">settings</span>
          </button>
          
          <div 
            className="h-10 w-10 rounded-full bg-cover bg-center" 
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDROnqjwhlwWXxzlJKseQQNri0BPWO8h6oxp55lESQRQwHbJiuAOltfFwfmMBCtOppb5ZreXzOKEscWE0S08zHJCDsp42LBJSUvQ31tygUdml9Oo5iMl1-BkUe_ERdSAudugHgxT39A8PRbXuptr0C38jRobCLVfLEUreYefG5LlHt4aR0UXnQxuoA9r65y_HZ243H2VTO8lT0Td7Pz2JFLWDj_4yNK6o1nz0mYdcvIl2DFxxf0OZzbPwkku4zbtQ4uG53kWC8fHB6-")'
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
