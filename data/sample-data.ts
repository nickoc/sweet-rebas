// Sweet Reba's Bakery — Sample Data for AI Operating System Demo
// All data is hardcoded for demonstration purposes

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "cookies" | "bars" | "breakfast" | "burritos" | "sandwiches" | "salads" | "soup" | "pies";
  emoji: string;
  available: number;
  popular?: boolean;
  sizes?: { label: string; price: number }[];
}

export interface Review {
  id: string;
  platform: "google" | "yelp" | "tripadvisor";
  author: string;
  rating: number;
  date?: string;
  text: string;
  aiResponse: string;
  status: "approved" | "draft" | "posted";
}

export interface BakePlanItem {
  item: string;
  baseQty: number;
  adjustedQty: number;
  reason: string;
  status: "baking" | "done" | "queued";
}

export interface CustomerProfile {
  id: string;
  name: string;
  initials: string;
  frequency: "daily" | "weekly" | "monthly" | "seasonal";
  favorites: string[];
  notes: string;
  lastVisit: string;
  nextAction?: string;
}

export interface WholesaleAccount {
  id: string;
  business: string;
  contact: string;
  order: string;
  schedule: string;
  nextDelivery: string;
  status: "active" | "overdue" | "paused";
}

export interface SocialPost {
  id: string;
  platform: "instagram" | "facebook" | "email";
  caption: string;
  scheduledFor: string;
  status: "draft" | "scheduled" | "posted";
}

export interface WeatherDay {
  day: string;
  temp: number;
  condition: string;
  emoji: string;
  impact: string;
}

export interface InventoryAlert {
  item: string;
  level: "critical" | "warning" | "ok";
  daysRemaining: number;
  action: string;
}

export interface StaffShift {
  name: string;
  role: string;
  time: string;
}

export interface SalesForecast {
  todayProjected: number;
  yesterdayActual: number;
  weekOverWeek: string;
  topSeller: string;
  preOrders: number;
  preOrderValue: string;
}

// ─── MENU ITEMS ─────────────────────────────────────────────

