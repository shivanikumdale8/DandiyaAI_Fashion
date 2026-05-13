import { useState, useEffect } from 'react';
import { useFirebase } from '../components/FirebaseProvider';
import { getDresses, addDress, deleteDress } from '../lib/firebase/firestore';
import { uploadImage } from '../lib/firebase/storage';
import { Dress } from '../types';
import { DRESSES } from '../constants'; // For seeding
import { Plus, Trash2, Upload, Loader2, Database } from 'lucide-react';

export default function Admin() {
  const { isAdmin, user, loading: authLoading } = useFirebase();
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addingStep, setAddingStep] = useState<string>('');
  const [syncingAdmin, setSyncingAdmin] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  
  // New dress form state
  const [newDress, setNewDress] = useState({
    name: '',
    description: '',
    price: 0,
    rentPrice: 0,
    rating: 5,
    category: 'Women' as const,
    color: 'Pink',
    style: 'Traditional' as const,
    featured: false,
    size: ['S', 'M', 'L']
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [useUrl, setUseUrl] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchDresses();
      if (user?.email === 'shivanikumdale8@gmail.com') {
        syncAdminRecord();
      }
    }
  }, [isAdmin, user]);

  const syncAdminRecord = async () => {
    if (!user) return;
    setSyncingAdmin(true);
    try {
      const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase/config');
      
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDoc = await getDoc(adminDocRef);
      
      if (!adminDoc.exists()) {
        await setDoc(adminDocRef, {
          email: user.email,
          uid: user.uid,
          createdAt: serverTimestamp()
        });
        console.log('Admin record created in admins collection');
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().role !== 'admin') {
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(userDocRef, { role: 'admin' });
        console.log('User role upgraded to admin in users collection');
      }
      setSyncStatus('success');
    } catch (error) {
      console.error('Error syncing admin record:', error);
      setSyncStatus('error');
    } finally {
      setSyncingAdmin(false);
    }
  };

  const fetchDresses = async () => {
    setLoading(true);
    try {
      const data = await getDresses();
      if (data) setDresses(data as Dress[]);
    } catch (error) {
      console.error('Error fetching dresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      for (const dress of DRESSES) {
        const { id, ...dressData } = dress; // Remove static id
        await addDress(dressData);
      }
      alert('Database seeded successfully!');
      fetchDresses();
    } catch (error) {
      alert('Error seeding database: ' + error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this dress?')) return;
    try {
      await deleteDress(id);
      fetchDresses();
    } catch (error) {
      alert('Error deleting dress: ' + error);
    }
  };

  const handleAddDress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!useUrl && !imageFile) {
      alert('Please upload an image');
      return;
    }
    if (useUrl && !imageUrl) {
      alert('Please provide an image URL');
      return;
    }
    setSyncStatus('idle');
    setFormError(null);
    setIsAdding(true);
    try {
      let finalImageUrl = imageUrl;
      
      if (!useUrl && imageFile) {
        setAddingStep('Uploading image to storage...');
        console.log('Uploading image...');
        finalImageUrl = await uploadImage(imageFile);
        console.log('Image uploaded:', finalImageUrl);
      }
      
      setAddingStep('Saving dress details to database...');
      console.log('Adding dress to database...');
      const dressData = {
        ...newDress,
        image: finalImageUrl,
        rating: Number(newDress.rating) || 5, // Ensure number
        price: Number(newDress.price),
        rentPrice: Number(newDress.rentPrice)
      };
      
      await addDress(dressData);
      
      setAddingStep('Success!');
      setNewDress({
        name: '',
        description: '',
        price: 0,
        rentPrice: 0,
        rating: 5,
        category: 'Women',
        color: 'Pink',
        style: 'Traditional',
        featured: false,
        size: ['S', 'M', 'L']
      });
      setImageFile(null);
      setImageUrl('');
      // Removed alert, will show success in UI
      setTimeout(() => setAddingStep(''), 3000);
      fetchDresses();
    } catch (error: any) {
      console.error('Error adding dress:', error);
      let errorMessage = 'Error adding dress: ';
      
      // Extract specific error details if it's our JSON-formatted firestore error
      if (error.message && error.message.includes('{')) {
        try {
          const startIndex = error.message.indexOf('{');
          const parsed = JSON.parse(error.message.substring(startIndex));
          errorMessage += parsed.error || error.message;
        } catch {
          errorMessage += error.message;
        }
      } else {
        errorMessage += error.message;
      }
      
      setFormError(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

  if (authLoading) return <div className="pt-32 text-center">Checking authorization...</div>;
  if (!isAdmin) return <div className="pt-32 text-center text-red-500 font-bold">Access Denied. Admin only.</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display italic mb-2">Admin Dashboard</h1>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${syncStatus === 'success' ? 'bg-green-500' : syncStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`} />
              <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                {syncingAdmin ? 'Syncing Authorization...' : 
                 syncStatus === 'success' ? 'Admin Verified' : 
                 syncStatus === 'error' ? 'Sync Error - DB Permissions' : 'Awaiting Verification'}
              </p>
            </div>
            {user?.email && (
              <p className="text-[10px] text-gray-500 font-mono">{user.email}</p>
            )}
          </div>
        </div>
        <button 
          onClick={handleSeed}
          disabled={isSeeding}
          className="flex items-center gap-2 px-6 py-3 bg-brand-purple rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-purple/90 disabled:opacity-50 transition-all text-white"
        >
          {isSeeding ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />}
          Seed Database with Samples
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add Dress Form */}
        <div className="lg:col-span-1 glass-panel p-8 rounded-[2rem] border border-white/10 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="text-brand-orange" /> Add New Dress
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-xs text-red-200">
                {formError}
              </div>
            )}

            {addingStep && (
              <div className="mb-4 p-3 bg-brand-purple/20 border border-brand-purple/50 rounded-xl text-xs text-brand-purple-lite flex items-center gap-2">
                <Loader2 size={12} className={addingStep.includes('Success') ? "" : "animate-spin"} />
                {addingStep}
              </div>
            )}

            <form onSubmit={handleAddDress} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Dress Name</label>
              <input 
                type="text" 
                required
                value={newDress.name}
                onChange={e => setNewDress({...newDress, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Price</label>
                <input 
                  type="number" 
                  required
                  value={newDress.price}
                  onChange={e => setNewDress({...newDress, price: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Rent Price</label>
                <input 
                  type="number" 
                  required
                  value={newDress.rentPrice}
                  onChange={e => setNewDress({...newDress, rentPrice: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Category</label>
                <select 
                  value={newDress.category}
                  onChange={e => setNewDress({...newDress, category: e.target.value as any})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all"
                >
                  <option className="bg-brand-maroon">Women</option>
                  <option className="bg-brand-maroon">Men</option>
                  <option className="bg-brand-maroon">Couple</option>
                  <option className="bg-brand-maroon">Kids</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Style</label>
                <select 
                  value={newDress.style}
                  onChange={e => setNewDress({...newDress, style: e.target.value as any})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all"
                >
                  <option className="bg-brand-maroon">Traditional</option>
                  <option className="bg-brand-maroon">Modern</option>
                  <option className="bg-brand-maroon">Indo-Western</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Image</label>
                <button 
                  type="button"
                  onClick={() => setUseUrl(!useUrl)}
                  className="text-[8px] uppercase font-bold tracking-widest text-brand-orange underline"
                >
                  {useUrl ? "Upload File instead" : "Use URL instead"}
                </button>
              </div>
              
              {useUrl ? (
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all text-xs"
                />
              ) : (
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files?.[0] || null)}
                    className="hidden" 
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload"
                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-6 cursor-pointer hover:bg-white/10 transition-all"
                  >
                    <Upload size={20} className={imageFile ? "text-brand-yellow" : "text-gray-500"} />
                    <span className="text-xs font-medium text-gray-400">
                      {imageFile ? imageFile.name : "Upload Dress Image"}
                    </span>
                  </label>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Rating (1-5)</label>
                <input 
                  type="number" 
                  step="0.1"
                  min="1"
                  max="5"
                  required
                  value={newDress.rating}
                  onChange={e => setNewDress({...newDress, rating: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Color</label>
                <input 
                  type="text" 
                  required
                  value={newDress.color}
                  onChange={e => setNewDress({...newDress, color: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all"
                  placeholder="e.g. Red, Pink"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 py-2">
              <input 
                type="checkbox" 
                id="featured"
                checked={newDress.featured}
                onChange={e => setNewDress({...newDress, featured: e.target.checked})}
                className="w-4 h-4 accent-brand-orange"
              />
              <label htmlFor="featured" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 cursor-pointer">Feature on Homepage</label>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 block">Description</label>
              <textarea 
                value={newDress.description}
                onChange={e => setNewDress({...newDress, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-orange transition-all h-24"
              />
            </div>
            <button 
              type="submit"
              disabled={isAdding}
              className="w-full py-4 bg-brand-orange rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-orange/90 transition-all text-white flex items-center justify-center gap-2"
            >
              {isAdding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              Add Dress to Catalog
            </button>
          </form>
        </div>

        {/* Dress List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="animate-spin text-brand-orange" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {dresses.map(dress => (
                <div key={dress.id} className="glass-panel rounded-3xl overflow-hidden border border-white/10 group">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img src={dress.image} alt={dress.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <button 
                      onClick={() => handleDelete(dress.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{dress.name}</h3>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{dress.category} • {dress.style}</span>
                      <span className="text-brand-yellow font-bold">₹{dress.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
