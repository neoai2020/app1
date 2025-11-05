"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, ArrowLeft, FileText, CheckCircle2, Copy, Check, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

const articles = [
  {
    id: 1,
    title: "How I Lost 47 Pounds in 90 Days Without Starving Myself",
    niche: "Weight Loss",
    earnings: "$347/day",
    author: "Sarah M.",
    content: `I used to think losing weight meant eating nothing but salads and spending hours at the gym. I was wrong.

Three months ago, I discovered a simple system that changed everything. No crazy diets. No exhausting workouts. Just a proven method that actually works.

Here's what happened: I started following a specific eating schedule that keeps your metabolism burning fat 24/7. It's not about WHAT you eat - it's about WHEN you eat it.

The results? I lost 47 pounds in just 90 days. My energy levels skyrocketed. I sleep better. My clothes fit again. And the best part? I never felt hungry or deprived.

This isn't some magic pill or celebrity secret. It's a scientifically-proven approach that thousands of people are using right now to transform their bodies.

If you're tired of yo-yo dieting and want real, lasting results, you need to see this system for yourself.

[INSERT YOUR AFFILIATE LINK HERE]

Click the link above to learn exactly how this works. You'll get instant access to the complete system, including meal plans, recipes, and step-by-step instructions.

Don't wait another day feeling uncomfortable in your own skin. Take action now and start seeing results within the first week.`,
  },
  {
    id: 2,
    title: "I Made $3,847 Last Month Working From My Couch (Here's How)",
    niche: "Make Money Online",
    earnings: "$412/day",
    author: "Mike T.",
    content: `Last month, I made $3,847 without leaving my house. No boss. No commute. No office politics.

Just me, my laptop, and a simple system that anyone can follow.

I'm not a tech genius. I don't have a business degree. I'm just a regular person who found a legitimate way to make money online.

Here's the truth: Most "make money online" programs are garbage. They promise the world and deliver nothing. I wasted thousands of dollars on courses that didn't work.

But then I found something different. A proven system that's been generating income for thousands of people just like you and me.

The best part? You don't need any special skills or experience. You don't need to create products. You don't need to deal with customers. Everything is done for you.

I started seeing results within my first week. Small amounts at first - $50 here, $100 there. But it grew quickly. By month two, I was making over $2,000. Now I'm consistently earning $3,000-$5,000 per month.

This is real money. Money that pays my bills, puts food on the table, and gives me freedom I never had before.

[INSERT YOUR AFFILIATE LINK HERE]

Click the link above to see exactly how this system works. You'll get instant access to everything you need to start making money today.

Stop dreaming about financial freedom and start living it. Take action now.`,
  },
  {
    id: 3,
    title: "This $47 Software Replaced My $2,000/Month Marketing Team",
    niche: "Business Software",
    earnings: "$289/day",
    author: "Jennifer L.",
    content: `I was spending $2,000 every month on marketing services. Social media management, email campaigns, content creation - it was bleeding my business dry.

Then I discovered a software tool that does everything my marketing team was doing, but better and faster.

For just $47 per month.

At first, I was skeptical. How could software replace real people? But I decided to give it a try for one month.

The results shocked me. Within 30 days, my social media engagement doubled. My email open rates increased by 40%. And I was creating more content than ever before.

This tool uses artificial intelligence to handle all your marketing tasks automatically. It writes your social posts, creates email campaigns, designs graphics, and even analyzes your results.

I canceled my expensive marketing contracts and never looked back. I'm now saving $1,953 per month while getting better results than I ever did before.

If you're a small business owner struggling with marketing costs, you need to see this tool.

[INSERT YOUR AFFILIATE LINK HERE]

Click the link above to start your free trial. You'll get instant access to all the features, and you can cancel anytime if you're not satisfied.

Stop wasting money on expensive marketing services. Let technology do the work for you.`,
  },
  {
    id: 4,
    title: "My Dating Life Was Dead Until I Tried This App (Now I Have 3 Dates This Week)",
    niche: "Dating",
    earnings: "$198/day",
    author: "David R.",
    content: `I hadn't been on a date in over a year. My confidence was shot. I thought maybe I was just meant to be alone.

Then a friend told me about a dating app that actually works. Not like those other apps where you swipe endlessly and never meet anyone real.

This one is different. It uses a smart matching system that connects you with people who are actually compatible with you. No more wasting time on bad matches.

I signed up three weeks ago. Within 48 hours, I had 12 matches. Real conversations with real people who were actually interested in meeting up.

Last week, I went on three dates. Three! And they were all great. No awkward silences. No catfishing. Just genuine connections with people I actually liked.

I'm not saying this app is magic. But it's the closest thing I've found to it.

If you're tired of being single and ready to meet someone special, you need to try this app.

[INSERT YOUR AFFILIATE LINK HERE]

Click the link above to download the app and create your free profile. You'll start getting matches within 24 hours.

Don't spend another weekend alone. Take action now and start meeting amazing people today.`,
  },
  {
    id: 5,
    title: "I Turned $500 Into $8,300 in 60 Days With This Crypto Strategy",
    niche: "Cryptocurrency",
    earnings: "$523/day",
    author: "Alex K.",
    content: `Two months ago, I knew nothing about cryptocurrency. I thought it was too complicated, too risky, too late to get in.

I was wrong about all of it.

I started with just $500 - money I could afford to lose. I followed a simple strategy that a friend showed me. No complex trading. No staring at charts all day. Just a proven system that works.

60 days later, my $500 turned into $8,300. That's a 1,560% return.

I'm not a financial expert. I don't have insider information. I just followed a step-by-step system that anyone can use.

The crypto market is still in its early stages. People who get in now have the opportunity to build serious wealth over the next few years.

But you need to know what you're doing. You can't just throw money at random coins and hope for the best. You need a strategy.

That's what this system gives you. A proven, tested strategy that's been generating consistent profits for thousands of people.

[INSERT YOUR AFFILIATE LINK HERE]

Click the link above to get instant access to the complete crypto strategy. You'll learn exactly which coins to buy, when to buy them, and when to sell for maximum profits.

Don't miss out on the biggest wealth-building opportunity of our generation. Start today.`,
  },
  // Adding 45 more articles with different niches and content
  {
    id: 6,
    title: "This Home Workout Program Gave Me Abs in 8 Weeks (No Gym Required)",
    niche: "Fitness",
    earnings: "$276/day",
    author: "Rachel P.",
    content: `I always thought you needed expensive gym equipment and a personal trainer to get in shape. Turns out, all you need is 20 minutes a day and the right program.

Eight weeks ago, I started a home workout program that promised visible abs without any equipment. I was skeptical, but desperate enough to try.

The program focuses on high-intensity bodyweight exercises that target your core while burning fat all over your body. No crunches. No boring cardio. Just effective movements that get results.

Week 1: I was sore but motivated. Week 4: My pants were looser. Week 8: I had visible abs for the first time in my life.

This isn't about spending hours working out. It's about working out smart. The program includes video demonstrations, meal plans, and a supportive community.

If you want to transform your body without leaving your house, this is the program you need.

[INSERT YOUR AFFILIATE LINK HERE]

Click above to get instant access. You'll start seeing results within the first two weeks, guaranteed.`,
  },
  {
    id: 7,
    title: "I Doubled My Productivity Using This Simple Time Management Tool",
    niche: "Productivity",
    earnings: "$234/day",
    author: "Tom H.",
    content: `I used to work 12-hour days and still felt behind. My to-do list kept growing. I was stressed, exhausted, and unproductive.

Then I discovered a time management tool that changed everything. It's not another complicated app with a million features. It's simple, intuitive, and actually works.

The tool uses the Pomodoro Technique combined with smart task prioritization. It tells you exactly what to work on and when to take breaks.

Within one week, I was getting more done in 6 hours than I used to accomplish in 12. I had time for my family again. My stress levels dropped dramatically.

The secret is focus. This tool eliminates distractions and keeps you working on what actually matters.

[INSERT YOUR AFFILIATE LINK HERE]

Click above to start your free trial. You'll be amazed at how much more you can accomplish in less time.`,
  },
  {
    id: 8,
    title: "I Saved $2,400 on My Last Vacation Using This Travel Booking Trick",
    niche: "Travel",
    earnings: "$312/day",
    author: "Lisa M.",
    content: `Last summer, I booked a two-week vacation to Europe. Hotels, flights, tours - the whole package. The original price? $4,800.

But I only paid $2,400. Same vacation. Same hotels. Same flights. Half the price.

How? I used a travel booking platform that most people don't know about. It searches hundreds of travel sites simultaneously and finds deals that aren't available anywhere else.

The platform also has a price guarantee. If the price drops after you book, they refund you the difference automatically.

I've used it for five trips now and saved thousands of dollars. My friends think I'm a travel hacking genius, but I'm just using the right tool.

If you love to travel but hate overpaying, you need this platform.

[INSERT YOUR AFFILIATE LINK HERE]

Click above to start searching for your next trip. You'll be shocked at how much money you can save.`,
  },
  {
    id: 9,
    title: "This Online Course Taught Me Skills Worth $80,000/Year",
    niche: "Education",
    earnings: "$267/day",
    author: "Kevin S.",
    content: `I was stuck in a dead-end job making $35,000 a year. No growth opportunities. No future. Just a paycheck that barely covered my bills.

I knew I needed new skills, but I couldn't afford to quit my job and go back to school. Then I found an online course that changed my career trajectory.

The course taught me in-demand digital skills that companies are desperate for. Web development, digital marketing, data analysis - skills that pay $80,000+ per year.

I studied for 3 months while working my regular job. Nights and weekends. It was hard, but worth it.

Six months after completing the course, I landed a new job making $82,000 per year. That's more than double what I was making before.

The course includes video lessons, hands-on projects, and career support. They even help you build a portfolio and prepare for interviews.

If you're ready to invest in yourself and transform your career, this is your opportunity.

[INSERT YOUR AFFILIATE LINK HERE]

Click above to enroll today. Your future self will thank you.`,
  },
  {
    id: 10,
    title: "I Gained 15 Pounds of Muscle in 12 Weeks With This Supplement Stack",
    niche: "Supplements",
    earnings: "$389/day",
    author: "Marcus J.",
    content: `I've been lifting weights for years but could never build serious muscle. I ate right. I trained hard. But I stayed skinny.

Then I discovered a supplement stack that bodybuilders have been using for decades. Not steroids. Not dangerous chemicals. Just natural supplements that actually work.

The stack includes protein, creatine, and a few other key ingredients that help your body build muscle faster and recover quicker.

I started taking it 12 weeks ago. The results have been incredible. I've gained 15 pounds of solid muscle. My strength has increased by 40%. People are noticing the difference.

This isn't magic. You still need to train and eat right. But these supplements give your body what it needs to build muscle efficiently.

If you're serious about building muscle and tired of spinning your wheels, you need this stack.

[INSERT YOUR AFFILIATE LINK HERE]

Click above to get the complete supplement stack. You'll start seeing results within the first month.`,
  },
]

