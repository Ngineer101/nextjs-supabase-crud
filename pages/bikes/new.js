import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import BikeForm from '../../components/bike-form';
import { supabase } from '../../supabase-client';

export default function NewBike() {
  const [bikeMake, setBikeMake] = useState('')
  const [bikeModel, setBikeModel] = useState('')
  const [bikeYear, setBikeYear] = useState('')
  const router = useRouter();

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
            });

          router.push('/')
        }}
      />
    </>
  )
}
