import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  return children;
}