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
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #e5e7eb;
            background: #0f172a;
          }
          .hero {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            padding: 80px 20px;
            text-align: center;
            border-bottom: 2px solid #1e40af;
          }
          .hero h1 {
            font-size: 3rem;
            font-weight: 800;
            color: #60a5fa;
            margin-bottom: 20px;
            line-height: 1.2;
          }
          .meta {
            display: flex;
            gap: 20px;
            justify-content: center;
            align-items: center;
            color: #94a3b8;
            font-size: 0.95rem;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 60px 20px;
          }
          .content h2 {
            font-size: 2rem;
            color: #60a5fa;
            margin: 40px 0 20px;
            font-weight: 700;
          }
          .content p {
            margin-bottom: 20px;
            font-size: 1.1rem;
            line-height: 1.8;
            color: #cbd5e1;
          }
          .content a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 2px;
            transition: all 0.2s;
          }
          .content a:hover {
            color: #60a5fa;
            border-color: #60a5fa;
          }
          .content ul, .content ol {
            margin: 20px 0 20px 30px;
            color: #cbd5e1;
          }
          .content li {
            margin-bottom: 12px;
            line-height: 1.8;
          }
          @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .content h2 { font-size: 1.5rem; }
            .content p { font-size: 1rem; }
          }
        `}</style>
      </head>
      <body>
        <div className="hero">
          <h1>{nicheTitle}</h1>
          <div className="meta">
            <span>📖 Expert Reviewed</span>
            <span>•</span>
            <span>Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
        <div className="container">
          <div className="content" dangerouslySetInnerHTML={{ __html: page.content || '<p>Content not available</p>' }} />
        </div>
      </body>
    </html>
  )
}
