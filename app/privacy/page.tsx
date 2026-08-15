import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mahadev Listening Room',
  description: 'Privacy, content, and takedown information for the Mahadev Listening Room.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-surface px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-accent transition-colors hover:text-white">← Back to listening room</Link>
        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-accent">Mahadev Listening Room</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/55">Last updated: 15 August 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-white/70">
          <section>
            <h2 className="text-lg font-semibold text-white">Purpose of this website</h2>
            <p className="mt-2">Mahadev Listening Room is an educational and devotional listening experience. It is provided to help visitors discover and enjoy devotional music through embedded YouTube playback.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Third-party content</h2>
            <p className="mt-2">Songs and videos are embedded from YouTube. We do not host, sell, download, or claim ownership of the music, recordings, artwork, or videos. All rights remain with their respective copyright owners and creators. YouTube may process data according to its own policies when an embedded player is loaded or used.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Information we collect</h2>
            <p className="mt-2">This site does not ask visitors to create an account or submit personal information. Basic anonymous performance analytics may be used to understand site reliability and usage. If you contact us by email, we use the information you provide only to respond to your request.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Copyright and takedown requests</h2>
            <p className="mt-2">If you are a copyright owner or authorized representative and believe that any linked or embedded content should be removed or changed, please contact <a className="text-accent underline underline-offset-4" href="mailto:pruthvirajsinh.biz@gmail.com">pruthvirajsinh.biz@gmail.com</a> with the relevant URL and details. We will review legitimate requests and take appropriate action, including removing a link or embed where appropriate.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2">For privacy, content, business, or website-related questions, email <a className="text-accent underline underline-offset-4" href="mailto:pruthvirajsinh.biz@gmail.com">pruthvirajsinh.biz@gmail.com</a> or visit <a className="text-accent underline underline-offset-4" href="https://pruthvirajsinh.in/" target="_blank" rel="noreferrer">pruthvirajsinh.in</a>.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
