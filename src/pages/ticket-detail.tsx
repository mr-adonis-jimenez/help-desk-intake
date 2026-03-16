import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { useGetTicket, TicketStatus, TicketPriority } from "@workspace/api-client-react";
import { useTicketMutations } from "@/hooks/use-ticket-mutations";
import { format } from "date-fns";
import { 
  ArrowLeft, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  User, 
  Tag, 
  AlertCircle,
  Send,
  Lock
} from "lucide-react";
import { Link } from "wouter";

export default function TicketDetail({ id }: { id: number }) {
  const { data: ticket, isLoading } = useGetTicket(id);
  const { updateTicket, addComment, aiSuggest } = useTicketMutations();
  
  const [commentText, setCommentText] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (isLoading || !ticket) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </DashboardLayout>
    );
  }

  const handleUpdateStatus = (status: TicketStatus) => {
    updateTicket.mutate({ id, data: { status } });
  };

  const handleUpdatePriority = (priority: TicketPriority) => {
    updateTicket.mutate({ id, data: { priority } });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment.mutate({
      id,
      data: {
        content: commentText,
        isInternal,
        authorName: "Agent System", // Hardcoded for demo, normally from auth
        authorEmail: "agent@helpdesk.com",
      }
    }, {
      onSuccess: () => {
        setCommentText("");
      }
    });
  };

  const handleAiSuggest = () => {
    setIsAiLoading(true);
    aiSuggest.mutate({ id }, {
      onSuccess: (data) => {
        setCommentText(data.suggestedResponse);
        setIsInternal(false);
      },
      onSettled: () => setIsAiLoading(false)
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pb-20">
        {/* Back navigation */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Content & Thread */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Ticket Header & Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-mono font-bold">
                    {ticket.ticketNumber}
                  </span>
                  <span className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> 
                    {format(new Date(ticket.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6">
                  {ticket.subject}
                </h1>
                
                <div className="prose prose-slate max-w-none text-slate-700">
                  <p className="whitespace-pre-wrap">{ticket.description}</p>
                </div>
              </div>
            </div>

            {/* Comments Thread */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Conversation Thread
              </h3>
              
              <div className="space-y-4">
                {ticket.comments?.map((comment) => (
                  <div 
                    key={comment.id} 
                    className={`p-5 rounded-2xl border ${
                      comment.isInternal 
                        ? 'bg-yellow-50/50 border-yellow-200' 
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          comment.authorEmail.includes('agent') ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {comment.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">
                            {comment.authorName}
                            {comment.isInternal && (
                              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-200 text-yellow-800 text-[10px] font-bold uppercase tracking-wider">
                                <Lock className="w-3 h-3" /> Internal Note
                              </span>
                            )}
                            {comment.isAiGenerated && (
                              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
                                <Sparkles className="w-3 h-3" /> AI Generated
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-500">{format(new Date(comment.createdAt), "MMM d, h:mm a")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed pl-11">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="font-semibold text-slate-700 text-sm">Add a reply</h4>
                  <button 
                    onClick={handleAiSuggest}
                    disabled={isAiLoading}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isAiLoading ? (
                      <div className="w-3 h-3 border-2 border-purple-700 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Generate AI Suggestion
                  </button>
                </div>
                <form onSubmit={handleAddComment} className="p-4">
                  <textarea 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                    placeholder="Type your reply here..."
                    className="w-full resize-none outline-none text-slate-700 placeholder:text-slate-400 sm:text-sm"
                  />
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isInternal}
                        onChange={(e) => setIsInternal(e.target.checked)}
                        className="rounded border-slate-300 text-primary focus:ring-primary/20 w-4 h-4" 
                      />
                      Make this an internal note
                    </label>
                    <button 
                      type="submit"
                      disabled={!commentText.trim() || addComment.isPending}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> 
                      {addComment.isPending ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Meta */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-6">Properties</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Status</label>
                  <select 
                    value={ticket.status}
                    onChange={(e) => handleUpdateStatus(e.target.value as TicketStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Priority</label>
                  <select 
                    value={ticket.priority}
                    onChange={(e) => handleUpdatePriority(e.target.value as TicketPriority)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="pt-5 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Requester</label>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="font-semibold text-sm text-slate-900">{ticket.submitterName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{ticket.submitterEmail}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block flex items-center gap-1.5"><Tag className="w-3.5 h-3.5"/> Category</label>
                  <div className="inline-flex px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                    {ticket.category.replace('_', ' ')}
                  </div>
                </div>
                
                {(ticket.aiSummary || ticket.aiCategory) && (
                  <div className="pt-5 border-t border-slate-100">
                    <label className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3 block flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5"/> AI Analysis</label>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 space-y-3">
                      {ticket.aiCategory && (
                        <div>
                          <span className="text-[10px] font-bold text-purple-400 uppercase block mb-1">Suggested Category</span>
                          <span className="text-sm font-medium text-purple-900">{ticket.aiCategory}</span>
                        </div>
                      )}
                      {ticket.aiSummary && (
                        <div>
                          <span className="text-[10px] font-bold text-purple-400 uppercase block mb-1">Summary</span>
                          <p className="text-xs text-purple-800 leading-relaxed">{ticket.aiSummary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
