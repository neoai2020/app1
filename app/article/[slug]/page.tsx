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
        fontFamily: 'Georgia, "Times New Roman", serif',
        lineHeight: '1.8',
        color: '#1a202c',
        background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)'
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
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '10px 24px',
              borderRadius: '50px',
              marginBottom: '32px',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
            }}>
              {nicheName || 'Expert Insights'}
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: '1.15',
              margin: '0 0 24px 0',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.15)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>{nicheTitle}</h1>
            
            <div style={{
              width: '80px',
              height: '4px',
              background: 'rgba(255,255,255,0.5)',
              margin: '0 auto 32px',
              borderRadius: '2px'
            }} />
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              alignItems: 'center',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.95rem',
              flexWrap: 'wrap',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontWeight: 500
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block' }}>
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Expert Reviewed
              </span>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontWeight: 500
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block' }}>
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4.5V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '750px',
          margin: '-60px auto 0',
          padding: '0 24px 100px',
          position: 'relative',
          zIndex: 2
        }}>
          <article style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '64px 72px',
            boxShadow: '0 20px 80px -20px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.06)'
          }}>
            <div dangerouslySetInnerHTML={{ __html: page.content || '<p>Content not available</p>' }} />
          </article>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          article h2 {
            font-size: 2.125rem !important;
            color: #1a202c !important;
            margin: 56px 0 24px !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
            letter-spacing: -0.015em !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          }
          
          article h2:first-child {
            margin-top: 0 !important;
          }
          
          article h3 {
            font-size: 1.625rem !important;
            color: #2d3748 !important;
            margin: 40px 0 20px !important;
            font-weight: 600 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          }
          
          article p {
            margin-bottom: 24px !important;
            font-size: 1.125rem !important;
            line-height: 1.9 !important;
            color: #4a5568 !important;
            font-weight: 400 !important;
          }
          
          article p:first-of-type {
            font-size: 1.25rem !important;
            color: #2d3748 !important;
            font-weight: 500 !important;
            line-height: 1.8 !important;
          }
          
          article a {
            color: #667eea !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            border-bottom: 2px solid #667eea !important;
            padding-bottom: 1px !important;
            transition: all 0.3s ease !important;
            display: inline !important;
          }
          
          article a:hover {
            color: #764ba2 !important;
            border-color: #764ba2 !important;
            background: linear-gradient(to bottom, transparent 60%, rgba(102, 126, 234, 0.1) 60%) !important;
          }
          
          article ul, 
          article ol {
            margin: 32px 0 32px 0 !important;
            padding-left: 32px !important;
            color: #4a5568 !important;
            font-size: 1.125rem !important;
          }
          
          article li {
            margin-bottom: 16px !important;
            line-height: 1.9 !important;
            padding-left: 8px !important;
          }
          
          article li::marker {
            color: #667eea !important;
            font-weight: 700 !important;
          }
          
          article strong {
            color: #1a202c !important;
            font-weight: 700 !important;
          }
          
          article em {
            color: #718096 !important;
            font-style: italic !important;
          }
          
          article blockquote {
            border-left: 4px solid #667eea !important;
            padding-left: 24px !important;
            margin: 32px 0 !important;
            color: #2d3748 !important;
            font-style: italic !important;
            font-size: 1.2rem !important;
          }
          
          @media (max-width: 768px) {
            body > div:first-of-type {
              padding: 80px 20px 60px !important;
            }
            body > div:first-of-type h1 {
              font-size: 2.25rem !important;
            }
            body > div:nth-of-type(2) {
              padding: 0 16px 60px !important;
              margin-top: -40px !important;
            }
            article {
              padding: 40px 28px !important;
              border-radius: 12px !important;
            }
            article h2 {
              font-size: 1.75rem !important;
              margin: 40px 0 20px !important;
            }
            article h3 {
              font-size: 1.375rem !important;
            }
            article p {
              font-size: 1.0625rem !important;
            }
            article p:first-of-type {
              font-size: 1.125rem !important;
            }
            article ul,
            article ol {
              font-size: 1.0625rem !important;
              padding-left: 24px !important;
            }
          }
        `}} />
      </body>
    </html>
  )
}
