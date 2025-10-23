'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="text-gray-800">
      {/* ✅ Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6 bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold text-blue-700 mb-6 leading-tight"
        >
          Empower Your Knowledge with <span className="text-blue-500">MyApp</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg sm:text-xl max-w-2xl mb-10 text-gray-600"
        >
          Explore high-quality articles, tutorials, and insights from professionals around the
          world. Learn, share, and grow together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/articles"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Explore Articles
          </Link>
          <Link
            href="/register"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Join Now
          </Link>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <Image
            src="/cloud-hosting.png"
            alt="Knowledge Illustration"
            width={550}
            height={350}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* ✅ Features Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-12">Why Choose MyApp?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: 'Expert Authors',
                desc: 'Learn from experienced writers and professionals in every field.',
              },
              {
                title: 'Fresh Content',
                desc: 'Stay updated with the latest tutorials, insights, and tech trends.',
              },
              {
                title: 'Community Driven',
                desc: 'Engage with like-minded learners and share your own experiences.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg border border-gray-100 transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Stats Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
          {[
            { label: 'Articles Published', value: '1,200+' },
            { label: 'Active Members', value: '8,500+' },
            { label: 'Expert Authors', value: '320+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <h3 className="text-4xl font-extrabold mb-2">{stat.value}</h3>
              <p className="text-blue-100 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Testimonials Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-12">What Our Users Say</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: 'Sarah Johnson',
                feedback:
                  'MyApp has completely changed the way I learn and share knowledge. Highly recommended!',
              },
              {
                name: 'Michael Brown',
                feedback:
                  'Great community and top-quality articles. I’ve improved my skills significantly here.',
              },
              {
                name: 'Emily Carter',
                feedback:
                  'The best platform for developers and tech enthusiasts. Friendly and inspiring environment!',
              },
            ].map((user, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow border border-gray-100 transition"
              >
                <p className="text-gray-600 mb-4 italic">“{user.feedback}”</p>
                <h4 className="text-blue-700 font-semibold">{user.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Start Your Journey with MyApp 🚀
        </motion.h2>
        <p className="mb-8 text-lg text-blue-100">
          Sign up today and access thousands of valuable articles and tutorials.
        </p>
        <Link
          href="/register"
          className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Create Account
        </Link>
      </section>
    </main>
  );
}
