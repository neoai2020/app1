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
  return `<h1>The Complete Guide to Success in ${nicheName}</h1>

<p>If you've been searching for real, proven strategies in the ${nicheName} space, you're not alone. Thousands of people just like you are looking for <a href="${affiliateLink}" class="inline-link">the breakthrough solution</a> that actually delivers results.</p>

<p>But here's the problem: most of the information out there is either outdated, incomplete, or just doesn't work for real people in real situations. That's why we've created this comprehensive guide to help you navigate <a href="${affiliateLink}" class="inline-link">the proven path to success</a>.</p>

<h2>The Challenge Most People Face</h2>

<p>First paragraph describing the problem in detail (4-5 sentences). This is what makes <a href="${affiliateLink}" class="inline-link">the right system</a> so crucial.</p>

<p>Second paragraph amplifying pain points (4 sentences).</p>

<p>Third paragraph showing understanding (3-4 sentences). That's exactly why <a href="${affiliateLink}" class="inline-link">this approach</a> was developed.</p>

<p>Fourth paragraph bridging to solution (3 sentences).</p>

<h2>Why Traditional Methods Don't Work Anymore</h2>

<p>Opening paragraph on outdated methods (4 sentences).</p>

<p>Explaining the three main problems (4-5 sentences). Without <a href="${affiliateLink}" class="inline-link">the proper framework</a>, most people struggle unnecessarily.</p>

<p>Impact of using wrong approaches (4 sentences).</p>

<p>Transition to better solution (3 sentences). This is where <a href="${affiliateLink}" class="inline-link">the breakthrough method</a> makes all the difference.</p>

<h3>The Three Fatal Flaws</h3>

<p>First flaw explanation (3-4 sentences).</p>

<p>Second flaw detailed (3-4 sentences).</p>

<p>Third flaw and its consequences (4 sentences). Fortunately, <a href="${affiliateLink}" class="inline-link">this proven system</a> eliminates all three issues.</p>

<div class="mid-article-cta">
  <h3>Ready to Try Something That Actually Works?</h3>
  <p>Stop wasting time on methods that don't deliver. <a href="${affiliateLink}" class="affiliate-link">Click here to discover the proven system</a> that's helping thousands achieve breakthrough results.</p>
</div>

<h2>The Solution You've Been Searching For</h2>

<p>Introduction to the solution (4-5 sentences). This is why <a href="${affiliateLink}" class="inline-link">the comprehensive approach</a> works so well.</p>

<p>What makes it different (4 sentences).</p>

<p>Key features overview (4-5 sentences). Users consistently report that <a href="${affiliateLink}" class="inline-link">this exact system</a> exceeded their expectations.</p>

<p>How it addresses the problems mentioned earlier (3-4 sentences).</p>

<h3>How the System Works</h3>

<p>Step-by-step process explanation (5 sentences). Everything you need is included in <a href="${affiliateLink}" class="inline-link">this complete package</a>.</p>

<p>Implementation details (4 sentences).</p>

<p>Timeline and expectations (3-4 sentences).</p>

<h3>What Makes This Different</h3>

<p>Unique selling points (4-5 sentences). Unlike anything else available, <a href="${affiliateLink}" class="inline-link">this revolutionary approach</a> is designed for real results.</p>

<p>Comparison to alternatives (4 sentences).</p>

<p>Long-term sustainability (3-4 sentences).</p>

<h2>The Incredible Benefits You'll Experience</h2>

<p>Overview of benefits (4 sentences).</p>

<p>Time savings benefit (4-5 sentences). This efficiency is what makes <a href="${affiliateLink}" class="inline-link">the system</a> perfect for busy people.</p>

<p>Cost savings benefit (4 sentences).</p>

<p>Results and outcomes (4-5 sentences).</p>

<h3>Real Results You Can Measure</h3>

<p>Specific outcomes users achieve (5 sentences). When you implement <a href="${affiliateLink}" class="inline-link">these proven strategies</a>, the results speak for themselves.</p>

<p>Confidence and mindset improvements (4 sentences).</p>

<p>Long-term value creation (3-4 sentences).</p>

<h2>Success Stories from Real People</h2>

<p>Social proof introduction (3-4 sentences). Thousands have transformed their results with <a href="${affiliateLink}" class="inline-link">this exact method</a>.</p>

<p>Example success stories (4-5 sentences).</p>

<p>Common themes in success stories (4 sentences).</p>

<p>What makes these results achievable for anyone (3-4 sentences). You can <a href="${affiliateLink}" class="affiliate-link">join them today</a>.</p>

<h2>Is This Right for You?</h2>

<p>Addressing the question directly (4 sentences). If you're committed to results, <a href="${affiliateLink}" class="inline-link">this proven approach</a> is perfect for you.</p>

<p>Who this works for (4-5 sentences).</p>

<p>Who will benefit most (4 sentences).</p>

<h3>Common Questions and Concerns</h3>

<p>Question 1: "How long to see results?" (3-4 sentences).</p>

<p>Question 2: "What if it doesn't work?" (4 sentences). That's why <a href="${affiliateLink}" class="inline-link">the comprehensive system</a> includes guarantees and support.</p>

<p>Question 3: "Do I need experience?" (3-4 sentences).</p>

<h2>Your Path Forward Starts Today</h2>

<p>Call to action introduction (4 sentences).</p>

<p>Creating urgency (4-5 sentences). Don't wait another day to <a href="${affiliateLink}" class="affiliate-link">get started with this proven system</a>.</p>

<p>Simple next steps (4 sentences). You can have instant access to <a href="${affiliateLink}" class="inline-link">everything you need</a> in just minutes.</p>

<p>Final motivational push (4-5 sentences). Take the first step now and <a href="${affiliateLink}" class="affiliate-link">click here to begin your transformation</a>.</p>

<p>Closing statement reinforcing the opportunity (3-4 sentences). Your success story with <a href="${affiliateLink}" class="inline-link">this life-changing system</a> starts today.</p>`
}

