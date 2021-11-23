import { useState } from 'react'
import { supabase } from '../supabase-client'
import AuthForm from '../components/auth-form'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const submitForm = async (evt) => {
    evt.preventDefault()
    const { data, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (!error) {
      router.replace('/')
    }
  }

  return (
    <>
      <h1>Sign in</h1>
      <AuthForm
        email={email}
        onEmailChange={(evt) => setEmail(evt.target.value)}
        password={password}
        onPasswordChange={(evt) => setPassword(evt.target.value)}
        onSubmit={submitForm}
      />

      <Link href='/signup'>
        <a>Sign up</a>
      </Link>
    </>
  )
}

export const getServerSideProps = async (context) => {
  // get the user using the "sb:token" cookie
  const { user } = await supabase.auth.api.getUserByCookie(context.req)
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
