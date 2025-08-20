// src/types/index.ts
export type Profile = {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  avatar_url: string;
  role: 'admin' | 'vendedor' | 'designer' | 'producao' | 'user';
  // ADICIONADO NOVAS COLUNAS
  vhsys_access_token: string | null;
  vhsys_secret_access_token: string | null;
};
