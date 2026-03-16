import { Link, useRoute } from "wouter";
import { LayoutDashboard, PlusCircle, LifeBuoy, Bell, Settings } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: LayoutProps) {
  const [isDashboard] = useRoute("/dashboard*");
  
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border/60 flex flex-col shadow-sm relative z-10">
        <div className="p-6 border-b border-border/40 flex items-center gap-3">
          <img 
            src={`${import.meta.env.BASE_URL}logo.jpeg`} 
            alt="HelpDesk Logo" 
            className="w-9 h-9 object-cover rounded-xl"
          />
          <span className="font-display font-bold text-xl text-foreground tracking-tight">HelpDesk</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">Agent Menu</div>
          <Link 
            href="/dashboard" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              isDashboard 
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                : 'text-slate-600 hover:bg-muted hover:text-foreground'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-8 px-3">Public Menu</div>
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="font-medium">Submit Ticket</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-border/40 space-y-2">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-slate-600 hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="font-medium text-sm">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-3 w-full rounded-xl bg-slate-50 border border-slate-100 mt-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Jane Doe</p>
              <p className="text-xs text-slate-500 truncate">Support Agent</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border/60 flex items-center justify-between px-6 md:px-8 shrink-0">
          <h2 className="font-display font-semibold text-lg text-slate-800 hidden md:block">
            {isDashboard ? 'Agent Dashboard' : 'Workspace'}
          </h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              <LifeBuoy className="w-4 h-4 text-slate-400" />
              Help
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
