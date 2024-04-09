export type ResponseType = {
    success: boolean;
    data: {
      location: {
        id: string;
        store_name: string;
      };
      banners: Array<{
        id: string;
        imgUrl: string;
      }>;
      categories: Array<{
        id: string;
        name: string;
        imgUrl: string;
      }>;
      freshes: Array<{
        catId: string;
        id: string;
        title: string;
        imgUrl: string;
        price: string;
      }>;
      discounts: Array<{
        catId: string;
        id: string;
        title: string;
        imgUrl: string;
        price: string;
      }>
    }
  }

  