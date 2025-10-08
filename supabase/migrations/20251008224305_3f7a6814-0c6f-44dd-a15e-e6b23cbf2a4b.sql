-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum types for game state
create type public.app_role as enum ('admin', 'player');
create type public.mission_status as enum ('locked', 'available', 'in_progress', 'completed', 'failed');
create type public.character_type as enum ('yumi', 'kuro');
create type public.item_type as enum ('weapon', 'armor', 'accessory', 'consumable', 'upgrade');
create type public.ability_category as enum ('combat', 'hacking', 'stealth', 'parkour', 'magic', 'tech');

-- User roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'player',
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Profiles table for player data
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  experience_points integer default 0,
  level integer default 1,
  credits integer default 1000,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- Characters table (Yumi and Kuro)
create table public.characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  character_type character_type not null,
  name text not null,
  level integer default 1,
  experience_points integer default 0,
  health_points integer default 100,
  max_health_points integer default 100,
  energy_points integer default 100,
  max_energy_points integer default 100,
  attack_power integer default 10,
  defense_power integer default 10,
  hacking_skill integer default 0,
  stealth_skill integer default 0,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id, character_type)
);

alter table public.characters enable row level security;

-- Abilities table
create table public.abilities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  category ability_category not null,
  character_type character_type,
  level_required integer default 1,
  energy_cost integer default 10,
  cooldown_seconds integer default 0,
  damage integer default 0,
  icon_url text,
  created_at timestamp with time zone default now()
);

alter table public.abilities enable row level security;

-- Character abilities junction table
create table public.character_abilities (
  id uuid primary key default gen_random_uuid(),
  character_id uuid references public.characters(id) on delete cascade not null,
  ability_id uuid references public.abilities(id) on delete cascade not null,
  unlocked_at timestamp with time zone default now(),
  level integer default 1,
  unique (character_id, ability_id)
);

alter table public.character_abilities enable row level security;

-- Items catalog
create table public.items (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  item_type item_type not null,
  rarity text default 'common',
  price integer default 0,
  stat_bonuses jsonb default '{}',
  icon_url text,
  stackable boolean default false,
  max_stack integer default 1,
  created_at timestamp with time zone default now()
);

alter table public.items enable row level security;

-- Player inventory
create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  item_id uuid references public.items(id) on delete cascade not null,
  quantity integer default 1 check (quantity > 0),
  obtained_at timestamp with time zone default now(),
  unique (user_id, item_id)
);

alter table public.inventory enable row level security;

-- Equipment (equipped items)
create table public.equipment (
  id uuid primary key default gen_random_uuid(),
  character_id uuid references public.characters(id) on delete cascade not null,
  item_id uuid references public.items(id) on delete cascade not null,
  slot text not null,
  equipped_at timestamp with time zone default now(),
  unique (character_id, slot)
);

alter table public.equipment enable row level security;

-- Missions
create table public.missions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  story_text text,
  chapter integer default 1,
  order_index integer default 0,
  level_required integer default 1,
  experience_reward integer default 100,
  credits_reward integer default 500,
  item_rewards jsonb default '[]',
  objectives jsonb default '[]',
  duration_minutes integer,
  thumbnail_url text,
  created_at timestamp with time zone default now()
);

alter table public.missions enable row level security;

-- Mission dependencies
create table public.mission_dependencies (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id) on delete cascade not null,
  required_mission_id uuid references public.missions(id) on delete cascade not null,
  unique (mission_id, required_mission_id)
);

alter table public.mission_dependencies enable row level security;

-- Player mission progress
create table public.mission_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  mission_id uuid references public.missions(id) on delete cascade not null,
  status mission_status default 'locked',
  progress_data jsonb default '{}',
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id, mission_id)
);

alter table public.mission_progress enable row level security;

-- Rewards log
create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  mission_id uuid references public.missions(id) on delete set null,
  reward_type text not null,
  reward_data jsonb default '{}',
  claimed boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.rewards enable row level security;

-- RLS Policies

-- User roles policies
create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

create policy "Admins can manage all roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'));

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Characters policies
create policy "Users can view their own characters"
  on public.characters for select
  using (auth.uid() = user_id);

create policy "Users can update their own characters"
  on public.characters for update
  using (auth.uid() = user_id);

-- Abilities policies (read-only for players)
create policy "Anyone can view abilities"
  on public.abilities for select
  using (true);

create policy "Admins can manage abilities"
  on public.abilities for all
  using (public.has_role(auth.uid(), 'admin'));

-- Character abilities policies
create policy "Users can view their character abilities"
  on public.character_abilities for select
  using (
    exists (
      select 1 from public.characters
      where characters.id = character_abilities.character_id
      and characters.user_id = auth.uid()
    )
  );

create policy "Users can manage their character abilities"
  on public.character_abilities for all
  using (
    exists (
      select 1 from public.characters
      where characters.id = character_abilities.character_id
      and characters.user_id = auth.uid()
    )
  );

-- Items policies (catalog is public)
create policy "Anyone can view items catalog"
  on public.items for select
  using (true);

create policy "Admins can manage items"
  on public.items for all
  using (public.has_role(auth.uid(), 'admin'));

-- Inventory policies
create policy "Users can view their own inventory"
  on public.inventory for select
  using (auth.uid() = user_id);

create policy "Users can manage their own inventory"
  on public.inventory for all
  using (auth.uid() = user_id);

-- Equipment policies
create policy "Users can view their character equipment"
  on public.equipment for select
  using (
    exists (
      select 1 from public.characters
      where characters.id = equipment.character_id
      and characters.user_id = auth.uid()
    )
  );

