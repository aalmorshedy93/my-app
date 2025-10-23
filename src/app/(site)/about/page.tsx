import Image from 'next/image';
import CloudImage from '../../../../public/cloud-hosting.png';

export default function AboutPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-50 to-white px-6 py-12">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-extrabold text-sky-700">About Our Platform 🌐</h1>
          <p className="text-gray-700 leading-relaxed text-lg">
            Welcome to <span className="font-semibold text-sky-600">MyApp</span> — your trusted
            source for insightful articles and innovative solutions. Our goal is to empower readers
            with reliable information and a seamless experience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We combine cutting-edge technology with a passion for creativity to deliver high-quality
            content and intuitive tools for developers, writers, and curious minds.
          </p>

          <div className="pt-4">
            <button className="px-6 py-2 bg-sky-600 text-white rounded-full shadow hover:bg-sky-700 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src={CloudImage}
            alt="About MyApp illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
