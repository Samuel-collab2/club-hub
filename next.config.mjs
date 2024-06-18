/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "gtmtrddwcdkwtcqkabfr.supabase.co",
      "img.clerk.com",
    ],
  },
};
;

export default nextConfig;
