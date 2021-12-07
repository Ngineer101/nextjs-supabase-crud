alter table bikes add column user_id uuid references auth.users null;
