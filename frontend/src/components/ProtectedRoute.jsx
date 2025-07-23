// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/user";

const ProtectedRoute = ({ children }) => {
	const user = useUserStore((state) => state.user);
	const token = useUserStore((state) => state.token);

	if (!user || !token) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
