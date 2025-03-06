'use client';

import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface BoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

export default function Boundary({
  children,
  fallback = <div className="flex items-center justify-center min-h-[200px]">Loading...</div>,
  errorFallback = <div className="flex items-center justify-center min-h-[200px]">Something went wrong</div>,
}: BoundaryProps) {
  return (
    <ErrorBoundary fallback={<>{errorFallback}</>}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
} 