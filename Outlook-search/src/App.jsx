import React, { useState } from 'react';
import { Search, Paperclip, Mail, FileText, ChevronRight, User, Loader2, Sparkles, Building2 } from 'lucide-react';

export default function App() {
const [searchQuery, setSearchQuery] = useState('');
const [personCompany, setPersonCompany] = useState('');
const [hasAttachment, setHasAttachment] = useState(false);
const [isSearching, setIsSearching] = useState(false);
const [results, setResults] = useState(null);

// Simulated search function to mimic Microsoft Graph API
const handleSearch = (e) => {
e.preventDefault();

// Ensure at least one field has input before searching
if (!searchQuery.trim() && !personCompany.trim()) return;

setIsSearching(true);
setResults(null);

// Simulate network delay and AI processing
setTimeout(() => {
  setIsSearching(false);
  
  // Mock data that filters based on the optional inputs
  const allResults = [
    {
      id: 1,
      subject: "Q3 Financial Projections & Analysis",
      sender: "sarah.jenkins@acmecorp.com",
      date: "Oct 12, 2026",
      snippet: "...based on the current market trends, I've attached the revised Q3 projections you asked for. Please review page 4 specifically for the budget breakdown...",
      aiInsight: "Extracted from page 4 of attached PDF.",
      attachments: [
        { name: "Q3_Projections_v2.pdf", type: "pdf" },
        { name: "Budget_Data.xlsx", type: "excel" }
      ]
    },
    {
      id: 2,
      subject: "Re: Client Onboarding Process Updates",
      sender: "david.chen@company.com",
      date: "Sep 28, 2026",
      snippet: "Here is the signed contract and the updated workflow diagram. Let me know if the legal team needs anything else from our end.",
      aiInsight: "Semantic match for 'Onboarding'.",
      attachments: [
        { name: "Signed_Agreement.pdf", type: "pdf" }
      ]
    },
    {
      id: 3,
      subject: "Notes from Weekly Sync",
      sender: "team-updates@acmecorp.com",
      date: "Sep 25, 2026",
      snippet: "We discussed the Q3 goals, product launch timelines, and the new hiring roadmap.",
      aiInsight: "Match found in email body.",
      attachments: []
    }
  ];

  // Apply the mock filtering logic
  setResults(allResults.filter(email => {
    // Filter by attachment
    if (hasAttachment && email.attachments.length === 0) return false;
    
    // Filter by person/company if provided
    if (personCompany.trim()) {
      const searchVal = personCompany.toLowerCase();
      if (!email.sender.toLowerCase().includes(searchVal) && 
          !email.subject.toLowerCase().includes(searchVal)) {
        return false;
      }
    }
    
    return true;
  }));
}, 1500);


};

const isSearchDisabled = !searchQuery.trim() && !personCompany.trim();

return (

{/* Vibrant Add-in Header */}





AI Smart Search



  {/* Search Controls */}
  <div className="p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm z-10">
    <form onSubmit={handleSearch} className="space-y-4">
      
      {/* Main Keyword Search (Optional) */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 text-sm transition-all"
          placeholder="Keywords, topics, or meaning (Optional)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Person or Company Search (Optional) */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Building2 className="h-5 w-5 text-slate-400 group-focus-within:text-fuchsia-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 bg-slate-50 text-sm transition-all"
          placeholder="Person or Company (Optional)"
          value={personCompany}
          onChange={(e) => setPersonCompany(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        {/* Custom Sliding Toggle for Attachments */}
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={hasAttachment}
              onChange={(e) => setHasAttachment(e.target.checked)}
            />
            <div className={`block w-10 h-6 rounded-full transition-colors ${hasAttachment ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform flex items-center justify-center ${hasAttachment ? 'transform translate-x-4' : ''}`}>
               {hasAttachment && <Paperclip className="w-2.5 h-2.5 text-orange-500" />}
            </div>
          </div>
          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
            Has attachments
          </span>
        </label>

        <button
          type="submit"
          disabled={isSearchDisabled || isSearching}
          className="px-5 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all"
        >
          Search
        </button>
      </div>
    </form>
  </div>

  {/* Results Area */}
  <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
    {isSearching ? (
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-fuchsia-500" />
        <p className="text-sm font-medium animate-pulse">Analyzing inbox & attachments...</p>
      </div>
    ) : results ? (
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-sm font-bold text-slate-600">
            Found {results.length} result{results.length !== 1 && 's'}
          </h2>
        </div>

        {results.map((email) => (
          <div key={email.id} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 leading-tight group-hover:text-violet-600 transition-colors">
                  {email.subject}
                </h3>
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap ml-2 bg-slate-100 px-2 py-1 rounded-md">
                  {email.date}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
                <div className="flex items-center truncate">
                  <User className="w-4 h-4 mr-1.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{email.sender}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 line-clamp-2 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{email.snippet}"
              </p>

              <div className="flex items-start bg-gradient-to-r from-violet-50 to-fuchsia-50 text-violet-800 text-xs font-medium p-2.5 rounded-lg mb-3 border border-violet-100/50">
                <Sparkles className="w-4 h-4 mr-1.5 flex-shrink-0 text-fuchsia-500" />
                <span>{email.aiInsight}</span>
              </div>

              {email.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-slate-100">
                  {email.attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm px-2.5 py-1.5 text-xs font-medium text-slate-700">
                      {att.type === 'pdf' ? (
                        <FileText className="w-4 h-4 mr-1.5 text-orange-500" />
                      ) : (
                        <FileText className="w-4 h-4 mr-1.5 text-emerald-500" />
                      )}
                      <span className="truncate max-w-[120px]">{att.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg">No matches found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 pt-10">
        <div className="bg-slate-100 p-4 rounded-full">
           <Mail className="w-10 h-10 text-slate-300" />
        </div>
        <p className="text-sm font-medium text-center max-w-xs text-slate-500">
          Ready to search your inbox and attachments securely using AI.
        </p>
      </div>
    )}
  </div>
</div>


);
}
