// import { useEffect } from 'react';
// import { useAuth0 } from '../../utils/auth';

// export const ProtectedRoute = ({ children }) => {
//   const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
//   useEffect(() => {
//     if (loading || isAuthenticated) {
//       return undefined;
//     }
//     const asyncLogin = async () => {
//       await loginWithRedirect({
//         appState: { targetUrl: window.location.pathname },
//       });
//     };
//     asyncLogin();
//   }, [loading, isAuthenticated, loginWithRedirect]);
//   return children;
// };
