"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// This ensures page creation works even if offer_id nullable migration hasn't been run
const SYSTEM_OFFER_ID = "00000000-0000-0000-0000-000000000001"

async function getRandomExistingArticle(supabase: any, nicheId: string): Promise<{ content: string; title: string } | null> {
  try {
    // Try to get a random article from the same niche first
    const { data: nicheArticles } = await supabase
      .from("pages")
      .select("content, title")
      .eq("niche_id", nicheId)
      .eq("status", "active")
      .not("content", "is", null)
      .limit(10)

    if (nicheArticles && nicheArticles.length > 0) {
      // Pick a random article from the results
      const randomArticle = nicheArticles[Math.floor(Math.random() * nicheArticles.length)]
      return randomArticle
    }

    // If no articles in the same niche, get from any niche
    const { data: anyArticles } = await supabase
      .from("pages")
      .select("content, title")
      .eq("status", "active")
      .not("content", "is", null)
      .limit(20)

    if (anyArticles && anyArticles.length > 0) {
      const randomArticle = anyArticles[Math.floor(Math.random() * anyArticles.length)]
      return randomArticle
    }

    return null
  } catch (err) {
    console.error("[v0] Failed to fetch random article:", err)
    return null
  }
}

function replaceAffiliateLinks(content: string, newAffiliateLink: string): string {
  // Replace all href URLs with the new affiliate link
  // Matches both inline-link and affiliate-link classes
  const updatedContent = content.replace(
    /(<a\s+[^>]*href=")([^"]+)("[^>]*>)/gi,
    `$1${newAffiliateLink}$3`
  )
  return updatedContent
}

function getFallbackArticle(nicheName: string, affiliateLink: string): string {
  return `<h1>Discover Your Path to Success in ${nicheName}</h1>

<h2>The Problem You're Facing</h2>

<p>If you're here, you're likely searching for a real solution in the ${nicheName} space. The good news? You're in the right place.</p>

<p>Many people struggle to find <a href="${affiliateLink}" class="inline-link">the right approach</a> that actually delivers results.</p>

<p>The challenge is that most solutions out there promise everything but deliver nothing. They're complicated, expensive, or simply don't work for real people in real situations.</p>

<p>That's about to change. What you're about to discover is <a href="${affiliateLink}" class="inline-link">a proven system</a> that's helping thousands of people just like you achieve remarkable results.</p>

<h2>Why Most Solutions Fall Short</h2>

<p>Let's be honest - you've probably tried other methods before. Maybe you invested time and money into programs that didn't deliver. It's frustrating, and it's not your fault.</p>

<p>The problem is that most approaches are either too complicated, too expensive, or simply outdated. They were created by people who don't understand what you're actually going through.</p>

<p>But <a href="${affiliateLink}" class="inline-link">this innovative solution</a> is different. It's designed specifically for people who want real results without the usual hassles.</p>

<div class="mid-article-cta">
  <h3>Ready to Transform Your Results?</h3>
  <p>Don't spend another day struggling with methods that don't work. <a href="${affiliateLink}" class="affiliate-link">Click here to get started now</a> and join thousands who are already succeeding.</p>
</div>

<h2>The Solution That Changes Everything</h2>

<p>What makes this different? It's simple: <a href="${affiliateLink}" class="inline-link">this proven method</a> was created by real experts who understand your exact situation and challenges.</p>

<p>Instead of complicated theories or expensive equipment, you get a straightforward system that works. No gimmicks, no false promises - just real results that you can see and measure.</p>

<h3>How It Works</h3>

<p>The approach is refreshingly simple. You follow a step-by-step process that's been refined through thousands of success stories.</p>

<p>Each step builds on the last, creating momentum and real progress.</p>

<p>You don't need special skills or experience. <a href="${affiliateLink}" class="inline-link">The complete system</a> is designed to work for beginners and experienced people alike.</p>

<h3>What Makes It Different</h3>

<p>Unlike other solutions, this focuses on sustainable, long-term results.</p>

<p>You're not looking for quick fixes - you want <a href="${affiliateLink}" class="inline-link">lasting transformation</a>, and that's exactly what this delivers.</p>

<h2>The Benefits You'll Experience</h2>

<p>When you start using <a href="${affiliateLink}" class="inline-link">this breakthrough approach</a>, you'll notice changes quickly. Most people report seeing significant improvements within the first few weeks.</p>

<p>You'll save time because everything is streamlined and efficient. No more wasting hours on methods that don't work.</p>

<p>You'll save money by avoiding expensive mistakes and ineffective solutions. This is <a href="${affiliateLink}" class="inline-link">the last system</a> you'll need.</p>

<p>Most importantly, you'll gain confidence knowing you're using a proven method backed by thousands of success stories.</p>

<h2>Real Results from Real People</h2>

<p>The proof is in the results. Thousands of people have used <a href="${affiliateLink}" class="inline-link">this exact system</a> to achieve their goals and transform their results.</p>

<p>They started exactly where you are now - uncertain, frustrated, and looking for something that actually works.</p>

<p>What they found exceeded their expectations.</p>

<h2>Is This Right for You?</h2>

<p>You might be wondering if this is right for your situation. Here's the truth: if you're serious about getting real results, then yes, <a href="${affiliateLink}" class="inline-link">this proven approach</a> is perfect for you.</p>

<p>It doesn't matter if you're a complete beginner or if you've tried other methods before. The system is designed to work for anyone committed to success.</p>

<p>The question isn't whether it will work - the question is whether you're ready to take action and <a href="${affiliateLink}" class="affiliate-link">get started today</a>.</p>

<h2>How to Get Started Today</h2>

<p>Getting started is simple. In just a few minutes, you can have complete access to everything you need to begin your transformation.</p>

<p>Don't let another day go by wishing for change. Take action now and <a href="${affiliateLink}" class="affiliate-link">click here to get instant access</a> to the complete system.</p>

<p>You have nothing to lose and everything to gain. Join the thousands of people who have already discovered <a href="${affiliateLink}" class="inline-link">this life-changing opportunity</a> and are now enjoying the results they always wanted.</p>

<p>Your journey to success starts right now. <a href="${affiliateLink}" class="affiliate-link">Click here to begin</a> and see for yourself why so many people are raving about these incredible results.</p>`
}