create policy "Users can manage their character equipment"
  on public.equipment for all
  using (
    exists (
      select 1 from public.characters
      where characters.id = equipment.character_id
      and characters.user_id = auth.uid()
    )
  );

-- Missions policies (public catalog)
create policy "Anyone can view missions"
  on public.missions for select
  using (true);

create policy "Admins can manage missions"
  on public.missions for all
  using (public.has_role(auth.uid(), 'admin'));

-- Mission dependencies policies
create policy "Anyone can view mission dependencies"
  on public.mission_dependencies for select
  using (true);

-- Mission progress policies
create policy "Users can view their own mission progress"
  on public.mission_progress for select
  using (auth.uid() = user_id);

create policy "Users can manage their own mission progress"
  on public.mission_progress for all
  using (auth.uid() = user_id);

-- Rewards policies
create policy "Users can view their own rewards"
  on public.rewards for select
  using (auth.uid() = user_id);

create policy "Users can claim their own rewards"
  on public.rewards for update
  using (auth.uid() = user_id);

-- Triggers and Functions

-- Update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply updated_at trigger to relevant tables
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_characters_updated_at
  before update on public.characters
  for each row execute function public.update_updated_at_column();

create trigger update_mission_progress_updated_at
  before update on public.mission_progress
  for each row execute function public.update_updated_at_column();

-- Auto-create profile and characters when user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_username text;
begin
  -- Generate username from email
  new_username := split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4);
  
  -- Create profile
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new_username,
    coalesce(new.raw_user_meta_data->>'display_name', new_username)
  );
  
  -- Assign player role
  insert into public.user_roles (user_id, role)
  values (new.id, 'player');
  
  -- Create Yumi character
  insert into public.characters (user_id, character_type, name, level, avatar_url)
  values (
    new.id,
    'yumi',
    'Yumi',
    1,
    '/placeholder.svg'
  );
  
  -- Create Kuro character
  insert into public.characters (user_id, character_type, name, level, avatar_url)
  values (
    new.id,
    'kuro',
    'Kuro',
    1,
    '/placeholder.svg'
  );
  
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Sync character levels (when Yumi levels up, Kuro gets bonuses)
create or replace function public.sync_character_bonuses()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  companion_character uuid;
  companion_type character_type;
begin
  -- Determine companion type
  if new.character_type = 'yumi' then
    companion_type := 'kuro';
  else
    companion_type := 'yumi';
  end if;
  
  -- Find companion character
  select id into companion_character
  from public.characters
  where user_id = new.user_id
  and character_type = companion_type;
  
  -- If character leveled up, give companion a bonus
  if new.level > old.level and companion_character is not null then
    update public.characters
    set 
      max_health_points = max_health_points + 5,
      max_energy_points = max_energy_points + 5,
      attack_power = attack_power + 2,
      defense_power = defense_power + 2,
      updated_at = now()
    where id = companion_character;
  end if;
  
  return new;
end;
$$;

create trigger character_level_sync
  after update on public.characters
  for each row
  when (old.level is distinct from new.level)
  execute function public.sync_character_bonuses();

-- Auto-unlock missions based on progress
create or replace function public.check_mission_unlocks()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  next_mission record;
begin
  -- When a mission is completed
  if new.status = 'completed' and old.status != 'completed' then
    -- Find missions that depend on this one
    for next_mission in
      select distinct m.id
      from public.missions m
      join public.mission_dependencies md on m.id = md.mission_id
      where md.required_mission_id = new.mission_id
      and not exists (
        select 1 from public.mission_progress
        where user_id = new.user_id
        and mission_id = m.id
      )
    loop
      -- Create progress entry with 'available' status
      insert into public.mission_progress (user_id, mission_id, status)
      values (new.user_id, next_mission.id, 'available')
      on conflict (user_id, mission_id) do update
      set status = 'available', updated_at = now();
    end loop;
  end if;
  
  return new;
end;
$$;

create trigger mission_unlock_trigger
  after update on public.mission_progress
  for each row
  execute function public.check_mission_unlocks();

-- Grant rewards when mission completed
create or replace function public.grant_mission_rewards()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  mission_data record;
  item_reward jsonb;
begin
  if new.status = 'completed' and old.status != 'completed' then
    -- Get mission data
    select * into mission_data
    from public.missions
    where id = new.mission_id;
    
    -- Grant experience and credits to profile
    update public.profiles
    set 
      experience_points = experience_points + mission_data.experience_reward,
      credits = credits + mission_data.credits_reward,
      updated_at = now()
    where id = new.user_id;
    
    -- Grant experience to both characters
    update public.characters
    set 
      experience_points = experience_points + (mission_data.experience_reward / 2),
      updated_at = now()
    where user_id = new.user_id;
    
    -- Create reward log
    insert into public.rewards (user_id, mission_id, reward_type, reward_data)
    values (
      new.user_id,
      new.mission_id,
      'mission_completion',
      jsonb_build_object(
        'experience', mission_data.experience_reward,
        'credits', mission_data.credits_reward,
        'items', mission_data.item_rewards
      )
    );
    
    -- Grant item rewards
    if mission_data.item_rewards is not null then
      for item_reward in select * from jsonb_array_elements(mission_data.item_rewards)
      loop
        insert into public.inventory (user_id, item_id, quantity)
        values (
          new.user_id,
          (item_reward->>'item_id')::uuid,
          (item_reward->>'quantity')::integer
        )
        on conflict (user_id, item_id) do update
        set quantity = inventory.quantity + (item_reward->>'quantity')::integer;
      end loop;
    end if;
  end if;
  
  return new;
end;
$$;

create trigger grant_rewards_trigger
  after update on public.mission_progress
  for each row
  execute function public.grant_mission_rewards();