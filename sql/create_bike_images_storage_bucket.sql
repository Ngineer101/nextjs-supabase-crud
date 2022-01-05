-- Create storage bucket
insert into storage.buckets (id, name)
values ('bike_images', 'bike_images');

-- Create bucket policies
-- Policy that allows any authenticated user to view all bike images
create policy "Any authenticated user can view bike images"
  on storage.objects for select
  using ( bucket_id = 'bike_images' );

-- Policy that allows the user that creates a bike to upload an image for the bike
create policy "User can upload their own bike image"
  on storage.objects for insert
  with check ( 
    bucket_id = 'bike_images'
    and auth.uid() = owner
  );

-- Policy that allows the user that first uploaded an image (owner) to update the image
create policy "User can update their own bike image"
  on storage.objects for update
  using (
    bucket_id = 'bike_images'
    and auth.uid() = owner
  );