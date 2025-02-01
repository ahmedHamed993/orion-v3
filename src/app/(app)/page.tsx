import HomeBanners from "./components/home-banners";
// api calls
import { getBanners } from "@/api-calls/banners";
import HomeTopCategories from "./components/home-top-categories";
import { getCategories } from "@/api-calls/categories";
import { getMeta } from "@/api-calls/meta";
import HomeItems from "./components/home-items";
export default async function Home() {
  const banners = await getBanners();
  const categories = await getCategories("?sorts=sort&paginate=12");
  const meta = await getMeta();
  return (
    <div className="">
      <HomeBanners banners={banners?.data || []} />
      <HomeTopCategories
        categories={categories?.data ?? []}
        logo={meta?.vendor?.img || ""}
      />
      <HomeItems />
    </div>
  );
}
