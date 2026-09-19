import { store } from './storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const DEMO_USER_ID = 'demo-user';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }

  headers.set('x-user-id', DEMO_USER_ID);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const api = {
  getProfile: async () => {
    try {
      return await request('/profile');
    } catch {
      return store.getProfile();
    }
  },

  updateProfile: async <T>(profile: T) => {
    try {
      return await request('/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
    } catch {
      store.updateProfile(profile as any);
      return profile;
    }
  },

  getReports: async () => {
    try {
      return await request('/reports');
    } catch {
      return store.getReports();
    }
  },

  getVitals: async () => {
    try {
      return await request('/vitals');
    } catch {
      return store.getVitals();
    }
  },

  addVital: async <T>(vital: T) => {
    try {
      return await request('/vitals', {
        method: 'POST',
        body: JSON.stringify(vital),
      });
    } catch {
      store.addVital(vital as any);
      return vital;
    }
  },

  getJournal: async () => {
    try {
      return await request('/journal');
    } catch {
      return store.getJournal();
    }
  },

  addJournalEntry: async <T>(entry: T) => {
    try {
      return await request('/journal', {
        method: 'POST',
        body: JSON.stringify(entry),
      });
    } catch {
      store.addJournalEntry(entry as any);
      return entry;
    }
  },

  getAlerts: async () => {
    try {
      return await request('/alerts');
    } catch {
      return store.getAlerts();
    }
  },

  markAlertRead: async (id: string) => {
    try {
      return await request(`/alerts/${id}/read`, { method: 'PATCH' });
    } catch {
      store.markAlertRead(id);
      return { success: true };
    }
  },

  getTimeline: async () => {
    try {
      return await request('/timeline');
    } catch {
      return store.getUnifiedTimeline();
    }
  },

  getSpecialists: async (organId?: string) => {
    try {
      return await request(organId ? `/specialists?organId=${encodeURIComponent(organId)}` : '/specialists');
    } catch {
      return store.getSpecialists();
    }
  },

  askChatbot: async (question: string) => {
    try {
      return await request('/chat/query', {
        method: 'POST',
        body: JSON.stringify({ question }),
      });
    } catch {
      return {
        answer: 'The assistant is currently unavailable, but the app remains grounded in your local health data.',
        groundedSource: 'Local fallback mode',
        question,
        safetyNotice: 'This assistant does not diagnose or prescribe medicine.',
      };
    }
  },

  uploadReport: async (file: File, metadata: Record<string, string> = {}) => {
    const formData = new FormData();
    formData.append('file', file);

    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      return await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: {
          'x-user-id': DEMO_USER_ID,
        },
        body: formData,
      }).then(async (response) => {
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || `Upload failed: ${response.status}`);
        }
        return response.json();
      });
    } catch {
      const fallback = {
        id: `rep-${Date.now()}`,
        patientId: 'p-01',
        title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
        category: metadata.category || 'Other Report',
        uploadDate: new Date().toISOString().split('T')[0],
        documentDate: metadata.documentDate || new Date().toISOString().split('T')[0],
        facility: metadata.facility || 'Unknown facility',
        fileType: file.type.includes('pdf') ? 'pdf' : 'photo',
        pageCount: 1,
        fileName: file.name,
        extractedParameters: [],
        rawTextPreview: 'Local fallback upload stored only in client storage.',
        ocrConfidence: 0,
        aiSummary: 'Fallback upload — backend unavailable.',
        flaggedCount: 0,
      };
      store.addReport(fallback as any);
      return fallback;
    }
  },
};
