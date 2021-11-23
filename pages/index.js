import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { supabase } from '../supabase-client'
import { useSession } from '../utils/user-context'

export default function Home({ bikes }) {
  const { session } = useSession()
  const router = useRouter()
  return (
    <>
      <h1>Bikes</h1>
      <ul>
        {
          (bikes || []).map(bike =>
            <li key={bike.id}>
              <a href={`/bikes/${bike.id}`}>{bike.make} - {bike.model}</a>
            </li>
          )
        }
        <li>
          <Link href='/bikes/new'>
            <a>+ New bike</a>
          </Link>
        </li>
      </ul>
      <div>
        {
          session &&
          <>
            <h3>Session data</h3>
            <h4>Access token: {session.access_token}</h4>
            <h4>Email: {session.user?.email}</h4>
            <button onClick={() => {
              supabase.auth.signOut()
              router.replace('/signin')
            }}>Sign out</button>
          </>
        }
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  // get the user using the "sb:token" cookie
  const { user } = await supabase.auth.api.getUserByCookie(context.req)
  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }

  // Query all bikes
  const { data: bikes, error } = await supabase.from('bikes').select();

  if (error) {
    // Return 404 response.
    // No bikes found or something went wrong with the query
    return {
      notFound: true,
    }
  }

  return {
    props: {
      bikes,
    }
  }
}
