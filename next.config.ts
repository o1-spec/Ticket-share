import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "imgur.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "storage.cloud.google.com" },
      { protocol: "https", hostname: "cdn.example.com" },
      { protocol: "https", hostname: "media.giphy.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "graph.facebook.com" },
      { protocol: "https", hostname: "instagram.fbna1-1.fna.fbcdn.net" },
      { protocol: "https", hostname: "s3.amazonaws.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" }, // GitHub avatars
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google user photos
      { protocol: "https", hostname: "cdn.discordapp.com" }, // Discord CDN
      { protocol: "https", hostname: "media.tenor.com" }, // Tenor GIFs
      { protocol: "https", hostname: "raw.githubusercontent.com" }, // GitHub raw content
      { protocol: "https", hostname: "placekitten.com" }, // Fun placeholder kittens
      { protocol: "https", hostname: "placebear.com" }, // Fun placeholder bears
      { protocol: "https", hostname: "placehold.it" }, // Old placeholder service
      { protocol: "https", hostname: "dummyimage.com" }, // Dummy images
      { protocol: "https", hostname: "api.dicebear.com" }, // Dicebear avatars
      { protocol: "https", hostname: "cdn.pixabay.com" }, // Pixabay images
      { protocol: "https", hostname: "images.ctfassets.net" }, // Contentful CDN
      { protocol: "https", hostname: "cdn.sanity.io" }, // Sanity.io CDN
      { protocol: "https", hostname: "strapi.io" }, // Strapi backend
    ],
  },
};

export default nextConfig;