export const menuItems: MenuItem[] = [
  { id: "choc-chip-cookie", name: "Chocolate Chip Cookie", description: "Classic homemade chocolate chip — crispy edges, chewy center, loaded with chips. Reba's signature.", price: 3.50, category: "cookies", emoji: "🍪", available: 36, popular: true },
  { id: "snickerdoodles", name: "Snickerdoodles", description: "Soft cinnamon-sugar cookies with a crackled top. Warm spice, buttery dough, pure comfort.", price: 3.50, category: "cookies", emoji: "🍪", available: 24, popular: true },
  { id: "oatmeal-cranberry", name: "Oatmeal Cranberry", description: "Hearty oats with tart dried cranberries. A wholesome cookie that doesn't compromise on flavor.", price: 3.50, category: "cookies", emoji: "🍪", available: 18 },
  { id: "sandwich-cookies", name: "Sandwich Cookies", description: "Oatmeal cream, chocolate cream, or spice. Rotating flavors weekly.", price: 4.00, category: "cookies", emoji: "🍪", available: 12 },
  { id: "peanut-butter", name: "Peanut Butter Cookie", description: "Rich, nutty, melt-in-your-mouth classic. A peanut butter lover's dream.", price: 3.50, category: "cookies", emoji: "🍪", available: 18 },
  { id: "ginger-cookie", name: "Ginger Cookie", description: "Warm spice with a soft, chewy bite. Perfect with tea or coffee.", price: 3.50, category: "cookies", emoji: "🍪", available: 12 },
  { id: "revolving-cookie", name: "Revolving Cookie", description: "Ask what's fresh today! A new flavor every week.", price: 3.50, category: "cookies", emoji: "🍪", available: 12 },
  { id: "triple-choc-brownies", name: "Triple Chocolate Brownies", description: "Dense, fudgy, three kinds of chocolate. The brownie that ruins all other brownies for you.", price: 3.50, category: "bars", emoji: "🟫", available: 20, popular: true },
  { id: "butterscotch-blondies", name: "White Choc Butterscotch Blondies", description: "Rich blondies studded with white chocolate chips and swirled with butterscotch. Dangerously good.", price: 3.50, category: "bars", emoji: "🟨", available: 16 },
  { id: "lemon-brownies", name: "Matcha Lemon Brownie", description: "Bright, tangy, and buttery — like a lemon bar and a brownie had a perfect child.", price: 3.50, category: "bars", emoji: "🍋", available: 14 },
  { id: "coconut-joy", name: "Coconut Joy", description: "Toasted coconut, dark chocolate, and almond in a chewy bar. Inspired by the candy bar, elevated by Reba.", price: 4.00, category: "bars", emoji: "🥥", available: 12 },
  { id: "peanut-butter-brownie", name: "Peanut Butter Brownie", description: "Fudgy chocolate brownie crowned with a thick layer of creamy peanut butter. Two classics, one bar.", price: 3.50, category: "bars", emoji: "🥜", available: 12 },
  { id: "peanut-butter-chocolate-chip-brownie", name: "Peanut Butter Chocolate Chip Brownie", description: "Fudgy brownie meets peanut butter chocolate chip cookie. Half brownie, half cookie, all magic.", price: 3.50, category: "bars", emoji: "🍫", available: 12 },
  { id: "revolving-bar", name: "Revolving Bar", description: "Ask what's fresh today! A new bar every week.", price: 3.50, category: "bars", emoji: "🍫", available: 12 },
  { id: "cinnamon-donut-muffins", name: "Cinnamon Donut Muffin", description: "Our famous 50-cent muffin — grab a bag!", price: 0.50, category: "breakfast", emoji: "🧁", available: 48 },
  { id: "coffee-cake", name: "Coffee Cake", description: "Cinnamon streusel top, tender cake center. A Reba's classic — perfect with your morning coffee.", price: 4.00, category: "breakfast", emoji: "🧁", available: 16 },
  { id: "banana-pudding", name: "Banana Pudding", description: "Layers of velvety vanilla pudding, fresh banana, and Nilla wafers. A Reba's comfort favorite, made fresh.", price: 4.00, category: "breakfast", emoji: "🍌", available: 12 },
  { id: "banana-bread", name: "Banana Bread", description: "Moist banana bread baked with toasted nuts. A Reba's classic, made from scratch.", price: 4.00, category: "breakfast", emoji: "🍌", available: 12, sizes: [
    { label: "Slice", price: 4.00 },
    { label: "Whole Loaf", price: 4.00 },
  ] },
  { id: "lemon-loaf", name: "Lemon Loaf", description: "Bright, tangy, and perfectly glazed. A Sweet Reba's classic.", price: 4.00, category: "breakfast", emoji: "🍋", available: 12, sizes: [
    { label: "Slice", price: 4.00 },
    { label: "Whole Loaf", price: 4.00 },
  ] },
  { id: "morning-glory-muffins", name: "Morning Glory Muffins", description: "Packed with carrots, apples, raisins, and walnuts. A hearty start to any morning.", price: 4.00, category: "breakfast", emoji: "🧁", available: 14, sizes: [
    { label: "Slice", price: 4.00 },
    { label: "Whole Loaf", price: 4.00 },
  ] },
  { id: "scones", name: "Scones", description: "Flaky, buttery, and golden. Rotating flavors — today's batch: blueberry lemon.", price: 3.50, category: "breakfast", emoji: "🫓", available: 18 },
  { id: "whole-loaves", name: "Whole Loaves", description: "Take a full loaf home for the family. Banana bread, pumpkin, or lemon.", price: 22.00, category: "breakfast", emoji: "🍞", available: 6 },
  { id: "classic-burrito", name: "Classic Burrito", description: "Eggs, cheese, potatoes, and Reba's house salsa in a warm flour tortilla. Simple and satisfying.", price: 5.50, category: "burritos", emoji: "🌯", available: 20, popular: true },
  { id: "burrito-supreme", name: "Burrito Supreme", description: "Scrambled eggs, melted cheese, fresh pico de gallo, and bell peppers in a warm flour tortilla. Loaded, fresh, and impossible to share.", price: 7.50, category: "burritos", emoji: "🌯", available: 12 },
  { id: "albacore-tuna", name: "Albacore Tuna Sandwich", description: "Premium albacore tuna salad on soft fresh bread. Light, clean, and the way a tuna sandwich should be.", price: 6.00, category: "sandwiches", emoji: "🥪", available: 10 },
  { id: "breakfast-sandwich", name: "Breakfast Sandwich", description: "Sweet Reba's all-day breakfast sandwich on toasted bread — egg-forward, savory, and built to start the morning right.", price: 6.00, category: "sandwiches", emoji: "🥪", available: 10 },
  { id: "italian-sub", name: "The Italian Sub", description: "Cured Italian meats, sharp cheese, and peppery greens on rustic ciabatta. Old-school, no apologies.", price: 6.00, category: "sandwiches", emoji: "🥪", available: 10 },
  { id: "mediterranean-quinoa-salad", name: "Mediterranean Quinoa Salad", description: "Fluffy quinoa tossed with bright Mediterranean vegetables and herbs. Light, fresh, and full of sunshine.", price: 6.00, category: "salads", emoji: "🥗", available: 10 },
  { id: "potato-salad", name: "Potato Salad", description: "Classic creamy potato salad — Reba's recipe, made fresh in-house. The cookout side that disappears first.", price: 6.00, category: "salads", emoji: "🥗", available: 10 },
  { id: "soup", name: "Soup of the Day", description: "Rotating homemade soups, made fresh daily. Pick your size.", price: 5.00, category: "soup", emoji: "🥣", available: 50, sizes: [
    { label: "12oz Cup", price: 5.00 },
    { label: "16oz Bowl", price: 7.00 },
    { label: "Quart", price: 12.00 },
  ] },
  { id: "key-lime-pie", name: "Key Lime Pie", description: "Tangy key lime custard in a graham cracker crust, topped with fresh whipped cream. A crowd favorite.", price: 18.00, category: "pies", emoji: "🥧", available: 4 },
  { id: "dutch-apple-pie", name: "Dutch Apple Pie", description: "Cinnamon-spiced apples under a buttery crumble topping. Reba's grandmother's recipe.", price: 25.00, category: "pies", emoji: "🥧", available: 3 },
  { id: "pecan-pie", name: "Pecan Pie", description: "Rich, caramelized pecan filling in a flaky butter crust. Southern tradition, Monterey made.", price: 25.00, category: "pies", emoji: "🥧", available: 3 },
  { id: "lemon-meringue-pie", name: "Lemon Meringue Pie", description: "Tart lemon curd topped with fluffy meringue. A showstopper.", price: 25.00, category: "pies", emoji: "🥧", available: 3 },
];

