import Link from 'next/link'
import { supabase } from '../supabase-client'

export default function Home({ bikes }) {
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
    </>
  )
}

export const getServerSideProps = async (context) => {
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
