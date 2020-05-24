import React from 'react';

interface RBACProps {
  allowed: Array<number>;
  roleID?: number;
  fallback?: React.ReactNode;
}

const RBAC: React.FC<RBACProps> = ({ allowed, roleID, fallback = <></>, children }) => (
  <>{allowed.map((arole) => arole === roleID).reduce((prev, curr) => prev || curr) ? children : fallback}</>
);

export default RBAC;
