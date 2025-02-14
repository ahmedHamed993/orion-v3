import { Banners, Meta } from "@/types/types";
import { getBaseUrl } from "./actions/getBaseUrl";
type GetBanners = () => Promise<Banners | null>;
export const getBanners: GetBanners = async () => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/banners`);
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};