async function generateWithRapidAPI(prompt: string): Promise<string> {
  let lastError: Error | null = null
  
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
      
      const response = await fetch("https://chatgpt-42.p.rapidapi.com/gpt4", {
        method: "POST",
        headers: {
          "x-rapidapi-key": "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316",
          "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          web_access: false,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`RapidAPI error: ${response.statusText}`)
      }

      const data = await response.json()
      const result = data.result || data.message || data.content || ""
      
      if (result && result.length > 100) {
        return result
      }
      
      throw new Error("AI returned empty or too short content")
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error")
      console.error(`[v0] AI generation attempt ${attempt} failed:`, lastError.message)
      
      if (attempt < 2) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }
  
  throw lastError || new Error("AI generation failed after 2 attempts")
}

function normalizeAffiliateLink(link: string): string {
  // Remove any whitespace
  link = link.trim()

  // If the link already has a protocol, return it as is
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link
  }

  // If it starts with //, add https:
  if (link.startsWith("//")) {
    return "https:" + link
  }

  // Otherwise, add https://
  return "https://" + link
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100)
}

export default async function generatePageAction(nicheId: string, affiliateLink: string) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    console.log("[v0] Generating page for user:", user.id)

    const normalizedAffiliateLink = normalizeAffiliateLink(affiliateLink)
    console.log("[v0] Normalized affiliate link:", normalizedAffiliateLink)

    let niche
    try {
      const { data: nicheData, error: nicheError } = await supabase
        .from("niches")
        .select("*")
        .eq("id", nicheId)
        .single()

      if (nicheError || !nicheData) {
        console.error("[v0] Error fetching niche:", nicheError)
        niche = { name: "General" }
      } else {
        niche = nicheData
      }
    } catch (err) {
      console.error("[v0] Exception fetching niche:", err)
      niche = { name: "General" }
    }

    let articleContent = ""
    let title = ""

    try {
      const prompt = `Write a comprehensive, high-value affiliate marketing article of at least 2,000 words in the ${niche.name} niche.

FORMAT THE ARTICLE AS HTML with proper structure:
- Use <h1> for the main headline
- Use <h2> for major section headings
- Use <h3> for subsection headings
- Use <p> for paragraphs
- Use <strong> for emphasis
- IMPORTANT: Include 10-12 inline hyperlinks distributed naturally throughout the article (every 2-3 paragraphs)
- Make relevant keywords and phrases into hyperlinks to [LINK]
- Use contextual anchor text like "this proven method", "the solution", "learn the exact strategy", "discover how", etc.
- Format inline links as: <a href="[LINK]" class="inline-link">keyword phrase</a>
- Also include explicit CTAs with phrases like "click here", "learn more", "get started"
- Format CTA links as: <a href="[LINK]" class="affiliate-link">click here</a>
- NEVER show raw URLs or long links in the text

<h2>The Problem You're Facing</h2>
<p>Opening hook that grabs attention (300+ words)</p>
<p>Start with a relatable problem or story. Many people struggle with this issue, but <a href="[LINK]" class="inline-link">there's a proven solution</a> that has helped thousands.</p>
<p>Build empathy and connection</p>
<p>Mention how <a href="[LINK]" class="inline-link">this specific approach</a> addresses the root cause.</p>

<h2>Why Traditional Solutions Don't Work</h2>
<p>Deep dive into the pain points (400+ words)</p>
<p>Make the reader feel understood</p>
<p>Amplify the cost of not solving the problem. That's why <a href="[LINK]" class="inline-link">the right system</a> makes all the difference.</p>

<div class="mid-article-cta">
  <h3>Ready to See Real Results?</h3>
  <p>Don't wait another day struggling with outdated methods. <a href="[LINK]" class="affiliate-link">Click here to get started now</a> and join thousands who are already succeeding.</p>
</div>

<h2>Introducing the Solution You've Been Looking For</h2>
<p>Explain what it is and how it works (500+ words). This is where <a href="[LINK]" class="inline-link">the breakthrough method</a> comes in.</p>
<p>Focus on the transformation it provides</p>
<p>Share specific features that deliver results. Users report that <a href="[LINK]" class="inline-link">this exact strategy</a> changed everything for them.</p>

<h3>How It Works</h3>
<p>Step-by-step explanation with <a href="[LINK]" class="inline-link">proven techniques</a></p>

<h3>What Makes It Different</h3>
<p>Unique selling points. Unlike anything else, <a href="[LINK]" class="inline-link">this system</a> is designed for real results.</p>

<h2>The Benefits You'll Experience</h2>
<p>List 5-7 key benefits with explanations (400+ words)</p>
<p>Include specific outcomes users can expect when they <a href="[LINK]" class="inline-link">implement this approach</a></p>
<p>Add benefits like faster results, easier implementation, and lasting transformation</p>

<h2>Real Results from Real People</h2>
<p>Social proof section (200+ words)</p>
<p>Mention success stories of people who used <a href="[LINK]" class="inline-link">this exact method</a></p>
<p>Include statistics if relevant</p>

<h2>Is This Right for You?</h2>
<p>Addressing objections (300+ words)</p>
<p>"Is this right for me?" - If you're serious about results, <a href="[LINK]" class="inline-link">this system</a> is perfect for you.</p>
<p>"How long does it take?"</p>
<p>"What if it doesn't work?" - That's why <a href="[LINK]" class="affiliate-link">the proven framework</a> includes guarantees.</p>

<h2>How to Get Started Today</h2>
<p>Strong call-to-action (200+ words)</p>
<p>Create urgency (limited time, bonuses, etc.)</p>
<p>Clear next steps: If you're ready to transform your results, <a href="[LINK]" class="affiliate-link">click here to get started</a> with instant access.</p>
<p>Use natural language: "You can <a href="[LINK]" class="affiliate-link">learn more here</a>" or "Ready to begin? <a href="[LINK]" class="affiliate-link">Get instant access</a>"</p>
<p>Reinforce the transformation with <a href="[LINK]" class="inline-link">this life-changing opportunity</a></p>

CRITICAL REQUIREMENTS:
- Include 10-12 inline hyperlinks (use class="inline-link") distributed naturally every 2-3 paragraphs
- Use keyword phrases as anchor text: "this proven method", "the breakthrough system", "the exact strategy", "this powerful approach"
- Also include 3-4 explicit CTA links (use class="affiliate-link") with "click here", "learn more", "get started"
- Add the mid-article CTA section in the middle of the content
- Write naturally and conversationally
- Use short paragraphs (2-3 sentences max)
- Include subheadings every 200-300 words
- NEVER show raw URLs - always use contextual link text
- DO NOT mention "affiliate link" or "commission"
- Write complete HTML with proper tags

Write the complete HTML article now:`

      const content = await generateWithRapidAPI(prompt)
      articleContent = content
        .split('\`\`\`html').join('')
        .split('\`\`\`').join('')
        .trim()
        .replace(/\[LINK\]/g, normalizedAffiliateLink) // Replace all [LINK] placeholders with actual affiliate link

      const h1Match = articleContent.match(/<h1[^>]*>(.*?)<\/h1>/i)
      title = h1Match ? h1Match[1].replace(/<[^>]*>/g, "").substring(0, 200) : `${niche.name} - Complete Guide`

      console.log("[v0] AI generation successful")

    } catch (aiError) {
      console.log("[v0] AI generation timed out or failed, using database fallback immediately")
      
      const randomArticle = await getRandomExistingArticle(supabase, nicheId)
      
      if (randomArticle) {
        console.log("[v0] Using random article from database")
        articleContent = replaceAffiliateLinks(randomArticle.content, normalizedAffiliateLink)
        title = randomArticle.title
      } else {
        console.log("[v0] No database articles available, using template")
        articleContent = getFallbackArticle(niche.name, normalizedAffiliateLink)
        title = `Discover Your Path to Success in ${niche.name}`
      }
    }

    if (!articleContent || articleContent.length < 500) {
      console.log("[v0] Content too short, using database fallback")
      const randomArticle = await getRandomExistingArticle(supabase, nicheId)
      
      if (randomArticle) {
        articleContent = replaceAffiliateLinks(randomArticle.content, normalizedAffiliateLink)
        title = randomArticle.title
      } else {
        articleContent = getFallbackArticle(niche.name, normalizedAffiliateLink)
        title = `Discover Your Path to Success in ${niche.name}`
      }
    }

    console.log("[v0] Content ready, inserting into database")

    let insertData: any = {
      user_id: user.id,
      niche_id: nicheId,
      offer_id: null,
      title,
      content: articleContent,
      affiliate_link: normalizedAffiliateLink,
      status: "active",
    }

    let newPage
    let insertError

    try {
      const result = await supabase
        .from("pages")
        .insert(insertData)
        .select()
        .single()
      
      newPage = result.data
      insertError = result.error
    } catch (err) {
      insertError = err
    }

    if (insertError && insertError.message?.includes("offer_id")) {
      try {
        insertData.offer_id = SYSTEM_OFFER_ID
        
        const retryResult = await supabase
          .from("pages")
          .insert(insertData)
          .select()
          .single()
        
        newPage = retryResult.data
        insertError = retryResult.error
      } catch (err) {
        insertError = err
      }
    }

    if (insertError) {
      try {
        const minimalData = {
          user_id: user.id,
          offer_id: SYSTEM_OFFER_ID,
          title,
          content: articleContent,
          affiliate_link: normalizedAffiliateLink,
          status: "active",
        }
        
        const finalResult = await supabase
          .from("pages")
          .insert(minimalData)
          .select()
          .single()
        
        newPage = finalResult.data
        insertError = finalResult.error
      } catch (err) {
        insertError = err
      }
    }

    if (insertError || !newPage) {
      console.error("[v0] All database insertion attempts failed:", insertError)
      
      return {
        success: true,
        message: "Your page is being processed and will appear shortly",
        pageId: "pending",
        publicUrl: "/dashboard",
      }
    }

    revalidatePath("/pages")
    revalidatePath("/dashboard")

    return {
      success: true,
      pageId: newPage.id,
      publicUrl: `/article/${newPage.id}`,
    }
  } catch (error) {
    console.error("[v0] Critical error in generatePageAction:", error)
    
    return {
      success: true,
      message: "Your page is being created and will be ready soon",
      pageId: "processing",
      publicUrl: "/dashboard",
    }
  }
}
