import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // 現在は認証機能なしで、単純にchildrenを返す
  return <>{children}</>;
}; 