// ─── REVIEWS WITH AI RESPONSES ──────────────────────────────

export const reviews: Review[] = [
  {
    id: "r1",
    platform: "google",
    author: "Lisa M.",
    rating: 5,
    date: "March 2026",
    text: "The chocolate chip cookies are incredible — crispy edges, gooey center, real butter flavor. My kids beg me to stop here every time we drive through Carmel. The breakfast burritos are also amazing. Sweet Reba's is a gem.",
    aiResponse: "Lisa, hearing that your kids request a Sweet Reba's stop makes our day! We bake every cookie from scratch each morning, and that butter flavor is no accident — we never cut corners on ingredients. See you and the kids soon! — Reba",
    status: "approved",
  },
  {
    id: "r2",
    platform: "yelp",
    author: "Tom R.",
    rating: 4,
    date: "March 2026",
    text: "Great burritos and really good brownies. Only reason it's not 5 stars is the line on Saturday mornings — waited 20 minutes. But honestly worth it. The triple chocolate brownie is sinful.",
    aiResponse: "Tom, we hear you on the Saturday wait — it's a testament to the neighborhood but we know your time matters. We're looking into a pre-order option so you can skip the line. And yes, that triple chocolate brownie is absolutely meant to be sinful. Thank you for the honest feedback! — Reba",
    status: "draft",
  },
  {
    id: "r3",
    platform: "google",
    author: "Karen S.",
    rating: 5,
    date: "February 2026",
    text: "I come here almost every morning for a chorizo burrito and coffee. Reba remembers my name and my order. That personal touch is rare these days. The burritos are the best on the peninsula, hands down.",
    aiResponse: "Karen, you're part of the Sweet Reba's family at this point! Knowing our regulars by name and order is what makes this place special to us. Your loyalty means the world. See you tomorrow morning! — Reba",
    status: "draft",
  },
  {
    id: "r4",
    platform: "yelp",
    author: "Michael & Janet P.",
    rating: 5,
    date: "March 2026",
    text: "Ordered a Dutch Apple Pie for Thanksgiving and it was the best pie anyone at our table had ever tasted. Now we order one every month. Reba's grandmother's recipe is the real deal.",
    aiResponse: "Michael and Janet, that Thanksgiving story warms my heart! My grandmother would be so proud to know her recipe is still bringing families together around the table. Thank you for making it a monthly tradition. — Reba",
    status: "approved",
  },
  {
    id: "r5",
    platform: "google",
    author: "David W.",
    rating: 4,
    date: "February 2026",
    text: "Stopped in for the first time on a friend's recommendation. The snickerdoodles are perfectly soft and the lemon brownies are a unique twist I haven't seen elsewhere. Cozy little spot. Will definitely be back.",
    aiResponse: "David, so glad your friend steered you our way! The lemon brownies are one of our sleeper hits — once people try them, they're hooked. We look forward to seeing you become a regular. — Reba",
    status: "draft",
  },
];

