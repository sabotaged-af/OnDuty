import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Spinner({ className, size = 24 }) {
    return (
        <Loader2
            className={cn('animate-spin text-indigo-600 dark:text-indigo-400', className)}
            size={size}
        />
    );
}

export function PageLoader() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Spinner size={48} />
        </div>
    );
}
