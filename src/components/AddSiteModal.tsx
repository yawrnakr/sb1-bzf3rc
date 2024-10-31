import React, { useState } from 'react';
import { X, AlertCircle, Globe, Tag, Info } from 'lucide-react';

const TOPICS = [
  'Education',
  'News',
  'Entertainment',
  'Technology',
  'Finance',
  'Gaming',
  'Sports',
  'Lifestyle',
];

interface AddSiteModalProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export default function AddSiteModal({ onClose, onSubmit }: AddSiteModalProps) {
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    topics: [] as string[],
    gam_id: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidatingGAM, setIsValidatingGAM] = useState(false);

  const validateGAMId = async (gamId: string) => {
    // This would be replaced with actual GAM API validation
    return /^\d{11}$/.test(gamId);
  };

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.url) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (!formData.name) {
      newErrors.name = 'Site name is required';
    }

    if (!formData.gam_id) {
      newErrors.gam_id = 'Google Ad Manager Network ID is required';
    } else {
      setIsValidatingGAM(true);
      const isValidGAM = await validateGAMId(formData.gam_id);
      setIsValidatingGAM(false);
      
      if (!isValidGAM) {
        newErrors.gam_id = 'Please enter a valid Google Ad Manager Network ID';
      }
    }

    if (formData.topics.length === 0) {
      newErrors.topics = 'Please select at least one topic';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!await validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error adding site:', error);
    }
  };

  const toggleTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-8 border w-full max-w-2xl shadow-lg rounded-xl bg-gray-900 border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Globe className="h-6 w-6 text-sage mr-2" />
            <h2 className="text-xl font-bold text-white">Add New Site</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-blue-400 font-medium">
                Google Ad Manager Integration Required
              </p>
              <p className="text-sm text-blue-300/80 mt-1">
                A valid Google Ad Manager Network ID is required to fetch revenue data, traffic statistics, and other metrics for your website.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Google Ad Manager Network ID *
            </label>
            <input
              type="text"
              value={formData.gam_id}
              onChange={(e) => setFormData(prev => ({ ...prev, gam_id: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent placeholder-gray-500"
              placeholder="21700000000"
            />
            {errors.gam_id && (
              <p className="mt-1 text-sm text-red-400">{errors.gam_id}</p>
            )}
            <p className="mt-1 text-sm text-gray-400">
              Example: 21700000000 (11 digits)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Site URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent placeholder-gray-500"
              placeholder="https://example.com"
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-400">{errors.url}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Site Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent placeholder-gray-500"
              placeholder="My Website"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Topics *
            </label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.topics.includes(topic)
                      ? 'bg-sage/20 text-sage border border-sage/30'
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {topic}
                </button>
              ))}
            </div>
            {errors.topics && (
              <p className="mt-1 text-sm text-red-400">{errors.topics}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isValidatingGAM}
              className="px-4 py-2 text-sm font-medium text-white bg-sage rounded-lg hover:bg-sage/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isValidatingGAM ? 'Validating...' : 'Add Site'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}