interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getArticle(pageId: string) {
  try {
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
        <body style={{ fontFamily: 'system-ui, sans-serif', padding: '40px', textAlign: 'center', background: '#0a0a0a', color: '#fff' }}>
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
  
  const contentParts = page.content ? page.content.split('</p>') : []
  const midPoint = Math.floor(contentParts.length / 2)
  const firstHalf = contentParts.slice(0, midPoint).join('</p>') + '</p>'
  const secondHalf = contentParts.slice(midPoint).join('</p>')

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
        background: '#0a0a0a',
        color: '#e5e7eb'
      }}>
        <div style={{
          background: 'linear-gradient(180deg, #000000 0%, #0f0f14 50%, #1a1a24 100%)',
          padding: '100px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(139, 92, 246, 0.1)'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }} />
          
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(139, 92, 246, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              color: '#c4b5fd',
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '10px 24px',
              borderRadius: '100px',
              marginBottom: '48px'
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="5"/>
              </svg>
              {nicheName || 'Premium Insights'}
            </div>
            
            <h1 style={{
              fontSize: '4.5rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.05',
              margin: '0 0 32px 0',
              letterSpacing: '-0.04em'
            }}>{nicheTitle}</h1>
            
            <p style={{
              fontSize: '1.375rem',
              color: '#9ca3af',
              lineHeight: '1.65',
              margin: '0 0 48px 0',
              fontWeight: 400,
              maxWidth: '750px'
            }}>
              Discover proven strategies and expert insights that deliver real results
            </p>
            
            <div style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center',
              color: '#6b7280',
              fontSize: '0.9375rem',
              flexWrap: 'wrap'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#10b981'
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5L7 13L3 9"/>
                </svg>
                Expert Verified
              </span>
              <span style={{ color: '#374151' }}>•</span>
              <span>Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              <span style={{ color: '#374151' }}>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '850px',
          margin: '0 auto',
          padding: '80px 24px 120px',
          position: 'relative'
        }}>
          <article style={{
            background: 'linear-gradient(180deg, #111118 0%, #16161f 100%)',
            borderRadius: '24px',
            padding: '80px 88px',
            boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.08), 0 40px 120px -20px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* First half of content */}
              <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
                border: '2px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '20px',
                padding: '48px 40px',
                margin: '64px 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle at top, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{
                    fontSize: '1.875rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.02em'
                  }}>Ready to Get Started?</h3>
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#9ca3af',
                    margin: '0 0 32px 0',
                    lineHeight: '1.6'
                  }}>
                    Join thousands who are already seeing results with this proven system
                  </p>
                  <a href={page.affiliate_link || '#'} style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    color: '#ffffff',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    padding: '18px 48px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 20px 40px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.2)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }} onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 24px 48px -12px rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.3)'
                  }} onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.2)'
                  }}>
                    Click Here to Start Now →
                  </a>
                </div>
              </div>
              
              {/* Second half of content */}
              <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
              
              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                borderRadius: '20px',
                padding: '56px 48px',
                margin: '80px 0 0 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -15px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.3)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-30%',
                  left: '-10%',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{
                    fontSize: '2.25rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    margin: '0 0 20px 0',
                    letterSpacing: '-0.03em'
                  }}>Take Action Today</h3>
                  <p style={{
                    fontSize: '1.25rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    margin: '0 0 40px 0',
                    lineHeight: '1.6',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    Don't miss out on this opportunity. Get instant access and start seeing results immediately.
                  </p>
                  <a href={page.affiliate_link || '#'} style={{
                    display: 'inline-block',
                    background: '#ffffff',
                    color: '#6366f1',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    padding: '20px 56px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }} onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 12px 32px -4px rgba(0, 0, 0, 0.3)'
                  }} onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0, 0, 0, 0.2)'
                  }}>
                    Get Instant Access Now →
                  </a>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '24px 0 0 0'
                  }}>
                    ✓ No credit card required • ✓ Instant setup • ✓ 30-day guarantee
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          * {
            box-sizing: border-box;
          }
          
          article h2 {
            font-size: 2.5rem !important;
            background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            margin: 72px 0 28px !important;
            font-weight: 800 !important;
            line-height: 1.2 !important;
            letter-spacing: -0.03em !important;
            position: relative !important;
            padding-bottom: 20px !important;
          }
          
          article h2:first-child {
            margin-top: 0 !important;
          }
          
          article h2::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 80px !important;
            height: 4px !important;
            background: linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%) !important;
            border-radius: 2px !important;
          }
          
          article h3 {
            font-size: 1.875rem !important;
            color: #f3f4f6 !important;
            margin: 56px 0 24px !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
            letter-spacing: -0.02em !important;
          }
          
          article p {
            margin-bottom: 32px !important;
            font-size: 1.1875rem !important;
            line-height: 1.9 !important;
            color: #d1d5db !important;
            font-weight: 400 !important;
          }
          
          article p:first-of-type {
            font-size: 1.375rem !important;
            color: #e5e7eb !important;
            font-weight: 500 !important;
            line-height: 1.75 !important;
            margin-bottom: 40px !important;
          }
          
          article a {
            color: #a78bfa !important;
            text-decoration: none !important;
            font-weight: 700 !important;
            background: linear-gradient(to bottom, transparent 65%, rgba(167, 139, 250, 0.2) 65%) !important;
            transition: all 0.25s ease !important;
            display: inline !important;
            padding: 0 3px !important;
          }
          
          article a:hover {
            color: #c4b5fd !important;
            background: linear-gradient(to bottom, transparent 55%, rgba(167, 139, 250, 0.3) 55%) !important;
          }
          
          article ul, 
          article ol {
            margin: 40px 0 !important;
            padding-left: 0 !important;
            list-style: none !important;
          }
          
          article li {
            margin-bottom: 24px !important;
            font-size: 1.1875rem !important;
            line-height: 1.9 !important;
            color: #d1d5db !important;
            padding-left: 40px !important;
            position: relative !important;
          }
          
          article li::before {
            content: '' !important;
            position: absolute !important;
            left: 0 !important;
            top: 11px !important;
            width: 22px !important;
            height: 22px !important;
            background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%) !important;
            border-radius: 50% !important;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3) !important;
          }
          
          article li::after {
            content: '✓' !important;
            position: absolute !important;
            left: 5.5px !important;
            top: 11px !important;
            color: #ffffff !important;
            font-size: 13px !important;
            font-weight: 900 !important;
          }
          
          article strong {
            color: #f3f4f6 !important;
            font-weight: 800 !important;
          }
          
          article em {
            color: #9ca3af !important;
            font-style: italic !important;
          }
          
          article blockquote {
            border-left: 4px solid #8b5cf6 !important;
            background: rgba(139, 92, 246, 0.08) !important;
            padding: 28px 32px !important;
            margin: 48px 0 !important;
            border-radius: 0 12px 12px 0 !important;
            color: #e5e7eb !important;
            font-style: italic !important;
            font-size: 1.25rem !important;
            font-weight: 500 !important;
          }
          
          @media (max-width: 768px) {
            body > div:first-of-type {
              padding: 60px 20px 60px !important;
            }
            body > div:first-of-type h1 {
              font-size: 2.75rem !important;
            }
            body > div:first-of-type p {
              font-size: 1.125rem !important;
            }
            body > div:nth-of-type(2) {
              padding: 60px 16px 100px !important;
            }
            article {
              padding: 48px 28px !important;
              border-radius: 20px !important;
            }
            article h2 {
              font-size: 2rem !important;
              margin: 56px 0 24px !important;
            }
            article h3 {
              font-size: 1.5rem !important;
              margin: 40px 0 20px !important;
            }
            article p,
            article li {
              font-size: 1.0625rem !important;
            }
            article p:first-of-type {
              font-size: 1.1875rem !important;
            }
            article > div:nth-of-type(2),
            article > div:nth-of-type(4) {
              padding: 36px 28px !important;
              margin: 48px 0 !important;
            }
            article > div:nth-of-type(2) h3 {
              font-size: 1.5rem !important;
            }
            article > div:nth-of-type(4) h3 {
              font-size: 1.75rem !important;
            }
            article > div:nth-of-type(4) p {
              font-size: 1.0625rem !important;
            }
          }
        `}} />
      </body>
    </html>
  )
}
