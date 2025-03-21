import Pagination from "./components/Pagination";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  const pageNumber = (await searchParams).page;
  console.log(searchParams);
  return (
    <div>
      <Pagination
        currentPage={parseInt(pageNumber)}
        itemCount={100}
        pageSize={10}
      />
    </div>
  );
}
