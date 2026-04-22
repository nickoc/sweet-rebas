export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink mb-8">
        Privacy Policy
      </h1>
      <div className="space-y-6 text-reba-soft text-base leading-relaxed">
        <p>
          <strong>Last updated:</strong> April 2026
        </p>
        <p>
          Sweet Reba&apos;s Bakery (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the sweetrebas.com
          website. This page informs you of our policies regarding the collection, use, and
          disclosure of personal information when you use our website.
        </p>

        <h2 className="text-reba-cream font-semibold text-xl mt-8">Information We Collect</h2>
        <p>We may collect the following information when you voluntarily provide it:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Email address (when signing up for our newsletter or reopening notifications)</li>
          <li>Name and contact details (when submitting a contact form or cake inquiry)</li>
          <li>Order details (when placing an order through our website)</li>
        </ul>

        <h2 className="text-reba-cream font-semibold text-xl mt-8">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>To process and fulfill your orders</li>
          <li>To send you updates about specials, events, and reopening news (only if you opted in)</li>
          <li>To respond to your inquiries and customer service requests</li>
          <li>To improve our website and services</li>
        </ul>

        <h2 className="text-reba-cream font-semibold text-xl mt-8">We Do Not</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Sell your personal information to third parties</li>
          <li>Share your email with other businesses</li>
          <li>Send unsolicited marketing without your consent</li>
        </ul>

        <h2 className="text-reba-cream font-semibold text-xl mt-8">Cookies</h2>
        <p>
          Our website may use cookies to improve your experience. Cookies are small files stored
          on your device that help us understand how you use our site. You can disable cookies
          in your browser settings at any time.
        </p>

        <h2 className="text-reba-cream font-semibold text-xl mt-8">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:reba@sweetrebas.com" className="text-reba-pink hover:text-reba-pink-hover transition-colors font-semibold">
            reba@sweetrebas.com
          </a>
        </p>
      </div>
    </div>
  );
}
