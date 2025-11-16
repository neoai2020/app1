interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getArticle(pageId: string) {
  try {
    // Direct fetch to Supabase REST API with service role key
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/pages?id=eq.${pageId}&select=*,niches(name)`,
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
        cache: 'no-store'
      }
    )
    
    const data = await response.json()
    return data && data.length > 0 ? data[0] : null
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug: pageId } = await params
  const page = await getArticle(pageId)

  if (!page) {
    return (
      <html>
        <body style={{ fontFamily: 'system-ui, sans-serif', padding: '40px', textAlign: 'center' }}>
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
        </body>
      </html>
    )
  }

  const heroTitles: Record<string, string> = {
    "Weight Loss": "The Ultimate Weight Loss Breakthrough",
    "Make Money Online": "How to Build Real Online Income",
    "Health & Fitness": "Transform Your Health Starting Today",
    "Tech & Gadgets": "The Latest Tech That Changes Everything",
    "Beauty & Skincare": "The Beauty Secrets That Actually Work",
    Relationships: "Build the Relationship You Deserve",
    Pets: "Everything Your Pet Needs to Thrive",
    "Home & Garden": "Transform Your Home Into Paradise",
  }

  const nicheName = page.niches?.name
  const nicheTitle = nicheName ? (heroTitles[nicheName] || page.title) : (page.title || "Life-Changing Insights")

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{nicheTitle}</title>
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: '1.6',
        color: '#e5e7eb',
        background: '#0f172a'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          borderBottom: '2px solid #1e40af'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: '#60a5fa',
            marginBottom: '20px',
            lineHeight: '1.2',
            margin: '0 0 20px 0'
          }}>{nicheTitle}</h1>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#94a3b8',
            fontSize: '0.95rem'
          }}>
            <span>📖 Expert Reviewed</span>
            <span>•</span>
            <span>Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '60px 20px'
        }}>
          <div dangerouslySetInnerHTML={{ __html: page.content || '<p>Content not available</p>' }} />
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          body > div > div h2 {
            font-size: 2rem !important;
            color: #60a5fa !important;
            margin: 40px 0 20px !important;
            font-weight: 700 !important;
          }
          body > div > div p {
            margin-bottom: 20px !important;
            font-size: 1.1rem !important;
            line-height: 1.8 !important;
            color: #cbd5e1 !important;
          }
          body > div > div a {
            color: #3b82f6 !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            border-bottom: 2px solid #3b82f6 !important;
            padding-bottom: 2px !important;
            transition: all 0.2s !important;
          }
          body > div > div a:hover {
            color: #60a5fa !important;
            border-color: #60a5fa !important;
          }
          body > div > div ul, body > div > div ol {
            margin: 20px 0 20px 30px !important;
            color: #cbd5e1 !important;
          }
          body > div > div li {
            margin-bottom: 12px !important;
            line-height: 1.8 !important;
          }
          @media (max-width: 768px) {
            h1 { font-size: 2rem !important; }
            h2 { font-size: 1.5rem !important; }
            p { font-size: 1rem !important; }
          }
        `}} />
      </body>
    </html>
  )
}
