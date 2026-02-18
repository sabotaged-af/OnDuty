import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
    return (
        <div className={cn('bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden', className)} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }) {
    return (
        <div className={cn('px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700', className)} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ className, children, ...props }) {
    return (
        <div className={cn('px-4 py-5 sm:p-6', className)} {...props}>
            {children}
        </div>
    );
}
