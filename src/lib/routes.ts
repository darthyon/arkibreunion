export const routes = {
  home: "/",
  viewPlan: "/view-plan",
  tukarHadiah: "/tukar-hadiah",
  gerakKerja: "/gerak-kerja",
  albumRahsia: "/album-rahsia",
  adminLogin: "/admin/login",
  archiveYear: (year: string) => `/arkib/${year}`
} as const;
