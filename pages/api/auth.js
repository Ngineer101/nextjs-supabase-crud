import { supabase } from '../../supabase-client'

export default function AuthHandler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}
