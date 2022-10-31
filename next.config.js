/** @type {import('next').NextConfig} */

// Disabled Strict Mode, as react-beautiful-dnd library has issues with StrictMode enabled.
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    dangerouslyAllowSVG: true,
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default nextConfig;
