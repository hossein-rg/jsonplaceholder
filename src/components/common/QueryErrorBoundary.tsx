import type { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

export function QueryErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center h-40 space-y-4 rounded-lg bg-destructive/10 text-destructive"
        >
            <p className="font-semibold">Something went wrong</p>
            <pre className="text-sm">{error.message}</pre>
            <Button onClick={resetErrorBoundary} variant="destructive">
                Try again
            </Button>
        </div>
    );
}