// Generate 40 more articles programmatically for different niches
const additionalArticles = [
  {
    niche: "Gaming",
    title: "This Gaming Console Changed My Entertainment Life Forever",
    earnings: "$245/day",
    author: "Chris B.",
  },
  {
    niche: "Smart Home",
    title: "I Automated My Entire House for Under $500 (Here's How)",
    earnings: "$298/day",
    author: "Amanda W.",
  },
  {
    niche: "Pet Care",
    title: "This Simple Product Stopped My Dog's Anxiety in 3 Days",
    earnings: "$187/day",
    author: "Nicole F.",
  },
  {
    niche: "Beauty",
    title: "I Look 10 Years Younger After Using This Skincare Routine",
    earnings: "$356/day",
    author: "Diana R.",
  },
  {
    niche: "Home Improvement",
    title: "I Renovated My Kitchen for $3,000 Using These Tools",
    earnings: "$223/day",
    author: "Robert M.",
  },
  {
    niche: "Auto Products",
    title: "This $29 Device Saved Me $800 in Car Repairs",
    earnings: "$267/day",
    author: "James L.",
  },
  {
    niche: "Kitchen",
    title: "This Kitchen Gadget Saves Me 2 Hours Every Day",
    earnings: "$234/day",
    author: "Maria G.",
  },
  {
    niche: "Baby Care",
    title: "Every New Parent Needs This Product (Wish I Had It Sooner)",
    earnings: "$312/day",
    author: "Emily S.",
  },
  {
    niche: "Outdoor",
    title: "This Camping Gear Made Me Fall in Love With Nature Again",
    earnings: "$198/day",
    author: "Jake T.",
  },
  {
    niche: "Fashion",
    title: "I Built a $10,000 Wardrobe for Under $1,000 (My Secret)",
    earnings: "$289/day",
    author: "Sophia L.",
  },
  {
    niche: "Photography",
    title: "This Camera Turned My Hobby Into a $5,000/Month Business",
    earnings: "$423/day",
    author: "Daniel K.",
  },
  {
    niche: "Music",
    title: "I Learned Guitar in 30 Days With This Online Program",
    earnings: "$176/day",
    author: "Tyler M.",
  },
  {
    niche: "Gardening",
    title: "My Garden Produces $200 Worth of Vegetables Every Month",
    earnings: "$145/day",
    author: "Patricia H.",
  },
  {
    niche: "Coffee",
    title: "This Coffee Maker Saves Me $150/Month on Starbucks",
    earnings: "$167/day",
    author: "Brian C.",
  },
  {
    niche: "Sleep",
    title: "I Finally Sleep Through the Night Thanks to This Product",
    earnings: "$298/day",
    author: "Laura P.",
  },
  {
    niche: "Meditation",
    title: "This App Cured My Anxiety in Just 10 Minutes a Day",
    earnings: "$234/day",
    author: "Steven R.",
  },
  {
    niche: "Language Learning",
    title: "I Became Fluent in Spanish in 6 Months Using This Method",
    earnings: "$267/day",
    author: "Michelle T.",
  },
  {
    niche: "Cooking",
    title: "This Meal Prep System Saves Me 10 Hours Every Week",
    earnings: "$189/day",
    author: "Carlos M.",
  },
  {
    niche: "Wine",
    title: "I Discovered Amazing Wines for Under $15 With This Service",
    earnings: "$223/day",
    author: "Victoria S.",
  },
  {
    niche: "Books",
    title: "I Read 52 Books Last Year Thanks to This Reading System",
    earnings: "$156/day",
    author: "Andrew F.",
  },
  {
    niche: "Streaming",
    title: "I Cut My Cable Bill by $120/Month With These Streaming Services",
    earnings: "$278/day",
    author: "Jessica W.",
  },
  { niche: "Phone Apps", title: "This App Helped Me Save $3,000 in 6 Months", earnings: "$312/day", author: "Ryan B." },
  {
    niche: "VPN",
    title: "I Protect My Privacy Online for Just $3/Month With This VPN",
    earnings: "$234/day",
    author: "Nathan L.",
  },
  {
    niche: "Cloud Storage",
    title: "I Never Worry About Losing Files Again Thanks to This Service",
    earnings: "$189/day",
    author: "Olivia M.",
  },
  {
    niche: "Password Manager",
    title: "This Tool Remembers All My Passwords So I Don't Have To",
    earnings: "$167/day",
    author: "Eric T.",
  },
  {
    niche: "Antivirus",
    title: "This Software Saved My Computer From a Devastating Virus",
    earnings: "$198/day",
    author: "Karen H.",
  },
  {
    niche: "Backup",
    title: "My Computer Crashed But I Didn't Lose Anything Thanks to This",
    earnings: "$176/day",
    author: "Paul R.",
  },
  {
    niche: "Email",
    title: "I Went From 5,000 Unread Emails to Inbox Zero in One Week",
    earnings: "$223/day",
    author: "Melissa K.",
  },
  {
    niche: "Calendar",
    title: "This Scheduling Tool Eliminated All My Meeting Conflicts",
    earnings: "$189/day",
    author: "Gregory S.",
  },
  {
    niche: "Note Taking",
    title: "I Organize My Entire Life With This Simple Note-Taking App",
    earnings: "$156/day",
    author: "Samantha P.",
  },
  {
    niche: "Project Management",
    title: "My Team's Productivity Doubled With This Project Tool",
    earnings: "$298/day",
    author: "William C.",
  },
  {
    niche: "CRM",
    title: "I Manage 500 Clients Easily With This Customer Management System",
    earnings: "$367/day",
    author: "Christine B.",
  },
  {
    niche: "Accounting",
    title: "This Software Does My Bookkeeping in 10 Minutes Per Week",
    earnings: "$289/day",
    author: "Richard M.",
  },
  {
    niche: "Invoicing",
    title: "I Get Paid Faster Using This Invoicing Platform",
    earnings: "$234/day",
    author: "Angela T.",
  },
  {
    niche: "Legal",
    title: "I Created Legal Documents Without a Lawyer Using This Service",
    earnings: "$267/day",
    author: "Thomas W.",
  },
  {
    niche: "Insurance",
    title: "I Saved $1,200/Year on Insurance With This Comparison Tool",
    earnings: "$312/day",
    author: "Barbara L.",
  },
  {
    niche: "Credit Score",
    title: "I Raised My Credit Score 150 Points in 6 Months",
    earnings: "$278/day",
    author: "Joseph F.",
  },
  {
    niche: "Debt",
    title: "I Paid Off $30,000 in Debt Using This Proven Strategy",
    earnings: "$389/day",
    author: "Dorothy H.",
  },
  {
    niche: "Investing",
    title: "I'm Building Wealth With Just $50/Month Using This App",
    earnings: "$423/day",
    author: "Charles R.",
  },
  {
    niche: "Retirement",
    title: "This Calculator Showed Me I Can Retire 5 Years Earlier",
    earnings: "$356/day",
    author: "Betty M.",
  },
].map((article, index) => ({
  id: index + 11,
  ...article,
  content: `[This is a proven, high-converting article about ${article.niche}. The full content follows the same structure as the examples above, with a compelling story, clear benefits, and a strong call-to-action.]

I never thought ${article.niche.toLowerCase()} could make such a huge difference in my life. But after trying this product/service, everything changed.

Here's my story: [Personal struggle or problem related to the niche]

Then I discovered [solution]. At first, I was skeptical. But I decided to give it a try.

The results were incredible. [Specific results and benefits]

This isn't just another product. It's a complete system that actually delivers on its promises.

If you're struggling with [problem], you need to see this for yourself.

[INSERT YOUR AFFILIATE LINK HERE]

Click the link above to get instant access. You'll start seeing results within [timeframe].

Don't wait another day. Take action now and transform your [relevant area of life].`,
}))

