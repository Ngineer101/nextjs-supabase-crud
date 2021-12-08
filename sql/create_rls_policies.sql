create policy "Bikes can only viewed by owner"
  on bikes for select
  using ( user_id = auth.uid() );

create policy "Owner can create their own bikes"
  on bikes for insert
  with check ( auth.uid() = user_id );

create policy "Owner can update their own bikes"
  on bikes for update
  using ( auth.uid() = user_id );
