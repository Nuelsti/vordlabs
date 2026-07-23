import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type User = {
  id: string;
  email: string | undefined;
  name: string | undefined;
} | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDisplayName = (
      sessionUser: typeof supabase.auth.getUser extends () => infer T ? T : never,
    ) => {
      return undefined;
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const sessionUser = session?.user;
      const displayName =
        sessionUser?.user_metadata?.full_name ||
        sessionUser?.user_metadata?.name ||
        sessionUser?.email?.split("@")[0] ||
        undefined;

      setUser(
        sessionUser ? { id: sessionUser.id, email: sessionUser.email, name: displayName } : null,
      );
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;
      const displayName =
        sessionUser?.user_metadata?.full_name ||
        sessionUser?.user_metadata?.name ||
        sessionUser?.email?.split("@")[0] ||
        undefined;

      setUser(
        sessionUser ? { id: sessionUser.id, email: sessionUser.email, name: displayName } : null,
      );
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, isLoading, signOut };
}
