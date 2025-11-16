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
        color: '#0f172a',
        background: '#f8fafc'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(to bottom right, #0f172a 0%, #1e293b 50%, #334155 100%)',
          padding: '120px 24px 100px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }} />
          
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '32px',
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)'
            }}>
              {nicheName || 'Premium Content'}
            </div>
            
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '28px',
              lineHeight: '1.1',
              margin: '0 0 28px 0',
              letterSpacing: '-0.03em',
              textShadow: '0 4px 24px rgba(0,0,0,0.3)'
            }}>{nicheTitle}</h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '40px',
              fontWeight: 400,
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}>
              Discover proven strategies and expert insights that deliver real results
            </p>
            
            <div style={{
              display: 'inline-flex',
              gap: '28px',
              alignItems: 'center',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.9rem',
              padding: '0'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontWeight: 500
              }}>
                <span style={{ fontSize: '1.1rem' }}>✓</span> Expert Verified
              </span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span style={{ fontWeight: 500 }}>Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span style={{ fontWeight: 500 }}>5 min read</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '820px',
          margin: '-40px auto 0',
          padding: '0 32px 120px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '72px 80px',
            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.04)'
          }}>
            <div dangerouslySetInnerHTML={{ __html: page.content || '<p>Content not available</p>' }} />
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          body > div:nth-of-type(2) > div > div h2 {
            font-size: 2rem !important;
            color: #0f172a !important;
            margin: 64px 0 28px !important;
            font-weight: 800 !important;
            line-height: 1.3 !important;
            letter-spacing: -0.02em !important;
            position: relative !important;
            padding-bottom: 16px !important;
          }
          
          body > div:nth-of-type(2) > div > div h2:first-child {
            margin-top: 0 !important;
          }
          
          body > div:nth-of-type(2) > div > div h2::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 60px !important;
            height: 4px !important;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
            border-radius: 2px !important;
          }
          
          body > div:nth-of-type(2) > div > div p {
            margin-bottom: 28px !important;
            font-size: 1.125rem !important;
            line-height: 1.9 !important;
            color: #475569 !important;
            font-weight: 400 !important;
          }
          
          body > div:nth-of-type(2) > div > div a {
            color: #3b82f6 !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            border-bottom: 2px solid #3b82f6 !important;
            padding-bottom: 2px !important;
            transition: all 0.2s ease !important;
            display: inline !important;
          }
          
          body > div:nth-of-type(2) > div > div a:hover {
            color: #1d4ed8 !important;
            border-color: #1d4ed8 !important;
            background: linear-gradient(to bottom, transparent 50%, rgba(59, 130, 246, 0.08) 50%) !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          
          body > div:nth-of-type(2) > div > div ul, 
          body > div:nth-of-type(2) > div > div ol {
            margin: 32px 0 32px 0 !important;
            padding-left: 28px !important;
            color: #475569 !important;
            font-size: 1.125rem !important;
          }
          
          body > div:nth-of-type(2) > div > div li {
            margin-bottom: 18px !important;
            line-height: 1.9 !important;
            padding-left: 12px !important;
          }
          
          body > div:nth-of-type(2) > div > div li::marker {
            color: #3b82f6 !important;
            font-weight: 700 !important;
          }
          
          body > div:nth-of-type(2) > div > div strong {
            color: #0f172a !important;
            font-weight: 700 !important;
          }
          
          body > div:nth-of-type(2) > div > div em {
            color: #64748b !important;
            font-style: italic !important;
          }
          
          @media (max-width: 768px) {
            body > div:first-of-type {
              padding: 80px 20px 70px !important;
            }
            body > div:first-of-type h1 {
              font-size: 2.5rem !important;
            }
            body > div:first-of-type p {
              font-size: 1.125rem !important;
            }
            body > div:nth-of-type(2) {
              padding: 0 20px 80px !important;
              margin-top: -30px !important;
            }
            body > div:nth-of-type(2) > div {
              padding: 48px 32px !important;
              border-radius: 16px !important;
            }
            body > div:nth-of-type(2) > div > div h2 {
              font-size: 1.625rem !important;
              margin: 48px 0 20px !important;
            }
            body > div:nth-of-type(2) > div > div p {
              font-size: 1.0625rem !important;
            }
            body > div:nth-of-type(2) > div > div ul,
            body > div:nth-of-type(2) > div > div ol {
              font-size: 1.0625rem !important;
            }
          }
        `}} />
      </body>
    </html>
  )
}
