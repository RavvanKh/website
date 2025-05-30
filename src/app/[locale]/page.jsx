import Home from "@/components/pages/home/Home";

import { getHomeData } from "@/lib/utils/api/home";

export const generateMetadata = async () =>{
  const {organization} = await getHomeData();
  
  if(Object.keys(organization).length === 0){
    return {}
  }

  return {
    title: organization?.name,
    description: organization?.description,
    openGraph: {
      title: organization?.name,
      description: organization?.description,
      url: organization?.url,
      siteName: organization?.name,
      images: [
        {
          url: organization?.logo,
          width: 800,
          height: 600,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: organization?.name,
      description: organization?.description,
      images: [organization?.logo],
    },
    alternates: {
      canonical: organization?.url,
    }
  }
}

export default function HomePage() {
  return (
    <Home/>
  );
}
