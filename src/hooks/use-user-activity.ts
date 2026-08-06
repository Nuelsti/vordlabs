import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { BrandService } from "@/services/brand.service";

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
      try {
        const brands = await BrandService.getUserBrands();
        if (!isMounted) return;
        setHasLiveActivity(brands.length > 0);
      } catch {
        if (isMounted) setHasLiveActivity(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadActivity();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return { hasLiveActivity, isLoading };
}
