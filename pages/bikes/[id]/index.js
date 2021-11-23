import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { supabase } from '../../../supabase-client'

export default function ViewBike({ bike }) {
  const router = useRouter()
  return (
    <>
      <h1>Bike details</h1>
      <label>Make: {bike.make}</label>

      <label>Model: {bike.model}</label>

      <label>Production year: {bike.production_year}</label>

      <div>
        <Link href={`/bikes/${bike.id}/edit`}>
          <a className='button'>Edit bike</a>
        </Link>
        <button onClick={async (evt) => {
          await supabase
            .from('bikes')
            .delete()
            .match({ id: bike.id })

          router.replace('/')
        }}>Delete bike</button>
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

  const { data: bike, error } = await supabase
    .from('bikes')
    .select('*')
    .eq('id', context.query.id)
    .single()

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      bike
    }
  }
}
