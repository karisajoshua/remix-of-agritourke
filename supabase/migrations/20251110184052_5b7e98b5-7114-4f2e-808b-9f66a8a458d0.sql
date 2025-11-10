-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;

-- Create new policies that don't cause recursion
CREATE POLICY "Allow authenticated users to view user roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow admins to insert user roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

CREATE POLICY "Allow admins to update user roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

CREATE POLICY "Allow admins to delete user roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);