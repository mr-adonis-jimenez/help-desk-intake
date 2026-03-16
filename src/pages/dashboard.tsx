import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { useGetTicketStats, useListTickets, TicketStatus, TicketPriority } from "@workspace/api-client-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { 
  Inbox, 
  Clock, 
  CheckCircle, 
  Archive, 
  AlertCircle,
  Search,
  Filter,
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  
  // Stats Query
  const { data: stats, isLoading: statsLoading } = useGetTicketStats();
  
  // List Query
  const { data: tickets, isLoading: ticketsLoading } = useListTickets({
    status: statusFilter ? (statusFilter as any) : undefined,
    priority: priorityFilter ? (priorityFilter as any) : undefined,
    search: search || undefined
  });

  const getStatusColor = (status: TicketStatus) => {
    switch(status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch(priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-slate-600 bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Overview</h1>
          <p className="text-slate-500">Track, manage, and resolve support requests.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard icon={<Inbox />} title="Total" value={stats?.total} loading={statsLoading} color="text-blue-600" bg="bg-blue-50" />
          <StatCard icon={<AlertCircle />} title="Open" value={stats?.open} loading={statsLoading} color="text-rose-600" bg="bg-rose-50" />
          <StatCard icon={<Clock />} title="In Progress" value={stats?.inProgress} loading={statsLoading} color="text-amber-600" bg="bg-amber-50" />
          <StatCard icon={<CheckCircle />} title="Resolved" value={stats?.resolved} loading={statsLoading} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard icon={<Archive />} title="Closed" value={stats?.closed} loading={statsLoading} color="text-slate-600" bg="bg-slate-100" />
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets by subject or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Filter className="w-4 h-4" /> Filters:
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold text-slate-500">
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Status & Priority</th>
                  <th className="px-6 py-4">Requester</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ticketsLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                      Loading tickets...
                    </td>
                  </tr>
                ) : tickets?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-500">
                      <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-lg font-medium text-slate-900">No tickets found</p>
                      <p>Adjust your filters or search query.</p>
                    </td>
                  </tr>
                ) : (
                  tickets?.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 mb-1 line-clamp-1">{ticket.subject}</div>
                        <div className="text-xs font-mono text-slate-500">{ticket.ticketNumber} • {ticket.category.replace('_', ' ')}</div>
                      </td>
                      <td className="px-6 py-4 space-y-2">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ml-2 ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 text-sm">{ticket.submitterName}</div>
                        <div className="text-xs text-slate-500">{ticket.submitterEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/dashboard/ticket/${ticket.id}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, title, value, loading, color, bg }: { icon: React.ReactNode, title: string, value?: number, loading: boolean, color: string, bg: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
        <div className={`p-2 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-display font-bold text-slate-900">
        {loading ? <div className="h-8 w-16 bg-slate-200 animate-pulse rounded" /> : (value || 0)}
      </div>
    </div>
  );
}
