import PageTemplate from "./PageTemplate";

export default function LibraryPage() {
  return (
    <PageTemplate isNavbarVisible={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-coffee dark:text-sky">
          Library
        </h1>
        <p className="text-grape dark:text-sand">
          Content for the Library page will be added here.
        </p>
      </div>
    </PageTemplate>
  );
}
