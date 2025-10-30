-- =====================================================
-- CYBER FELINE - SECURITY FIXES
-- =====================================================

-- 1. CORREGIR POLÍTICAS RLS DE LA TABLA PROFILES
-- Eliminar política pública peligrosa
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Crear vista pública para leaderboard (solo datos no sensibles)
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
  id,
  username,
  level,
  experience_points,
  avatar_url
FROM public.profiles
ORDER BY experience_points DESC
LIMIT 100;

-- Permitir SELECT público solo en la vista del leaderboard
GRANT SELECT ON public.leaderboard TO anon, authenticated;

-- =====================================================
-- 2. PROTEGER TABLA MISSION_DEPENDENCIES
-- =====================================================
DROP POLICY IF EXISTS "Anyone can view mission dependencies" ON public.mission_dependencies;

CREATE POLICY "Authenticated users can view mission dependencies"
ON public.mission_dependencies
FOR SELECT
TO authenticated
USING (true);

-- =====================================================
-- 3. AUDITORÍA DE OTRAS TABLAS (CATÁLOGOS DEL JUEGO)
-- =====================================================

-- Proteger tabla MISSIONS - solo usuarios autenticados
DROP POLICY IF EXISTS "Anyone can view missions" ON public.missions;

CREATE POLICY "Authenticated users can view missions"
ON public.missions
FOR SELECT
TO authenticated
USING (true);

-- Proteger tabla ITEMS - solo usuarios autenticados
DROP POLICY IF EXISTS "Anyone can view items catalog" ON public.items;

CREATE POLICY "Authenticated users can view items"
ON public.items
FOR SELECT
TO authenticated
USING (true);

-- Proteger tabla ABILITIES - solo usuarios autenticados
DROP POLICY IF EXISTS "Anyone can view abilities" ON public.abilities;

CREATE POLICY "Authenticated users can view abilities"
ON public.abilities
FOR SELECT
TO authenticated
USING (true);

-- =====================================================
-- 4. AGREGAR ÍNDICES PARA MEJORAR RENDIMIENTO
-- =====================================================

-- Índice para leaderboard
CREATE INDEX IF NOT EXISTS idx_profiles_leaderboard 
ON public.profiles (experience_points DESC, level DESC);

-- Índice para búsqueda de roles de usuario
CREATE INDEX IF NOT EXISTS idx_user_roles_lookup 
ON public.user_roles (user_id, role);

-- =====================================================
-- 5. COMENTARIOS DE DOCUMENTACIÓN
-- =====================================================

COMMENT ON VIEW public.leaderboard IS 'Vista pública segura que expone solo datos no sensibles para el leaderboard del juego';
COMMENT ON POLICY "Authenticated users can view mission dependencies" ON public.mission_dependencies IS 'Restringe acceso a dependencias de misiones solo a usuarios autenticados';
COMMENT ON POLICY "Authenticated users can view missions" ON public.missions IS 'Catálogo de misiones solo visible para jugadores autenticados';
COMMENT ON POLICY "Authenticated users can view items" ON public.items IS 'Catálogo de items solo visible para jugadores autenticados';
COMMENT ON POLICY "Authenticated users can view abilities" ON public.abilities IS 'Catálogo de habilidades solo visible para jugadores autenticados';