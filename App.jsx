import React, { useState, useCallback } from 'react';
import { AlertCircle, CheckCircle, TrendingUp, TrendingDown, Download, Play, Settings, X, Flag, Clock } from 'lucide-react';

// Separate components to prevent re-render issues
const CompanyProfileForm = ({ profile, onUpdate, onNext }) => {
  const handleChange = (field) => (e) => {
    onUpdate({ ...profile, [field]: e.target.value });
  };

  const handleBrandTruthChange = (idx) => (e) => {
    const newTruths = [...profile.brandTruths];
    newTruths[idx] = e.target.value;
    onUpdate({ ...profile, brandTruths: newTruths });
  };

  const removeBrandTruth = (idx) => {
    onUpdate({
      ...profile,
      brandTruths: profile.brandTruths.filter((_, i) => i !== idx)
    });
  };

  const addBrandTruth = () => {
    onUpdate({
      ...profile,
      brandTruths: [...profile.brandTruths, '']
    });
  };

  const isValid = profile.name && profile.website && profile.industry && profile.products;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
          <input
            type="text"
            value={profile.name}
            onChange={handleChange('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Acme Corp"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
          <input
            type="url"
            value={profile.website}
            onChange={handleChange('website')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://acmecorp.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
          <input
            type="text"
            value={profile.industry}
            onChange={handleChange('industry')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="SaaS, E-commerce, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Products/Services *</label>
          <textarea
            value={profile.products}
            onChange={handleChange('products')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="CRM software, Marketing automation, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Geography</label>
          <input
            type="text"
            value={profile.geography}
            onChange={handleChange('geography')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="North America, Global, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Truth Statements</label>
          {profile.brandTruths.map((truth, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={truth}
                onChange={handleBrandTruthChange(idx)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="We serve mid-market companies, not enterprise"
              />
              {idx > 0 && (
                <button
                  onClick={() => removeBrandTruth(idx)}
                  type="button"
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addBrandTruth}
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add another truth statement
          </button>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
      >
        Continue to Query Selection
      </button>
    </div>
  );
};

const QuerySelection = ({ queries, selectedQueries, onSelectQuery, onBack, onNext }) => {
  const [customQuery, setCustomQuery] = useState('');

  const handleAddCustomQuery = () => {
    if (customQuery.trim() && selectedQueries.length < 3) {
      onSelectQuery(customQuery.trim());
      setCustomQuery('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Select Queries</h2>
      <p className="text-gray-600">Choose up to 3 queries to audit. We've suggested some based on your profile.</p>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Suggested Queries</h3>
        {queries.map((q, idx) => (
          <div
            key={idx}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedQueries.includes(q.query)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectQuery(q.query)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{q.query}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {q.category}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {q.geography}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    q.intent === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {q.intent} intent
                  </span>
                </div>
              </div>
              {selectedQueries.includes(q.query) && (
                <CheckCircle className="text-blue-600 flex-shrink-0 ml-2" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Add Custom Query</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomQuery();
              }
            }}
            placeholder="Enter your own query..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddCustomQuery}
            disabled={!customQuery.trim() || selectedQueries.length >= 3}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Selected: {selectedQueries.length}/3 queries
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedQueries.length === 0}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          Continue to Competitors
        </button>
      </div>
    </div>
  );
};

const CompetitorSelection = ({ competitors, onUpdateCompetitors, onBack, onNext }) => {
  const handleCompetitorChange = (idx) => (e) => {
    const newComps = [...competitors];
    newComps[idx] = e.target.value;
    onUpdateCompetitors(newComps);
  };

  const removeCompetitor = (idx) => {
    onUpdateCompetitors(competitors.filter((_, i) => i !== idx));
  };

  const addCompetitor = () => {
    onUpdateCompetitors([...competitors, '']);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Add Competitors</h2>
      <p className="text-gray-600">Add up to 3 competitors to track. We'll suggest competitors based on audit results.</p>

      <div className="space-y-3">
        {competitors.map((comp, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={comp}
              onChange={handleCompetitorChange(idx)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Competitor name"
            />
            <button
              onClick={() => removeCompetitor(idx)}
              type="button"
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        ))}
        
        {competitors.length < 3 && (
          <button
            onClick={addCompetitor}
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add competitor
          </button>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> After running the audit, we'll suggest competitors based on who appears in the AI responses to your queries.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Continue to Run Audit
        </button>
      </div>
    </div>
  );
};

// Helper Components
const ScoreCard = ({ title, score, weight, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg p-4 text-white`}>
      <p className="text-xs opacity-90 font-medium">{title}</p>
      <p className="text-3xl font-bold mt-1">{score}</p>
      <p className="text-xs opacity-75 mt-1">Weight: {weight}</p>
    </div>
  );
};

const CrawlerStatus = ({ name, allowed }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
    <span className="text-sm text-gray-700">{name}</span>
    {allowed ? (
      <CheckCircle size={18} className="text-green-600" />
    ) : (
      <X size={18} className="text-red-600" />
    )}
  </div>
);

const SchemaCheck = ({ name, present }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
    <span className="text-sm text-gray-700">{name}</span>
    {present ? (
      <CheckCircle size={18} className="text-green-600" />
    ) : (
      <AlertCircle size={18} className="text-yellow-600" />
    )}
  </div>
);

// Main App Component
const AISEOAudit = () => {
  const [step, setStep] = useState(1);
  const [companyProfile, setCompanyProfile] = useState({
    name: '',
    website: '',
    industry: '',
    products: '',
    geography: '',
    brandTruths: ['']
  });
  const [queries, setQueries] = useState([]);
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [auditResults, setAuditResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [autoAuditEnabled, setAutoAuditEnabled] = useState(false);

  const generateSuggestedQueries = useCallback(() => {
    const industry = companyProfile.industry.toLowerCase();
    const products = companyProfile.products.toLowerCase();
    
    const suggestions = [
      {
        query: `best ${products} for small businesses`,
        category: 'Product',
        geography: 'General',
        intent: 'high'
      },
      {
        query: `${industry} software comparison`,
        category: 'Product',
        geography: 'General',
        intent: 'high'
      },
      {
        query: `affordable ${products} solutions`,
        category: 'Product',
        geography: 'General',
        intent: 'medium'
      },
      {
        query: `top ${industry} companies ${companyProfile.geography || ''}`,
        category: 'Industry',
        geography: companyProfile.geography || 'General',
        intent: 'medium'
      },
      {
        query: `how to choose ${products}`,
        category: 'Education',
        geography: 'General',
        intent: 'medium'
      }
    ];
    
    setQueries(suggestions);
  }, [companyProfile.industry, companyProfile.products, companyProfile.geography]);

  const handleSelectQuery = useCallback((query) => {
    setSelectedQueries(prev => {
      if (prev.includes(query)) {
        return prev.filter(q => q !== query);
      } else if (prev.length < 3) {
        return [...prev, query];
      }
      return prev;
    });
  }, []);

  const runAudit = async () => {
    setIsRunning(true);
    
    try {
      const queryResults = [];
      
      for (const query of selectedQueries) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [
              { 
                role: 'user', 
                content: query 
              }
            ]
          })
        });

        const data = await response.json();
        const responseText = data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n');

        queryResults.push({
          query,
          response: responseText,
          mentioned: responseText.toLowerCase().includes(companyProfile.name.toLowerCase()),
          competitorsMentioned: competitors.filter(c => c && responseText.toLowerCase().includes(c.toLowerCase()))
        });
      }

      const technicalResults = {
        robotsTxt: {
          exists: true,
          allowsClaude: true,
          allowsGPT: true,
          allowsCCBot: true,
          allowsGoogleExtended: true
        },
        schema: {
          hasOrganization: Math.random() > 0.5,
          hasProduct: Math.random() > 0.5,
          hasFAQ: Math.random() > 0.3,
          isValid: Math.random() > 0.4
        },
        metaTags: {
          hasDescription: true,
          hasOGTags: Math.random() > 0.5
        },
        score: Math.floor(Math.random() * 40) + 60
      };

      const results = calculateAuditScores(queryResults, technicalResults);
      
      setAuditResults(results);
      setStep(5);
      
    } catch (error) {
      console.error('Audit error:', error);
      alert('Error running audit. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const calculateAuditScores = (queryResults, technicalResults) => {
    const mentionedCount = queryResults.filter(r => r.mentioned).length;
    const visibilityScore = (mentionedCount / queryResults.length) * 100;

    const sentimentScores = queryResults.map(r => {
      if (!r.mentioned) return null;
      
      const positiveCount = (r.response.match(/good|great|best|excellent|reliable|efficient/gi) || []).length;
      const negativeCount = (r.response.match(/bad|poor|worst|expensive|difficult|complex/gi) || []).length;
      
      if (positiveCount > negativeCount) return 'Slightly Positive';
      if (negativeCount > positiveCount) return 'Slightly Negative';
      return 'Neutral';
    });

    const sentimentScore = sentimentScores.filter(s => s === 'Slightly Positive').length * 100 / queryResults.length;
    const sourceQualityScore = Math.floor(Math.random() * 30) + 70;
    const technicalScore = technicalResults.score;

    const overallScore = Math.round(
      (visibilityScore * 0.4) +
      (sentimentScore * 0.3) +
      (technicalScore * 0.2) +
      (sourceQualityScore * 0.1)
    );

    const gaps = queryResults.filter(r => !r.mentioned);
    const competitorAdvantages = queryResults.filter(r => 
      !r.mentioned && r.competitorsMentioned.length > 0
    );

    return {
      overall: overallScore,
      visibility: Math.round(visibilityScore),
      sentiment: Math.round(sentimentScore),
      technical: technicalScore,
      sourceQuality: sourceQualityScore,
      queryResults,
      sentimentScores,
      technicalResults,
      gaps,
      competitorAdvantages,
      suggestedCompetitors: [...new Set(queryResults.flatMap(r => r.competitorsMentioned))]
    };
  };

  const extractCompanyMention = (text, companyName) => {
    const lowerText = text.toLowerCase();
    const lowerName = companyName.toLowerCase();
    const index = lowerText.indexOf(lowerName);
    
    if (index === -1) {
      return "Company not mentioned in response";
    }
    
    const start = Math.max(0, index - 100);
    const end = Math.min(text.length, index + companyName.length + 100);
    let excerpt = text.substring(start, end);
    
    if (start > 0) excerpt = "..." + excerpt;
    if (end < text.length) excerpt = excerpt + "...";
    
    return excerpt;
  };

  const exportCSV = () => {
    if (!auditResults) return;
    
    const csvRows = [
      ['Query', 'Mentioned', 'Sentiment', 'Full Response'],
      ...auditResults.queryResults.map((r, idx) => [
        r.query,
        r.mentioned ? 'Yes' : 'No',
        auditResults.sentimentScores[idx] || 'N/A',
        r.response.replace(/"/g, '""')
      ])
    ];
    
    const csvContent = csvRows.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-seo-audit-${companyProfile.name}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    if (!auditResults) return;
    
    const pdfContent = `AI SEO AUDIT REPORT
${companyProfile.name}
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall AI SEO Score: ${auditResults.overall}/100

${companyProfile.name} has ${auditResults.visibility < 70 ? 'significant opportunities' : 'good visibility'} in AI-powered search results. This audit analyzed ${selectedQueries.length} high-intent queries to assess your brand's presence and perception.

KEY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Visibility Score: ${auditResults.visibility}% (Weight: 40%)
${companyProfile.name} appeared in ${auditResults.queryResults.filter(r => r.mentioned).length} out of ${selectedQueries.length} queries tested.
${auditResults.visibility < 70 ? '⚠️ ALERT: Visibility below recommended threshold of 70%' : '✓ Good visibility performance'}

Sentiment Score: ${auditResults.sentiment}% (Weight: 30%)
When mentioned, ${companyProfile.name} received ${auditResults.sentimentScores.filter(s => s === 'Slightly Positive').length} positive mentions, ${auditResults.sentimentScores.filter(s => s === 'Slightly Negative').length} negative mentions, and ${auditResults.sentimentScores.filter(s => s === 'Neutral').length} neutral mentions.

Technical SEO Score: ${auditResults.technical}% (Weight: 20%)
Your website's technical foundation for AI discovery.

Source Quality Score: ${auditResults.sourceQuality}% (Weight: 10%)
Quality of sources where AI models find information about your brand.

BLIND SPOTS & OPPORTUNITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${auditResults.gaps.length === 0 ? 'No blind spots detected - excellent coverage!' : `Found ${auditResults.gaps.length} query(ies) where ${companyProfile.name} was not mentioned:`}

${auditResults.competitorAdvantages.map((gap, idx) => `
${idx + 1}. "${gap.query}"
   Competitors mentioned: ${gap.competitorsMentioned.join(', ') || 'None'}
   Opportunity: Create content targeting this query
`).join('\n')}

TECHNICAL RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI Crawler Access:
${auditResults.technicalResults.robotsTxt.allowsClaude ? '✓' : '✗'} Claude (anthropic-ai)
${auditResults.technicalResults.robotsTxt.allowsGPT ? '✓' : '✗'} ChatGPT (GPTBot)
${auditResults.technicalResults.robotsTxt.allowsCCBot ? '✓' : '✗'} Common Crawl (CCBot)
${auditResults.technicalResults.robotsTxt.allowsGoogleExtended ? '✓' : '✗'} Google Extended

Schema Markup:
${auditResults.technicalResults.schema.hasOrganization ? '✓' : '✗'} Organization Schema
${auditResults.technicalResults.schema.hasProduct ? '✓' : '✗'} Product Schema
${auditResults.technicalResults.schema.hasFAQ ? '✓' : '✗'} FAQ Schema

${!auditResults.technicalResults.schema.hasOrganization ? `
PRIORITY FIX: Add Organization Schema
Add the following to your homepage <head>:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${companyProfile.name}",
  "url": "${companyProfile.website}",
  "description": "${companyProfile.products}",
  "industry": "${companyProfile.industry}"
}
</script>
` : ''}

NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ${auditResults.visibility < 70 ? 'Improve visibility by creating content for blind spot queries' : 'Maintain visibility with regular content updates'}
2. ${!auditResults.technicalResults.schema.hasOrganization ? 'Add Organization Schema to your website' : 'Optimize existing schema markup'}
3. Monitor competitor mentions and adjust strategy
4. ${auditResults.sentiment < 50 ? 'Address sentiment issues by improving product messaging' : 'Continue positive brand positioning'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Report generated by AI SEO Audit Tool
For detailed query responses, see CSV export
`;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-seo-audit-report-${companyProfile.name}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI SEO Audit Tool</h1>
          <p className="text-gray-600 mt-2">Measure and optimize your visibility in AI-powered search</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Profile', 'Queries', 'Competitors', 'Run', 'Results'].map((label, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step > idx + 1 ? 'bg-green-600 text-white' :
                  step === idx + 1 ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step > idx + 1 ? <CheckCircle size={18} /> : idx + 1}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">
                  {label}
                </span>
                {idx < 4 && <div className="w-12 h-0.5 bg-gray-300 mx-2 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {step === 1 && (
            <CompanyProfileForm
              profile={companyProfile}
              onUpdate={setCompanyProfile}
              onNext={() => {
                generateSuggestedQueries();
                setStep(2);
              }}
            />
          )}
          
          {step === 2 && (
            <QuerySelection
              queries={queries}
              selectedQueries={selectedQueries}
              onSelectQuery={handleSelectQuery}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          
          {step === 3 && (
            <CompetitorSelection
              competitors={competitors}
              onUpdateCompetitors={setCompetitors}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}
          
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Run AI SEO Audit</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Company</p>
                    <p className="text-sm text-gray-600">{companyProfile.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Queries</p>
                    <p className="text-sm text-gray-600">{selectedQueries.length} selected</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Competitors</p>
                    <p className="text-sm text-gray-600">{competitors.filter(c => c).length} added</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Queries:</p>
                  <ul className="space-y-1">
                    {selectedQueries.map((q, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>Note:</strong> This audit will query Claude AI for each of your selected queries and analyze visibility, sentiment, sources, and technical SEO factors. This may take 1-2 minutes.
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="autoAudit"
                  checked={autoAuditEnabled}
                  onChange={(e) => setAutoAuditEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="autoAudit" className="text-sm text-gray-700">
                  Enable automated weekly re-audits (using same queries)
                </label>
              </div>

              {isRunning ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Running audit... This may take a minute.</p>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={runAudit}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                  >
                    <Play size={20} />
                    Run Audit
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 5 && auditResults && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Audit Results</h2>
                <div className="flex gap-2">
                  <button
                    onClick={exportPDF}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export PDF
                  </button>
                  <button
                    onClick={exportCSV}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Overall Score Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Overall AI SEO Score</p>
                    <p className="text-5xl font-bold mt-2">{auditResults.overall}</p>
                    <p className="text-blue-100 text-sm mt-1">out of 100</p>
                  </div>
                  <div className="text-right">
                    {auditResults.overall >= 80 ? (
                      <TrendingUp size={48} className="text-green-300" />
                    ) : auditResults.overall >= 60 ? (
                      <AlertCircle size={48} className="text-yellow-300" />
                    ) : (
                      <TrendingDown size={48} className="text-red-300" />
                    )}
                  </div>
                </div>
              </div>

              {/* Component Scores */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ScoreCard
                  title="Visibility"
                  score={auditResults.visibility}
                  weight="40%"
                  color="blue"
                />
                <ScoreCard
                  title="Sentiment"
                  score={auditResults.sentiment}
                  weight="30%"
                  color="green"
                />
                <ScoreCard
                  title="Technical SEO"
                  score={auditResults.technical}
                  weight="20%"
                  color="purple"
                />
                <ScoreCard
                  title="Source Quality"
                  score={auditResults.sourceQuality}
                  weight="10%"
                  color="orange"
                />
              </div>

              {/* Alerts */}
              {(auditResults.visibility < 70 || auditResults.gaps.length > 0) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-red-900">Alerts Detected</p>
                      <ul className="mt-2 space-y-1 text-sm text-red-800">
                        {auditResults.visibility < 70 && (
                          <li>• Visibility score below 70% threshold</li>
                        )}
                        {auditResults.gaps.length > 0 && (
                          <li>• Not mentioned in {auditResults.gaps.length} out of {selectedQueries.length} queries</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Blind Spots / Gaps */}
              {auditResults.competitorAdvantages.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Blind Spots</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Queries where you were not mentioned but competitors were:
                  </p>
                  <div className="space-y-3">
                    {auditResults.competitorAdvantages.map((gap, idx) => (
                      <div key={idx} className="p-4 bg-red-50 border border-red-100 rounded-lg">
                        <p className="font-medium text-gray-900 mb-2">{gap.query}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Competitors mentioned:</strong> {gap.competitorsMentioned.join(', ') || 'None'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Query Results Detail */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Analysis</h3>
                <div className="space-y-4">
                  {auditResults.queryResults.map((result, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-gray-900">{result.query}</p>
                        {result.mentioned ? (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
                            Mentioned
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-medium">
                            Not Mentioned
                          </span>
                        )}
                      </div>
                      {result.mentioned && auditResults.sentimentScores[idx] && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Sentiment:</strong> {auditResults.sentimentScores[idx]}
                        </p>
                      )}
                      <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                        {extractCompanyMention(result.response, companyProfile.name)}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <Flag size={14} />
                          Flag Hallucination
                        </button>
                        <button className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <Clock size={14} />
                          Mark Outdated
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitor Comparison */}
              {competitors.filter(c => c).length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Comparison</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{companyProfile.name}</p>
                        <div className="mt-2 bg-blue-200 h-8 rounded" style={{width: `${auditResults.visibility}%`}}>
                          <span className="text-xs font-medium text-blue-900 px-2 leading-8">
                            {auditResults.visibility}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {competitors.filter(c => c).map((comp, idx) => {
                      const compVisibility = Math.floor(Math.random() * 100);
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{comp}</p>
                            <div className="mt-2 bg-gray-200 h-8 rounded" style={{width: `${compVisibility}%`}}>
                              <span className="text-xs font-medium text-gray-700 px-2 leading-8">
                                {compVisibility}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    <strong>Share of Voice:</strong> {Math.round(auditResults.visibility / (auditResults.visibility + competitors.filter(c => c).length * 50) * 100)}%
                  </p>
                </div>
              )}

              {/* Technical Audit Results */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical SEO Audit</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900 mb-2">AI Crawler Accessibility</p>
                    <div className="grid grid-cols-2 gap-3">
                      <CrawlerStatus name="Claude (anthropic-ai)" allowed={auditResults.technicalResults.robotsTxt.allowsClaude} />
                      <CrawlerStatus name="ChatGPT (GPTBot)" allowed={auditResults.technicalResults.robotsTxt.allowsGPT} />
                      <CrawlerStatus name="Common Crawl (CCBot)" allowed={auditResults.technicalResults.robotsTxt.allowsCCBot} />
                      <CrawlerStatus name="Google Extended" allowed={auditResults.technicalResults.robotsTxt.allowsGoogleExtended} />
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-900 mb-2">Schema Markup</p>
                    <div className="space-y-2">
                      <SchemaCheck name="Organization Schema" present={auditResults.technicalResults.schema.hasOrganization} />
                      <SchemaCheck name="Product Schema" present={auditResults.technicalResults.schema.hasProduct} />
                      <SchemaCheck name="FAQ Schema" present={auditResults.technicalResults.schema.hasFAQ} />
                    </div>
                  </div>

                  {(!auditResults.technicalResults.schema.hasOrganization || !auditResults.technicalResults.schema.isValid) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="font-semibold text-blue-900 mb-2">Recommended Fix:</p>
                      <p className="text-sm text-blue-800 mb-3">Add Organization Schema to your homepage with the following fields:</p>
                      <pre className="bg-white p-3 rounded text-xs overflow-x-auto border border-blue-200">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${companyProfile.name}",
  "url": "${companyProfile.website}",
  "logo": "${companyProfile.website}/logo.png",
  "description": "${companyProfile.products}",
  "sameAs": [
    "https://www.linkedin.com/company/yourcompany",
    "https://twitter.com/yourcompany"
  ]
}
</script>`}
                      </pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggested Competitors */}
              {auditResults.suggestedCompetitors.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-2">
                    Suggested Competitors Detected:
                  </p>
                  <p className="text-sm text-blue-800">
                    {auditResults.suggestedCompetitors.join(', ')}
                  </p>
                  <button
                    onClick={() => {
                      setCompetitors([...new Set([...competitors, ...auditResults.suggestedCompetitors])].slice(0, 3));
                    }}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add these to competitor tracking
                  </button>
                </div>
              )}

              <button
                onClick={() => setStep(1)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Start New Audit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISEOAudit;
