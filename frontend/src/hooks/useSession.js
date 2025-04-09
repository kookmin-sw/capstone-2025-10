import { useEffect, useState } from "react";

export default function useSession() {
  const [user, setUser] = useState(null); // 로그인한 사용자 정보
  const [loading, setLoading] = useState(true); // 로딩 여부
  const [error, setError] = useState(null); // 에러 처리용

  useEffect(() => {
    const fetchSession = async () => {
      //try {
      //  const res = await fetch(`localhost:8080/api/users/${id}`);
      //  if (!res.ok) {
      //    throw new Error("세션 없음");
      //  }
      //
      //  const data = await res.json();
      //  setUser(data.user); // { id, name, email, ... }
      //} catch (err) {
      //  setUser(null);
      //  setError(err);
      //} finally {
      //  setLoading(false);
      //}
    };

    fetchSession();
  }, []);

  return { user, loading, error, isLoggedIn: !!user };
}
