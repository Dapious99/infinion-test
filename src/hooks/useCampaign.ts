/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

const CAMPAIGN_BASE = "/Campaign";
const CAMPAIGN_STATUS_BASE = "/CampaignStatus";

export function useFetchAllCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: () => api.get(CAMPAIGN_BASE),
  });
}

export function useFetchCampaignById(id?: number | string) {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => api.get(`${CAMPAIGN_BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => api.post(CAMPAIGN_BASE, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: any }) =>
      api.put(`${CAMPAIGN_BASE}/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign"] });
    },
  });
}

export function useUpdateCampaignStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      api.put(`${CAMPAIGN_STATUS_BASE}/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign"] });
    },
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.delete(`${CAMPAIGN_BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}
