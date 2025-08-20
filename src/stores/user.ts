// src/stores/user.ts
import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase';
import type { Profile } from '@/types';

export const useUserStore = defineStore('user', {
  state: () => ({
    session: null as any | null,
    profile: null as Profile | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.session,
    isAdmin: (state) => state.profile?.role === 'admin',
    user: (state) => state.session?.user,
  },

  actions: {
    async fetchSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Erro ao buscar sessão:', error);
        return;
      }
      this.session = data.session;
      if (this.session) {
        await this.fetchProfile();
      }
    },

    async fetchProfile() {
      if (!this.session?.user) return;
      try {
        // A query agora busca todas as colunas, incluindo as novas
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', this.session.user.id)
          .single();

        if (error) throw error;
        this.profile = profileData;
      } catch (e) {
        console.error('Erro ao buscar perfil do usuário:', e);
        this.profile = null;
      }
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Erro no logout:', error);
        } else {
            this.session = null;
            this.profile = null;
        }
    },
  },
});
