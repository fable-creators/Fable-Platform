import { VideoHeroBanner } from "../components/VideoHeroBanner";

export default function LibraryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <VideoHeroBanner videoSrc="/videos/library-hero.mp4" />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4 text-coffee dark:text-sky">
          Library
        </h1>
        <p className="text-grape dark:text-sand mb-6">
          Content for the Library page will be added here.
        </p>
        {/* Additional content can be added here */}
      </div>
    </div>
  );
}
