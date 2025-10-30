-- =====================================================
-- FIX: Security Definer View Issue
-- =====================================================

-- Recrear la vista del leaderboard sin SECURITY DEFINER
DROP VIEW IF EXISTS public.leaderboard;

CREATE VIEW public.leaderboard 
WITH (security_invoker=true) AS
SELECT 
  id,
  username,
  level,
  experience_points,
  avatar_url
FROM public.profiles
ORDER BY experience_points DESC
LIMIT 100;

-- Re-otorgar permisos
GRANT SELECT ON public.leaderboard TO anon, authenticated;

COMMENT ON VIEW public.leaderboard IS 'Vista pública segura (security invoker) que expone solo datos no sensibles para el leaderboard del juego';