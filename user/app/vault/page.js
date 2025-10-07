'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PasswordGenerator from '@/components/PasswordGenerator';
import VaultItem from '@/components/VaultItems';
import { getVaultItems, addVaultItem, deleteVaultItem, updateVaultItem } from '@/utils/api';
import { encryptData, decryptData } from '@/utils/crypto';

export default function Vault() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ 
    title: '', 
    username: '', 
    password: '', 
    url: '', 
    notes: '' 
  });

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }
    loadItems();
  }, [router]);

  const loadItems = async () => {
    try {
      const { success, vaultItems } = await getVaultItems();
      if (success) setItems(vaultItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.username?.toLowerCase().includes(search.toLowerCase()) ||
    item.url?.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleAdd = () => {
    setEditingItem(null);
    setForm({ title: '', username: '', password: '', url: '', notes: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({ 
      title: item.title, 
      username: item.username || '',
      password: decryptData(item.password), 
      url: item.url || '',
      notes: item.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    const { success } = await deleteVaultItem(id);
    if (success) loadItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encrypted = encryptData(form.password);

    try {
      const { success } = editingItem
        ? await updateVaultItem(editingItem._id, form.title, form.username, encrypted, form.url, form.notes)
        : await addVaultItem(form.title, form.username, encrypted, form.url, form.notes);
      
      if (success) {
        loadItems();
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">🔐 Password Vault</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <PasswordGenerator onUsePassword={(pwd) => setForm({ ...form, password: pwd })} />
          </div>

          <div className="md:col-span-2">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Your Vault</h2>
                <button onClick={handleAdd} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition">
                  + Add Item
                </button>
              </div>

              <input
                type="text"
                placeholder="Search by title, username, or URL..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 mb-4 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500"
              />

              {loading ? (
                <p className="text-slate-400 text-center py-8">Loading...</p>
              ) : filteredItems.length === 0 ? (
                <p className="text-slate-400 text-center py-8">
                  {search ? 'No items found' : 'No items yet. Add your first password!'}
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map(item => (
                    <VaultItem key={item._id} item={item} onDelete={handleDelete} onEdit={handleEdit} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingItem ? 'Edit Item' : 'Add Item'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Gmail Account"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">Username</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., john@example.com"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">Password *</label>
                <input
                  type="text"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter or generate password"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">URL</label>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500"
                  rows="3"
                  placeholder="Additional information..."
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition">
                  {editingItem ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}