// ─── BAKE PLAN ──────────────────────────────────────────────

export const bakePlan: BakePlanItem[] = [
  { item: "Chocolate Chip Cookies", baseQty: 48, adjustedQty: 60, reason: "Saturday + sunny = high foot traffic, increase 25%", status: "baking" },
  { item: "Snickerdoodles", baseQty: 36, adjustedQty: 42, reason: "Saturday bump — consistent weekend seller", status: "baking" },
  { item: "Triple Chocolate Brownies", baseQty: 24, adjustedQty: 30, reason: "Popular item + wholesale order for Crossroads Cafe", status: "done" },
  { item: "Scones", baseQty: 18, adjustedQty: 18, reason: "Steady demand, no adjustment needed", status: "queued" },
  { item: "Breakfast Burritos (all)", baseQty: 30, adjustedQty: 36, reason: "Saturday morning rush — Karen alone accounts for 2", status: "baking" },
  { item: "Morning Muffins", baseQty: 24, adjustedQty: 24, reason: "Consistent weekday and weekend seller", status: "queued" },
];

// ─── WEATHER ────────────────────────────────────────────────

export const weatherForecast: WeatherDay[] = [
  { day: "Today (Sat)", temp: 68, condition: "Sunny", emoji: "☀️", impact: "+12% foot traffic" },
  { day: "Tomorrow (Sun)", temp: 63, condition: "Partly Cloudy", emoji: "⛅", impact: "Closed" },
  { day: "Monday", temp: 59, condition: "Overcast", emoji: "☁️", impact: "Closed" },
  { day: "Tuesday", temp: 61, condition: "Sunny", emoji: "☀️", impact: "Normal" },
];

// ─── CUSTOMER PROFILES ──────────────────────────────────────

