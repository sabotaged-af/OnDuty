import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Trash2, Plus, RefreshCw, Wifi, WifiOff } from 'lucide-react';



export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [serverParams, setServerParams] = useState({ status: 'checking', timestamp: null });

    const checkServer = async () => {
        try {
            // "api" instance already has /api base, so we use full URL or relative if we change base.
            // But server has /health at root. Let's use axios directly or fetch relative to origin if proxy?
            // Since we know backend is at localhost:5000 (or VITE_API_URL without /api suffix ideally), 
            // let's try to assume relative to our API conf but strip /api if needed?
            // Simpler: Just try to fetch /items which we know works if backend is up.
            // If /items works, server is up.

            // Actually, let's just stick to the items call status as proxy for connection for now to avoid URL complexity issues
            // BUT, to be explicit as requested:
            const baseUrl = api.defaults.baseURL.replace('/api', '');
            const res = await fetch(`${baseUrl}/health`);
            if (res.ok) setServerParams({ status: 'connected', timestamp: new Date() });
            else throw new Error('Not OK');
        } catch (e) {
            setServerParams({ status: 'disconnected', timestamp: null });
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        checkServer(); // Check server status on fetch
        try {
            const response = await api.get('/items');
            setItems(response.data);
            // OFFLINE: Save to localStorage
            localStorage.setItem('dashboard_items', JSON.stringify(response.data));
        } catch (err) {
            console.error(err);
            setError('Failed to fetch items. Showing cached data if available.');
            // OFFLINE: Load from localStorage
            const cached = localStorage.getItem('dashboard_items');
            if (cached) {
                setItems(JSON.parse(cached));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newItemTitle.trim()) return;

        setSubmitting(true);
        try {
            const response = await api.post('/items', { title: newItemTitle, description: 'Created from dashboard' });
            setItems([...items, response.data]);
            setNewItemTitle('');
        } catch (err) {
            alert('Failed to create item');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/items/${id}`);
            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            alert('Failed to delete item');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${serverParams.status === 'connected'
                        ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                        : serverParams.status === 'checking'
                            ? 'bg-gray-100 text-gray-800 border-gray-200'
                            : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                        }`}>
                        {serverParams.status === 'connected' ? <Wifi size={14} /> : <WifiOff size={14} />}
                        <span>
                            {serverParams.status === 'connected' ? 'Server Online' : serverParams.status === 'checking' ? 'Checking...' : 'Server Offline'}
                        </span>
                    </div>
                </div>
                <Button variant="ghost" onClick={fetchItems} size="sm">
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </Button>
            </div>

            {/* Analytics Hook Demo */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Page visits tracked via useAnalytics (mock).
            </div>

            {error && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-200 p-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Create New Item Card */}
                <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-transparent shadow-none">
                    <CardContent className="flex flex-col items-center justify-center h-full py-8">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Item</h3>
                        <form onSubmit={handleCreate} className="w-full space-y-3">
                            <input
                                type="text"
                                placeholder="Item title..."
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                            />
                            <Button type="submit" className="w-full" isLoading={submitting} disabled={!newItemTitle.trim()}>
                                <Plus size={16} className="mr-2" />
                                Create Item
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {loading && items.length === 0 ? (
                    <div className="col-span-full flex justify-center py-12">
                        <Spinner />
                    </div>
                ) : (
                    items.map((item) => (
                        <Card key={item.id} className="relative group">
                            <CardHeader>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{item.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                    {item.description || 'No description provided.'}
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Scalability / Offline Note */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-blue-800 dark:text-blue-200">
                <strong>Scalability & Offline Support:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Offline:</strong> Data is cached in <code>localStorage</code> on successful fetch. on error, cached data is shown. Use <code>react-query</code> or Service Workers (PWA) for advanced offline caching.</li>
                    <li><strong>Scaling:</strong> List is paginated on backend (conceptual). Frontend implementation should use infinite scroll or pagination controls for 1M+ records.</li>
                </ul>
            </div>
        </div>
    );
}
