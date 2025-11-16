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
        <meta name="description" content="Discover expert insights and proven strategies" />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        background: '#ffffff',
        color: '#1a1a1a'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          padding: '120px 24px 100px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }} />
          
          <div style={{
            maxWidth: '850px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Category badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99, 102, 241, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '8px 20px',
              borderRadius: '100px',
              marginBottom: '40px'
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="6" r="6"/>
              </svg>
              {nicheName || 'Featured Article'}
            </div>
            
            {/* Title */}
            <h1 style={{
              fontSize: '3.75rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: '1.1',
              margin: '0 0 32px 0',
              letterSpacing: '-0.03em'
            }}>{nicheTitle}</h1>
            
            {/* Subtitle */}
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: '1.6',
              margin: '0 0 40px 0',
              fontWeight: 400,
              maxWidth: '700px'
            }}>
              Discover proven strategies and expert insights that deliver real results
            </p>
            
            {/* Meta info */}
            <div style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.9375rem',
              flexWrap: 'wrap'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px'
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5L7 13L3 9"/>
                </svg>
                Expert Verified
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span>Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '800px',
          margin: '-80px auto 0',
          padding: '0 24px 120px',
          position: 'relative',
          zIndex: 2
        }}>
          <article style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '80px 88px',
            boxShadow: '0 25px 100px -12px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div dangerouslySetInnerHTML={{ __html: page.content || '<p>Content not available</p>' }} />
          </article>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          * {
            box-sizing: border-box;
          }
          
          article h2 {
            font-size: 2.25rem !important;
            color: #0f172a !important;
            margin: 64px 0 24px !important;
            font-weight: 700 !important;
            line-height: 1.25 !important;
            letter-spacing: -0.025em !important;
            position: relative !important;
            padding-bottom: 16px !important;
          }
          
          article h2:first-child {
            margin-top: 0 !important;
          }
          
          article h2::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 60px !important;
            height: 4px !important;
            background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%) !important;
            border-radius: 2px !important;
          }
          
          article h3 {
            font-size: 1.75rem !important;
            color: #1e293b !important;
            margin: 48px 0 20px !important;
            font-weight: 600 !important;
            line-height: 1.3 !important;
            letter-spacing: -0.015em !important;
          }
          
          article p {
            margin-bottom: 28px !important;
            font-size: 1.125rem !important;
            line-height: 1.85 !important;
            color: #475569 !important;
            font-weight: 400 !important;
          }
          
          article p:first-of-type {
            font-size: 1.3125rem !important;
            color: #1e293b !important;
            font-weight: 500 !important;
            line-height: 1.7 !important;
            margin-bottom: 32px !important;
          }
          
          article a {
            color: #6366f1 !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            background: linear-gradient(to bottom, transparent 60%, rgba(99, 102, 241, 0.15) 60%) !important;
            transition: all 0.2s ease !important;
            display: inline !important;
            padding: 0 2px !important;
          }
          
          article a:hover {
            color: #4f46e5 !important;
            background: linear-gradient(to bottom, transparent 50%, rgba(99, 102, 241, 0.25) 50%) !important;
          }
          
          article ul, 
          article ol {
            margin: 32px 0 !important;
            padding-left: 0 !important;
            list-style: none !important;
          }
          
          article li {
            margin-bottom: 20px !important;
            font-size: 1.125rem !important;
            line-height: 1.85 !important;
            color: #475569 !important;
            padding-left: 36px !important;
            position: relative !important;
          }
          
          article li::before {
            content: '' !important;
            position: absolute !important;
            left: 0 !important;
            top: 10px !important;
            width: 20px !important;
            height: 20px !important;
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          article li::after {
            content: '✓' !important;
            position: absolute !important;
            left: 5px !important;
            top: 10px !important;
            color: #ffffff !important;
            font-size: 12px !important;
            font-weight: 700 !important;
          }
          
          article strong {
            color: #0f172a !important;
            font-weight: 700 !important;
          }
          
          article em {
            color: #64748b !important;
            font-style: italic !important;
          }
          
          article blockquote {
            border-left: 4px solid #6366f1 !important;
            background: #f8fafc !important;
            padding: 24px 28px !important;
            margin: 40px 0 !important;
            border-radius: 0 8px 8px 0 !important;
            color: #1e293b !important;
            font-style: italic !important;
            font-size: 1.1875rem !important;
            font-weight: 500 !important;
          }
          
          @media (max-width: 768px) {
            body > div:first-of-type {
              padding: 80px 20px 70px !important;
            }
            body > div:first-of-type h1 {
              font-size: 2.5rem !important;
            }
            body > div:first-of-type p {
              font-size: 1.0625rem !important;
            }
            body > div:nth-of-type(2) {
              padding: 0 16px 80px !important;
              margin-top: -60px !important;
            }
            article {
              padding: 48px 32px !important;
              border-radius: 16px !important;
            }
            article h2 {
              font-size: 1.875rem !important;
              margin: 48px 0 20px !important;
            }
            article h3 {
              font-size: 1.5rem !important;
              margin: 36px 0 16px !important;
            }
            article p,
            article li {
              font-size: 1.0625rem !important;
            }
            article p:first-of-type {
              font-size: 1.1875rem !important;
            }
          }
        `}} />
      </body>
    </html>
  )
}
