-- Drop all existing policies on user_roles table
DROP POLICY IF EXISTS "User roles are viewable by everyone" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow authenticated users to view user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow admins to insert user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow admins to update user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow admins to delete user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;

-- Create new non-recursive policies using the security definer function
CREATE POLICY "user_roles_select_policy"
ON public.user_roles
FOR SELECT
USING (true);

CREATE POLICY "user_roles_insert_policy"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "user_roles_update_policy"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "user_roles_delete_policy"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));