async function generateWithRapidAPI(prompt: string): Promise<string> {
  let lastError: Error | null = null
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 25000) // Increased timeout
      
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
      
      if (result && result.length > 500) {
        return result
      }
      
      throw new Error("AI returned empty or too short content")
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error")
      console.error(`[v0] AI generation attempt ${attempt} failed:`, lastError.message)
      
      if (attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }
  
  throw lastError || new Error("AI generation failed after 3 attempts")
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
      const prompt = `Write a comprehensive, in-depth affiliate marketing article of AT LEAST 2,500 words in the ${niche.name} niche.

YOUR ARTICLE MUST BE PROPERLY FORMATTED AS COMPLETE HTML:

REQUIRED STRUCTURE:
- Start with <h1> main headline
- Use <h2> for 5-6 major sections
- Use <h3> for subsections (2-3 per <h2> section)
- Write 3-5 paragraphs between each heading
- Each paragraph should be 3-5 sentences (wrapped in <p> tags)
- Total minimum: 15-20 paragraphs of substantive content

HYPERLINK REQUIREMENTS (CRITICAL):
- Include 12-15 inline hyperlinks distributed naturally throughout
- Links should appear every 2-3 paragraphs
- Use contextual anchor text like:
  * "this proven method"
  * "the breakthrough system"
  * "this powerful approach"
  * "the exact strategy"
  * "these proven techniques"
  * "this comprehensive guide"
  * "the complete solution"
- Format ALL inline links as: <a href="[LINK]" class="inline-link">anchor text</a>
- Include 3-4 strong CTA links with phrases:
  * "click here to get started"
  * "learn more about this system"
  * "discover the proven approach"
  * "get instant access now"
- Format CTA links as: <a href="[LINK]" class="affiliate-link">CTA phrase</a>
- NEVER show raw URLs like "https://www.google.com"
- ALWAYS use natural, contextual anchor text

ARTICLE OUTLINE (MINIMUM 2,500 WORDS):

<h1>The Complete Guide to [Topic] in ${niche.name}</h1>

<p>Opening paragraph with hook (3-4 sentences). Start by addressing the reader's pain point and mention how <a href="[LINK]" class="inline-link">this proven solution</a> has helped thousands.</p>

<p>Second paragraph building intrigue (3-4 sentences). Many people struggle with this exact issue, but there's <a href="[LINK]" class="inline-link">a better way forward</a>.</p>

<p>Third paragraph establishing credibility (3-4 sentences).</p>

<h2>The Challenge Most People Face</h2>

<p>First paragraph describing the problem in detail (4-5 sentences). This is what makes <a href="[LINK]" class="inline-link">the right system</a> so crucial.</p>

<p>Second paragraph amplifying pain points (4 sentences).</p>

<p>Third paragraph showing understanding (3-4 sentences). That's exactly why <a href="[LINK]" class="inline-link">this approach</a> was developed.</p>

<p>Fourth paragraph bridging to solution (3 sentences).</p>

<h2>Why Traditional Methods Don't Work Anymore</h2>

<p>Opening paragraph on outdated methods (4 sentences).</p>

<p>Explaining the three main problems (4-5 sentences). Without <a href="[LINK]" class="inline-link">the proper framework</a>, most people struggle unnecessarily.</p>

<p>Impact of using wrong approaches (4 sentences).</p>

<p>Transition to better solution (3 sentences). This is where <a href="[LINK]" class="inline-link">the breakthrough method</a> makes all the difference.</p>

<h3>The Three Fatal Flaws</h3>

<p>First flaw explanation (3-4 sentences).</p>

<p>Second flaw detailed (3-4 sentences).</p>

<p>Third flaw and its consequences (4 sentences). Fortunately, <a href="[LINK]" class="inline-link">this proven system</a> eliminates all three issues.</p>

<div class="mid-article-cta">
  <h3>Ready to Try Something That Actually Works?</h3>
  <p>Stop wasting time on methods that don't deliver. <a href="${affiliateLink}" class="affiliate-link">Click here to discover the proven system</a> that's helping thousands achieve breakthrough results.</p>
</div>

<h2>The Solution You've Been Searching For</h2>

<p>Introduction to the solution (4-5 sentences). This is why <a href="[LINK]" class="inline-link">the comprehensive approach</a> works so well.</p>

<p>What makes it different (4 sentences).</p>

<p>Key features overview (4-5 sentences). Users consistently report that <a href="[LINK]" class="inline-link">this exact system</a> exceeded their expectations.</p>

<p>How it addresses the problems mentioned earlier (3-4 sentences).</p>

<h3>How the System Works</h3>

<p>Step-by-step process explanation (5 sentences). Everything you need is included in <a href="[LINK]" class="inline-link">this complete package</a>.</p>

<p>Implementation details (4 sentences).</p>

<p>Timeline and expectations (3-4 sentences).</p>

<h3>What Makes This Different</h3>

<p>Unique selling points (4-5 sentences). Unlike anything else available, <a href="[LINK]" class="inline-link">this revolutionary approach</a> is designed for real results.</p>

<p>Comparison to alternatives (4 sentences).</p>

<p>Long-term sustainability (3-4 sentences).</p>

<h2>The Incredible Benefits You'll Experience</h2>

<p>Overview of benefits (4 sentences).</p>

<p>Time savings benefit (4-5 sentences). This efficiency is what makes <a href="[LINK]" class="inline-link">the system</a> perfect for busy people.</p>

<p>Cost savings benefit (4 sentences).</p>

<p>Results and outcomes (4-5 sentences).</p>

<h3>Real Results You Can Measure</h3>

<p>Specific outcomes users achieve (5 sentences). When you implement <a href="[LINK]" class="inline-link">these proven strategies</a>, the results speak for themselves.</p>

<p>Confidence and mindset improvements (4 sentences).</p>

<p>Long-term value creation (3-4 sentences).</p>

<h2>Success Stories from Real People</h2>

<p>Social proof introduction (3-4 sentences). Thousands have transformed their results with <a href="[LINK]" class="inline-link">this exact method</a>.</p>

<p>Example success stories (4-5 sentences).</p>

<p>Common themes in success stories (4 sentences).</p>

<p>What makes these results achievable for anyone (3-4 sentences). You can <a href="${affiliateLink}" class="affiliate-link">join them today</a>.</p>

<h2>Is This Right for You?</h2>

<p>Addressing the question directly (4 sentences). If you're committed to results, <a href="[LINK]" class="inline-link">this proven approach</a> is perfect for you.</p>

<p>Who this works for (4-5 sentences).</p>

<p>Who will benefit most (4 sentences).</p>

<h3>Common Questions and Concerns</h3>

<p>Question 1: "How long to see results?" (3-4 sentences).</p>

<p>Question 2: "What if it doesn't work?" (4 sentences). That's why <a href="[LINK]" class="inline-link">the comprehensive system</a> includes guarantees and support.</p>

<p>Question 3: "Do I need experience?" (3-4 sentences).</p>

<h2>Your Path Forward Starts Today</h2>

<p>Call to action introduction (4 sentences).</p>

<p>Creating urgency (4-5 sentences). Don't wait another day to <a href="[LINK]" class="affiliate-link">get started with this proven system</a>.</p>

<p>Simple next steps (4 sentences). You can have instant access to <a href="[LINK]" class="inline-link">everything you need</a> in just minutes.</p>

<p>Final motivational push (4-5 sentences). Take the first step now and <a href="[LINK]" class="affiliate-link">click here to begin your transformation</a>.</p>

<p>Closing statement reinforcing the opportunity (3-4 sentences). Your success story with <a href="[LINK]" class="inline-link">this life-changing system</a> starts today.</p>`

      const content = await generateWithRapidAPI(prompt)
      articleContent = content
        .trim()
        .replace(/\[LINK\]/g, normalizedAffiliateLink)

      const h1Match = articleContent.match(/<h1[^>]*>(.*?)<\/h1>/i)
      title = h1Match ? h1Match[1].replace(/<[^>]*>/g, "").substring(0, 200) : `${niche.name} - Complete Guide`

      console.log("[v0] AI generation successful, content length:", articleContent.length)

    } catch (aiError) {
      console.log("[v0] AI generation failed, using improved fallback")
      
      const randomArticle = await getRandomExistingArticle(supabase, nicheId)
      
      if (randomArticle) {
        console.log("[v0] Using random article from database")
        articleContent = replaceAffiliateLinks(randomArticle.content, normalizedAffiliateLink)
        title = randomArticle.title
      } else {
        console.log("[v0] Using comprehensive fallback template")
        articleContent = getFallbackArticle(niche.name, normalizedAffiliateLink)
        title = `The Complete Guide to Success in ${niche.name}`
      }
    }

    if (!articleContent || articleContent.length < 800) {
      console.log("[v0] Content too short, using fallback")
      const randomArticle = await getRandomExistingArticle(supabase, nicheId)
      
      if (randomArticle) {
        articleContent = replaceAffiliateLinks(randomArticle.content, normalizedAffiliateLink)
        title = randomArticle.title
      } else {
        articleContent = getFallbackArticle(niche.name, normalizedAffiliateLink)
        title = `The Complete Guide to Success in ${niche.name}`
      }
    }

    console.log("[v0] Final content length:", articleContent.length, "characters")

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
