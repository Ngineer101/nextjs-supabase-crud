import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import BikeForm from '../../components/bike-form';
import { supabase } from '../../supabase-client';

export default function NewBike() {
  const [bikeMake, setBikeMake] = useState('')
  const [bikeModel, setBikeModel] = useState('')
  const [bikeYear, setBikeYear] = useState('')
  const router = useRouter();
  const session = supabase.auth.session();

  return (
    <>
      <h1>Create new bike</h1>
      <BikeForm
        bikeMake={bikeMake}
        onMakeChange={(evt) => setBikeMake(evt.target.value)}
        bikeModel={bikeModel}
        onModelChange={(evt) => setBikeModel(evt.target.value)}
        bikeYear={bikeYear}
        onYearChange={(evt) => setBikeYear(evt.target.value)}
        onSubmit={async (evt) => {
          evt.preventDefault();
          await supabase
            .from('bikes')
            .insert({
              make: bikeMake,
              model: bikeModel,
              production_year: bikeYear,
              user_id: session.user.id,
            });

          router.push('/')
        }}
      />
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

  return {
    props: {}
  }
}
