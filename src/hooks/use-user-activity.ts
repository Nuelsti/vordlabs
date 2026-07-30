import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export function useUserActivity() {
  const { user } = useAuth();
  const [hasLiveActivity, setHasLiveActivity] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setHasLiveActivity(false);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadActivity = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("business_name")
        .eq("id", user.id)
        .maybeSingle();

      if (!isMounted) return;

      const hasActivity = Boolean(data?.business_name?.trim());
      setHasLiveActivity(!error && hasActivity);
      setIsLoading(false);
    };

    void loadActivity();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return { hasLiveActivity, isLoading };
}
