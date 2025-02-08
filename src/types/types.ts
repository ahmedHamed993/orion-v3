export type Meta = {
  api_version: string;
  commit: {
    count: number;
    describe: string;
    sha1: string;
    time: string;
  };
  domain: string;
  enums: {
    "genders:": ["male", "female"];
    locales: ["ar", "en"];
  };
  project_code: string;
  project_name: string;
  server_time: {
    go_now: string;
    pg_now: string;
    utc_2: string;
  };
  super_parents: {
    cards: string;
    customers: string;
    drivers: string;
    education: string;
    faqs: string;
    files: string;
    images: string;
    items: string;
    orders: string;
    payment_methods: string;
    references: string;
    schedules: string;
    shift: string;
    vendors: string;
  };
  url: string;
  vendor: {
    id: string;
    slug: string;
    is_disabled: boolean;
    is_independent: boolean;
    img: string;
    thumb: string;
    color_primary: string;
    color_secondary: string;
    color_on_primary: string;
    color_on_secondary: string;
  };
};

export type MetaData = {
  current_page: number;
  from: number;
  per_page: number;
  to: number;
  total: number;
};
export type Banner = {
  id: string;
  img: string;
  thumb: string;
  is_disabled: boolean;
  created_at: string;
  updated_at: string;
};
export type Banners = {
  data: Banner[];
  meta: MetaData;
};
export type Category = {
  id: string;
  parent_id: string;
  super_parent_id: string;
  name: string;
  depth: number;
  img: string;
  is_disabled: boolean;
  sort: number;
  created_at: string;
  updated_at: string;
  path: {
    id: string;
    depth: number;
    name: string;
  }[];
};
export type StructuredCategory = {
  id: string;
  name: string;
  children: StructuredCategory[];
};
export type Categories = {
  meta: MetaData;
  data: Category[];
};

export type Item = {
  id: string;
  name: string;
  img: string;
  thumb: string;
  max_order_quantity: number;
  quantity: number;
  price: number;
  discount: number;
  final_price: number;
  is_featured: boolean;
  is_disabled: boolean;
  rate_avg: number;
  is_card: boolean;
  categories: Category[];
  images: { id: string; img: string }[] | [];
  created_at: string;
  updated_at: string;
  unit: {
    id: number;
    name: string;
    is_disabled: boolean;
  };
  status: string;
  description: string;
  category: Category;
};

export type Items = {
  meta: MetaData;
  data: Item[];
} | null;

export type Address = {
  id: string;
  name: string;
  details: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};
