// In-memory store for demo stability (if DB fails or not connected)
let items = [
    { id: 1, title: 'Project Alpha', description: 'MVP development for hackathon', created_at: new Date() },
    { id: 2, title: 'Design System', description: 'Create reusable components', created_at: new Date() },
];

/**
 * Get all items
 * @route GET /api/items
 */
exports.getAllItems = async (req, res) => {
    try {
        // SCALABILITY: Implement pagination (limit/offset) here for large datasets.
        // CACHING: Check Redis cache here before returning.

        // Simulate DB call
        // const { data, error } = await supabase.from('items').select('*');

        // Fallback to in-memory for stability during demo
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Create a new item
 * @route POST /api/items
 */
exports.createItem = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const newItem = {
            id: items.length + 1,
            title,
            description: description || '',
            created_at: new Date(),
        };

        items.push(newItem);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Update an item
 * @route PUT /api/items/:id
 */
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const index = items.findIndex(i => i.id == id);
        if (index === -1) return res.status(404).json({ error: 'Item not found' });

        items[index] = { ...items[index], title: title || items[index].title, description: description || items[index].description };

        res.json(items[index]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Delete an item
 * @route DELETE /api/items/:id
 */
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const index = items.findIndex(i => i.id == id);

        if (index === -1) return res.status(404).json({ error: 'Item not found' });

        const deleted = items.splice(index, 1);
        res.json(deleted[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
