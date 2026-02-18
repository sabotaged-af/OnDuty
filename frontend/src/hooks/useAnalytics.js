import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useAnalytics() {
    const location = useLocation();

    useEffect(() => {
        // Mock analytics call
        console.log(`Analytics: Page view ${location.pathname}`);

        // Example: window.gtag('event', 'page_view', { page_path: location.pathname });
    }, [location]);
}
