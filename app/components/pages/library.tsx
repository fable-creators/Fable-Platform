import UnityGame from "./components/components_UnityGame.tsx";

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Library</h1>
      <UnityGame />
    </div>
  )
}