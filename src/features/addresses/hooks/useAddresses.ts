import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMyAddresses,
  createAddress,
  setPrincipalAddress,
  deleteAddress,
} from "../services/addressService";
import type { DireccionEntregaCreateCliente } from "../types";

const ADDRESSES_KEY = ["my-addresses"];

/** hook único que proporciona consulta + todas las mutaciones para direcciones  (pidio arreglarlo y unificarlo) **/
export const useAddresses = () => {
  const queryClient = useQueryClient();

  const addressesQuery = useQuery({
    queryKey: ADDRESSES_KEY,
    queryFn: fetchMyAddresses,
  });

  const createMutation = useMutation({
    mutationFn: (data: DireccionEntregaCreateCliente) => createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
    },
  });

  const setPrincipalMutation = useMutation({
    mutationFn: (id: number) => setPrincipalAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
    },
  });

  return {
    addressesQuery,
    createMutation,
    setPrincipalMutation,
    deleteMutation,
  };
};
