// Supabase API Helper for STEM MUN Application Management
// This file provides helper functions for interacting with the Supabase database

const SUPABASE_CONFIG = {
    url: 'https://steddllazfsprnfsmjng.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZWRkbGxhemZzcHJuZnNtam5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTYwMzQsImV4cCI6MjA3MTM5MjAzNH0.yf53IyNF3x0O90vPjmiDHOaSQyMlo8roIT3HpXWr_Zk'
};

class SupabaseAPI {
    constructor() {
        this.baseURL = SUPABASE_CONFIG.url;
        this.apiKey = SUPABASE_CONFIG.anonKey;
        this.headers = {
            'apikey': this.apiKey,
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
        };
    }

    // Submit a new application
    async submitApplication(applicationData) {
        try {
            const response = await fetch(`${this.baseURL}/rest/v1/applications`, {
                method: 'POST',
                headers: {
                    ...this.headers,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(applicationData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error submitting application:', error);
            throw error;
        }
    }

    // Get all applications with optional filtering
    async getApplications(filters = {}) {
        try {
            let url = `${this.baseURL}/rest/v1/applications?order=submitted_at.desc`;

            // Add filters if provided
            if (filters.status) {
                url += `&status=eq.${filters.status}`;
            }
            if (filters.email) {
                url += `&email=eq.${filters.email}`;
            }
            if (filters.dateFrom) {
                url += `&submitted_at=gte.${filters.dateFrom}`;
            }
            if (filters.dateTo) {
                url += `&submitted_at=lte.${filters.dateTo}`;
            }

            const response = await fetch(url, {
                headers: this.headers
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    }

    // Update application status
    async updateApplicationStatus(id, status, notes = null) {
        try {
            const updateData = {
                status: status,
                updated_at: new Date().toISOString()
            };

            if (notes) {
                updateData.notes = notes;
            }

            const response = await fetch(`${this.baseURL}/rest/v1/applications?id=eq.${id}`, {
                method: 'PATCH',
                headers: {
                    ...this.headers,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating application:', error);
            throw error;
        }
    }

    // Get application by ID
    async getApplicationById(id) {
        try {
            const response = await fetch(`${this.baseURL}/rest/v1/applications?id=eq.${id}`, {
                headers: this.headers
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.length > 0 ? data[0] : null;
        } catch (error) {
            console.error('Error fetching application:', error);
            throw error;
        }
    }

    // Get application statistics
    async getStatistics() {
        try {
            const response = await fetch(`${this.baseURL}/rest/v1/application_stats`, {
                headers: this.headers
            });

            if (!response.ok) {
                // Fallback to manual calculation if view doesn't exist
                const applications = await this.getApplications();
                return {
                    total_applications: applications.length,
                    pending_applications: applications.filter(app => app.status === 'pending').length,
                    approved_applications: applications.filter(app => app.status === 'approved').length,
                    rejected_applications: applications.filter(app => app.status === 'rejected').length,
                    latest_submission: applications.length > 0 ? applications[0].submitted_at : null
                };
            }

            const data = await response.json();
            return data.length > 0 ? data[0] : {};
        } catch (error) {
            console.error('Error fetching statistics:', error);
            throw error;
        }
    }

    // Delete application (admin only)
    async deleteApplication(id) {
        try {
            const response = await fetch(`${this.baseURL}/rest/v1/applications?id=eq.${id}`, {
                method: 'DELETE',
                headers: this.headers
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error deleting application:', error);
            throw error;
        }
    }

    // Bulk update applications
    async bulkUpdateStatus(ids, status) {
        try {
            const promises = ids.map(id => this.updateApplicationStatus(id, status));
            return await Promise.all(promises);
        } catch (error) {
            console.error('Error bulk updating applications:', error);
            throw error;
        }
    }

    // Search applications by text
    async searchApplications(searchTerm) {
        try {
            // Search in name and email fields
            const url = `${this.baseURL}/rest/v1/applications?or=(full_name.ilike.*${searchTerm}*,email.ilike.*${searchTerm}*)&order=submitted_at.desc`;
            
            const response = await fetch(url, {
                headers: this.headers
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error searching applications:', error);
            throw error;
        }
    }

    // Export applications data
    async exportApplications(format = 'json', filters = {}) {
        try {
            const applications = await this.getApplications(filters);
            
            if (format === 'csv') {
                return this.convertToCSV(applications);
            } else if (format === 'excel') {
                return this.convertToExcel(applications);
            } else {
                return applications;
            }
        } catch (error) {
            console.error('Error exporting applications:', error);
            throw error;
        }
    }

    // Helper method to convert data to CSV
    convertToCSV(data) {
        if (data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => {
                    const value = row[header];
                    // Escape values that contain commas or quotes
                    if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(',')
            )
        ].join('\\n');

        return csvContent;
    }

    // Helper method to validate application data
    validateApplicationData(data) {
        const required = ['full_name', 'email', 'phone', 'faculty', 'grade'];
        const missing = required.filter(field => !data[field] || data[field].trim() === '');
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        // Email validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Invalid email format');
        }

        // Phone validation
        const phoneRegex = /^[\\+]?[0-9\\s\\-\\(\\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            throw new Error('Invalid phone number format');
        }

        return true;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupabaseAPI;
} else if (typeof window !== 'undefined') {
    window.SupabaseAPI = SupabaseAPI;
}
