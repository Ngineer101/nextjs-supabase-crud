import { useState } from 'react'
import { supabase } from '../supabase-client'
import AuthForm from '../components/auth-form'
import { useRouter } from 'next/dist/client/router'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const submitForm = async (evt) => {
    evt.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      router.push('/signin')
    }
  }

  return (
    <>
      <h1>Sign up</h1>
      <AuthForm
        email={email}
        onEmailChange={(evt) => setEmail(evt.target.value)}
        password={password}
        onPasswordChange={(evt) => setPassword(evt.target.value)}
        onSubmit={submitForm}
      />
    </>
  )
}
