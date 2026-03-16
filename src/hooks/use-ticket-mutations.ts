import { useQueryClient } from "@tanstack/react-query";
import { 
  useCreateTicket, 
  useUpdateTicket, 
  useAddComment, 
  useAiSuggestResponse,
  getListTicketsQueryKey,
  getGetTicketStatsQueryKey,
  getGetTicketQueryKey
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export function useTicketMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createTicket = useCreateTicket({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListTicketsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTicketStatsQueryKey() });
      },
      onError: (err) => {
        console.error("Create ticket failed", err);
        toast({ title: "Failed to submit ticket", variant: "destructive" });
      }
    }
  });

  const updateTicket = useUpdateTicket({
    mutation: {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: getGetTicketQueryKey(variables.id) });
        queryClient.invalidateQueries({ queryKey: getListTicketsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTicketStatsQueryKey() });
        toast({ title: "Ticket updated successfully" });
      },
      onError: (err) => {
        console.error("Update ticket failed", err);
        toast({ title: "Failed to update ticket", variant: "destructive" });
      }
    }
  });

  const addComment = useAddComment({
    mutation: {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: getGetTicketQueryKey(variables.id) });
        toast({ title: "Comment added" });
      },
      onError: (err) => {
        console.error("Add comment failed", err);
        toast({ title: "Failed to add comment", variant: "destructive" });
      }
    }
  });

  const aiSuggest = useAiSuggestResponse({
    mutation: {
      onSuccess: () => {
        toast({ title: "AI suggestion generated" });
      },
      onError: (err) => {
        console.error("AI suggest failed", err);
        toast({ title: "Failed to generate AI suggestion", variant: "destructive" });
      }
    }
  });

  return {
    createTicket,
    updateTicket,
    addComment,
    aiSuggest
  };
}
