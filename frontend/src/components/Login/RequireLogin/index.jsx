import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RequireLogin = ({ children }) => {
  const { isLoggedIn, loading, error } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) return <p>세션 확인 중...</p>;

  return <>{children}</>;
};

export default RequireLogin;
