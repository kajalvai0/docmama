import { createClient } from '@/lib/supabase/server'

export async function verifyAdminLogin(username: string, password: string) {
  // Verify against hardcoded credentials for admin
  return username === 'admin' && password === 'admin123'
}

export async function getAdminSession() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    return null
  }
}

export async function checkAdminAuth() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user?.user_metadata?.is_admin === true
  } catch (error) {
    return false
  }
}

export async function setAdminSession(token: string) {
  try {
    const supabase = await createClient()
    // Store admin session in localStorage (client-side)
    return true
  } catch (error) {
    return false
  }
}