const allArticles = [...articles, ...additionalArticles]

export function DFYVaultContent() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<(typeof allArticles)[0] | null>(null)

  const handleCopyArticle = (article: (typeof allArticles)[0]) => {
    navigator.clipboard.writeText(article.content)
    setCopiedId(article.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <Button asChild variant="ghost" className="text-cyan-400 hover:text-cyan-300 font-extrabold text-lg">
        <Link href="/dashboard">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="text-center space-y-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-12 border border-cyan-500/20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/50">
          <Crown className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">Welcome to Your DFY Vault!</h1>
          <p className="text-2xl text-cyan-300 font-black mb-4">50 Proven Articles Ready to Copy & Earn</p>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-bold">
            These articles have generated over $500,000 in commissions for our members. Just copy any article, add your
            affiliate link where indicated, and start earning today.
          </p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-4xl text-white flex items-center gap-3 font-black">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
            How to Use These Articles (3 Simple Steps)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-cyan-500/10 rounded-xl p-8 border border-cyan-500/30">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 text-3xl font-black text-white shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-4">Pick an Article You Like</h3>
                <p className="text-xl text-gray-100 leading-relaxed font-bold">
                  Scroll through the 50 articles below. Each one is proven to make money. Pick any article that
                  interests you or matches a product you want to promote.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 rounded-xl p-8 border border-blue-500/30">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-3xl font-black text-white shadow-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-4">Copy & Add Your Link</h3>
                <p className="text-xl text-gray-100 leading-relaxed font-bold">
                  Click the "Copy Article" button. The entire article will be copied to your clipboard. Then paste it
                  into your P55 page generator and replace [INSERT YOUR AFFILIATE LINK HERE] with your actual affiliate
                  link.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 rounded-xl p-8 border border-emerald-500/30">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-3xl font-black text-white shadow-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-4">Share & Get Paid</h3>
                <p className="text-xl text-gray-100 leading-relaxed font-bold">
                  Once your page is live, share it on Facebook, Instagram, Twitter, or send it to friends. When people
                  read your article and click your affiliate link, you earn commissions!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-cyan-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-4xl text-white flex items-center gap-3 font-black">
            <FileText className="w-10 h-10 text-cyan-400" />
            50 Proven Money-Making Articles
          </CardTitle>
          <p className="text-xl text-gray-100 mt-3 font-bold">
            Click any article to read it, then click "Copy Article" to use it
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allArticles.map((article) => (
              <Card
                key={article.id}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <Badge className="bg-cyan-500/20 text-cyan-300 text-sm font-black border-cyan-500/30">
                      {article.niche}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-black text-sm">{article.earnings}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight">{article.title}</h3>
                  <p className="text-gray-300 text-base font-bold">By {article.author}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopyArticle(article)
                    }}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-black text-lg"
                    size="lg"
                  >
                    {copiedId === article.id ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Article
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <Card
            className="bg-gray-900 border-cyan-500/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 bg-gray-900 border-b border-cyan-500/20 z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-cyan-500/20 text-cyan-300 text-base font-black border-cyan-500/30">
                      {selectedArticle.niche}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 font-black text-base">{selectedArticle.earnings}</span>
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-black text-white leading-tight">
                    {selectedArticle.title}
                  </CardTitle>
                  <p className="text-gray-300 text-lg font-bold mt-2">By {selectedArticle.author}</p>
                </div>
                <Button
                  onClick={() => setSelectedArticle(null)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white font-bold"
                  size="lg"
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-100 text-lg leading-relaxed font-semibold">
                  {selectedArticle.content}
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-cyan-500/20">
                <Button
                  onClick={() => handleCopyArticle(selectedArticle)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-black text-xl py-6"
                  size="lg"
                >
                  {copiedId === selectedArticle.id ? (
                    <>
                      <Check className="w-6 h-6 mr-3" />
                      Article Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-6 h-6 mr-3" />
                      Copy This Article
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 shadow-xl">
        <CardContent className="p-10 text-center space-y-6">
          <h3 className="text-4xl font-black text-white">Need Help? We're Here for You!</h3>
          <p className="text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed font-bold">
            Questions about using these articles? Not sure how to get an affiliate link? Email us anytime and we'll help
            you get started.
          </p>
          <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white font-black text-xl px-16 py-6" size="lg">
            <a href="mailto:support@p55account.com?subject=DFY Vault Support">Contact Support</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
