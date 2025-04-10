import { create } from "zustand";
import { CountUserEmpresa, ShowCompany } from "../supabase/company.actions.ts";

export const useCompanyStore = create((set) => ({
  countUsers: 0,
  dataCompany: [],

  showCompany: async (p) => {
    const response = await ShowCompany(p);
    set({ dataCompany: response.empresa });
    return response.empresa;
  },
  countUsersCompany: async (p) => {
    const response = await CountUserEmpresa(p);
    set({ countUsers: response });
    return response;
  },
}));
