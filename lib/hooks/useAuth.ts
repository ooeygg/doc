"use client"

export function useAuth() {
  return { user: null, signIn: async () => {}, signOut: async () => {} }
}
