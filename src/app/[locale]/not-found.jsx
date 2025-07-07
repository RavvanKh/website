import NotFound from "@/components/pages/not-found/NotFound";

export async function generateStaticParams(params) {

    return {
        title: 'Not Found',
    }
}
const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