export const customers: CustomerProfile[] = [
  { id: "c1", name: "Maria Lopez", initials: "ML", frequency: "weekly", favorites: ["Chocolate Chip Cookies", "Snickerdoodles", "Oatmeal Cranberry"], notes: "Comes every Saturday with her two kids. Always buys a dozen assorted cookies. Prefers them slightly warm.", lastVisit: "Mar 29, 2026", nextAction: "Saturday regular — have her usual dozen ready by 9 AM" },
  { id: "c2", name: "The Hendersons", initials: "TH", frequency: "seasonal", favorites: ["Dutch Apple Pie", "Pecan Pie", "Key Lime Pie"], notes: "Family of 4. Order pies for every holiday — Thanksgiving, Christmas, Easter, birthdays. Haven't visited since Christmas.", lastVisit: "Dec 23, 2025", nextAction: "Win-back: Easter pie reminder — haven't visited in 3+ months" },
  { id: "c3", name: "Karen Sullivan", initials: "KS", frequency: "daily", favorites: ["Chorizo Burrito", "Bacon Burrito"], notes: "Here every weekday morning at 7:15 AM sharp. Chorizo burrito Monday through Thursday, bacon burrito on Fridays. Knows all the staff by name.", lastVisit: "Apr 1, 2026" },
  { id: "c4", name: "David Chen", initials: "DC", frequency: "monthly", favorites: ["Birthday Cakes", "Triple Chocolate Brownies"], notes: "Orders custom birthday cakes for his family — wife in May, daughter in August, son in November. Also grabs brownies when he stops in.", lastVisit: "Mar 10, 2026", nextAction: "Wife's birthday cake — reach out mid-April for May order" },
];

// ─── WHOLESALE ACCOUNTS ─────────────────────────────────────

export const wholesaleAccounts: WholesaleAccount[] = [
  { id: "w1", business: "Carmel Coffee House", contact: "Sarah T.", order: "3 dozen assorted cookies + 1 dozen brownies", schedule: "Mon/Wed/Fri, 7:00 AM delivery", nextDelivery: "Apr 3, 2026", status: "active" },
  { id: "w2", business: "The Crossroads Cafe", contact: "James B.", order: "2 dozen cookies + 2 dozen muffins", schedule: "Tue/Thu/Sat, 6:30 AM delivery", nextDelivery: "Apr 4, 2026", status: "active" },
  { id: "w3", business: "Salinas Valley Memorial", contact: "Linda R.", order: "5 dozen assorted cookies + 3 dozen muffins", schedule: "Mon/Wed, 6:00 AM delivery", nextDelivery: "Overdue — no order confirmed in 2 weeks", status: "overdue" },
];

// ─── SOCIAL POSTS ───────────────────────────────────────────

export const socialPosts: SocialPost[] = [
  { id: "s1", platform: "instagram", caption: "Saturday morning at Sweet Reba's: fresh chocolate chip cookies coming out of the oven, breakfast burritos wrapped and ready, and the coffee is hot. Come early — the brownies won't last. 🍪🌯", scheduledFor: "Sat 8:00 AM", status: "scheduled" },
  { id: "s2", platform: "instagram", caption: "Our Triple Chocolate Brownie: dark chocolate, milk chocolate, and cocoa in every fudgy bite. One customer called it 'sinful.' We don't disagree. 🟫✨", scheduledFor: "Sat 12:00 PM", status: "draft" },
  { id: "s3", platform: "facebook", caption: "This week at Sweet Reba's: Blueberry Lemon Scones are back! Plus our famous breakfast burritos, fresh-baked cookies, and homemade soup. Open Tuesday through Saturday, 7 AM to 2 PM. See you soon! 💛", scheduledFor: "Mon 9:00 AM", status: "scheduled" },
  { id: "s4", platform: "email", caption: "Subject: This Week at Sweet Reba's — Blueberry Lemon Scones Are Back!\n\nHi friend,\n\nThis week's lineup is looking extra good. Our Blueberry Lemon Scones are back by popular demand, and we're baking up extra batches of Triple Chocolate Brownies for the weekend rush.\n\nDon't forget — we do custom pies with 48-hour notice. Dutch Apple, Key Lime, and Pecan are always available.\n\nPre-order your favorites so they're set aside when you arrive.\n\nSee you soon,\nReba", scheduledFor: "Tue 8:00 AM", status: "draft" },
];

// ─── INVENTORY ALERTS ───────────────────────────────────────

