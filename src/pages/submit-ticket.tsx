import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTicketMutations } from "@/hooks/use-ticket-mutations";
import { TicketCategory, TicketPriority } from "@workspace/api-client-react";
import { CheckCircle2, ChevronRight, MessageSquareText, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

const formSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  description: z.string().min(10, "Please provide more details in the description"),
  category: z.nativeEnum(TicketCategory, { errorMap: () => ({ message: "Select a category" }) }),
  priority: z.nativeEnum(TicketPriority, { errorMap: () => ({ message: "Select a priority" }) }),
  submitterName: z.string().min(1, "Name is required"),
  submitterEmail: z.string().email("Valid email is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitTicket() {
  const { createTicket } = useTicketMutations();
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "general" as any,
      priority: "low" as any,
    }
  });

  const onSubmit = async (data: FormValues) => {
    createTicket.mutate(
      { data },
      {
        onSuccess: (res) => {
          setSubmittedTicketId(res.ticketNumber);
        }
      }
    );
  };

  if (submittedTicketId) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Background" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>
        
        <div className="flex-1 flex items-center justify-center relative z-10 p-4">
          <div className="bg-card p-10 rounded-3xl shadow-xl shadow-black/5 max-w-md w-full text-center border border-border/50">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">Ticket Submitted!</h1>
            <p className="text-muted-foreground mb-6">
              We've received your request and our team will get back to you shortly.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 inline-block">
              <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold block mb-1">Your Ticket ID</span>
              <span className="text-2xl font-mono font-bold text-primary">{submittedTicketId}</span>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setSubmittedTicketId(null)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full"
              >
                Submit Another Ticket
              </button>
              <Link href="/dashboard" className="px-6 py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors w-full">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-0 inset-x-0 h-96 overflow-hidden z-0">
         <img 
            src={`${import.meta.env.BASE_URL}logo.jpeg`}
            alt="Help Desk Intake" 
            className="w-full h-full object-cover object-top opacity-25"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/60 to-background"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10 pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-5">
            <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo" className="w-20 h-20 object-cover rounded-2xl shadow-lg ring-2 ring-white/20" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">How can we help?</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Submit a ticket and our support team will get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-3xl shadow-xl shadow-black/5 p-6 md:p-10 border border-border/50">
          <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border/50">
            <MessageSquareText className="w-6 h-6 text-primary" />
            <h2 className="font-display text-2xl font-semibold text-foreground">Ticket Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Your Name</label>
              <input 
                {...register("submitterName")}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="Jane Doe"
              />
              {errors.submitterName && <p className="text-red-500 text-sm">{errors.submitterName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input 
                {...register("submitterEmail")}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="jane@example.com"
              />
              {errors.submitterEmail && <p className="text-red-500 text-sm">{errors.submitterEmail.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select 
                {...register("category")}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
              >
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing & Subscriptions</option>
                <option value="account">Account Management</option>
                <option value="bug_report">Report a Bug</option>
                <option value="feature_request">Feature Request</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Priority Level</label>
              <select 
                {...register("priority")}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
              >
                <option value="low">Low - General question</option>
                <option value="medium">Medium - Need help soon</option>
                <option value="high">High - Blocking my work</option>
                <option value="urgent">Urgent - System down</option>
              </select>
              {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-slate-700">Subject</label>
            <input 
              {...register("subject")}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              placeholder="Brief summary of the issue"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
          </div>

          <div className="space-y-2 mb-10">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea 
              {...register("description")}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
              placeholder="Please provide as much detail as possible..."
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border/50">
            <Link href="/dashboard" className="text-slate-500 font-medium hover:text-slate-800 transition-colors flex items-center gap-1">
              Agent Access
            </Link>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
              {!isSubmitting && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
