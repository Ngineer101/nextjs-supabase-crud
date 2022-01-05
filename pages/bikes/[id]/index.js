import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../../supabase-client'

export default function ViewBike({ bike }) {
  const router = useRouter()
  const [signedUrl, setSignedUrl] = useState('')
  useEffect(() => {
    if (bike.file_path) {

      // Signed URL
      supabase
        .storage
        .from('bike_images') // bucket name
        .createSignedUrl(
          bike.file_path, // path to the image in the bucket
          36000, // time that the URL is valid in seconds
        )
        .then(data => {
          if (data.error) {
            // TODO: Handle error
          }

          setSignedUrl(data.signedURL)
        })
    }
  }, [bike])

  // Public URL
  const bikeImageUrl = bike.file_path ?
    supabase
      .storage
      .from('bike_images') // bucket name
      .getPublicUrl(bike.file_path) // path to the image in the bucket
      .publicURL
    :
    ''

  return (
    <>
      <h1>Bike details</h1>
      <label>Make: {bike.make}</label>

      <label>Model: {bike.model}</label>

      <label>Production year: {bike.production_year}</label>

      {
        signedUrl &&
        <div>
          <img src={signedUrl} />
        </div>
      }

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

  supabase.auth.setAuth(context.req.cookies["sb:token"])
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
