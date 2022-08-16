import Head from "next/head";

export default function MidJourneyHead({ title }: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Easily create complex Midjourney prompts."
      />
      <meta
        property="og:image"
        content={`https://firebasestorage.googleapis.com/v0/b/noonshot-dev.appspot.com/o/midjourney%2Fimages%2F341434f9-cef9-4596-86d6-9833653385ae?alt=media&token=fa80a0d3-36c0-4aa6-9042-18ce3a2e46f3`}
      />
      w
    </Head>
  );
}
