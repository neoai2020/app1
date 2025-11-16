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
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: '1.7',
        color: '#1f2937',
        background: '#ffffff'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '100px 24px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: '1.1',
              margin: '0 0 24px 0',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
              letterSpacing: '-0.02em'
            }}>{nicheTitle}</h1>
            <div style={{
              display: 'inline-flex',
              gap: '20px',
              alignItems: 'center',
              color: 'rgba(255,255,255,0.95)',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.15)',
              padding: '12px 28px',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontWeight: 600 }}>✓ Expert Reviewed</span>
              <span style={{ opacity: 0.7 }}>•</span>
              <span>Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '80px 32px',
          background: '#ffffff'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '0'
          }}>
            <div dangerouslySetInnerHTML={{ __html: page.content || '<p>Content not available</p>' }} />
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          body > div:last-of-type > div > div h2 {
            font-size: 2.25rem !important;
            color: #111827 !important;
            margin: 56px 0 24px !important;
            font-weight: 800 !important;
            line-height: 1.2 !important;
            letter-spacing: -0.02em !important;
          }
          
          body > div:last-of-type > div > div h2:first-child {
            margin-top: 0 !important;
          }
          
          body > div:last-of-type > div > div p {
            margin-bottom: 24px !important;
            font-size: 1.125rem !important;
            line-height: 1.9 !important;
            color: #374151 !important;
            font-weight: 400 !important;
          }
          
          body > div:last-of-type > div > div a {
            color: #667eea !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            border-bottom: 2px solid #667eea !important;
            padding-bottom: 2px !important;
            transition: all 0.3s ease !important;
            display: inline !important;
          }
          
          body > div:last-of-type > div > div a:hover {
            color: #764ba2 !important;
            border-color: #764ba2 !important;
            background: rgba(102, 126, 234, 0.05) !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          
          body > div:last-of-type > div > div ul, 
          body > div:last-of-type > div > div ol {
            margin: 28px 0 28px 24px !important;
            color: #374151 !important;
            font-size: 1.125rem !important;
          }
          
          body > div:last-of-type > div > div li {
            margin-bottom: 16px !important;
            line-height: 1.9 !important;
            padding-left: 8px !important;
          }
          
          body > div:last-of-type > div > div strong {
            color: #111827 !important;
            font-weight: 700 !important;
          }
          
          @media (max-width: 768px) {
            body > div:first-of-type {
              padding: 60px 20px 50px !important;
            }
            body > div:first-of-type h1 {
              font-size: 2.25rem !important;
            }
            body > div:last-of-type {
              padding: 48px 20px !important;
            }
            body > div:last-of-type > div > div h2 {
              font-size: 1.75rem !important;
              margin: 40px 0 20px !important;
            }
            body > div:last-of-type > div > div p {
              font-size: 1rem !important;
            }
          }
        `}} />
      </body>
    </html>
  )
}