export const inventoryAlerts: InventoryAlert[] = [
  { item: "Butter", level: "warning", daysRemaining: 3, action: "Reorder today — supplier needs 48hr lead time" },
  { item: "Chocolate Chips", level: "critical", daysRemaining: 1, action: "Urgent: call distributor before noon" },
  { item: "All-Purpose Flour", level: "ok", daysRemaining: 7, action: "Adequate for the week" },
];

// ─── STAFF SCHEDULE ─────────────────────────────────────────

export const staffSchedule: StaffShift[] = [
  { name: "Reba", role: "Head Baker", time: "3:00 AM — 11:00 AM" },
  { name: "Michael", role: "Manager", time: "6:00 AM — 2:00 PM" },
  { name: "Ana", role: "Counter", time: "7:00 AM — 1:00 PM" },
];

// ─── SALES FORECAST ─────────────────────────────────────────

export const salesForecast: SalesForecast = {
  todayProjected: 1800,
  yesterdayActual: 1650,
  weekOverWeek: "+9.1%",
  topSeller: "Chocolate Chip Cookies",
  preOrders: 5,
  preOrderValue: "$142",
};

// ─── CONCIERGE RESPONSES ────────────────────────────────────

export const conciergeGreeting = "Welcome to Sweet Reba's! I can help with our menu, hours, pre-orders, custom cakes, or anything about the bakery. What can I help you with?";

export const conciergeQuickReplies = [
  { label: "Hours & Location", keyword: "hours" },
  { label: "Today's Menu", keyword: "menu" },
  { label: "Pre-Order", keyword: "preorder" },
  { label: "Custom Cakes & Pies", keyword: "cakes" },
];

export const conciergeResponses: Record<string, string> = {
  hours: "We're open Tuesday through Saturday, 7:00 AM to 2:00 PM. Closed Sunday and Monday. Saturday mornings are our busiest — come early for the best selection!",
  location: "We have two locations on the Monterey Peninsula: Carmel and Salinas. Stop by either one for fresh-baked cookies, burritos, and more!",
  menu: "Today's highlights: 🍪 Chocolate Chip Cookies ($3.50) — Reba's signature. 🟫 Triple Chocolate Brownies ($3.50). 🌯 Breakfast Burritos ($5.50-$6.00). 🥧 Dutch Apple Pie ($25). Check our full menu for all items!",
  preorder: "You can pre-order your favorites so they're set aside for pickup! Head to our menu page, add what you'd like, and choose a pickup time. No more missing out on the brownies!",
  cakes: "We do custom cakes and pies! Dutch Apple, Key Lime, and Pecan pies are always available with 48-hour notice. For custom cakes, give us 3-5 days lead time. Call or stop by to discuss your order!",
  burritos: "Our breakfast burritos are made fresh every morning! Classic ($5.50), Bacon ($6), Sausage ($6), and Chorizo ($6) — all with eggs, cheese, potatoes, and Reba's house salsa. Available until we sell out!",
  cookies: "We bake all our cookies fresh each morning: Chocolate Chip ($3.50), Snickerdoodles ($3.50), Oatmeal Cranberry ($3.50), and rotating Sandwich Cookies ($4). They're best when they're still warm!",
  wholesale: "We supply cookies, brownies, and muffins to businesses across the Monterey Peninsula. Currently serving Carmel Coffee House, The Crossroads Cafe, and Salinas Valley Memorial. Interested? Give us a call!",
  default: "I can help with our hours & location, today's menu, pre-ordering, custom cakes & pies, burritos, cookies, or wholesale inquiries. What would you like to know?",
};

// Aliases for admin dashboard compatibility
export const reviewQueue = reviews;
export const contentQueue = socialPosts;
export const customerInsights = customers;

// Bakery hours
export const bakeryHours = [
  { day: "Monday", hours: "7am - 3pm" },
  { day: "Tuesday", hours: "7am - 3pm" },
  { day: "Wednesday", hours: "7am - 3pm" },
  { day: "Thursday", hours: "7am - 3pm" },
  { day: "Friday", hours: "7am - 3pm" },
  { day: "Saturday", hours: "7am - 3pm" },
  { day: "Sunday", hours: "CLOSED" },
];
