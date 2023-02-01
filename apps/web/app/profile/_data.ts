export const images = [
  {
    id: '01',
    src: 'https://everai-duos.imgix.net/d44a5ac4-4350-4874-a3e3-82f28f3a9ecf.jpg?w=800',
    alt: 'Awesome watch',
  },
  {
    id: '02',
    src: 'https://everai-duos.imgix.net/80c4adc6-9564-4884-a924-12bd83060e59.jpg?w=800',
    alt: 'Awesome watch',
  },
  {
    id: '03',
    src: 'https://everai-duos.imgix.net/765d8c83-450e-4b37-89bf-173d41eb5b28.jpg?w=800',
    alt: 'Awesome watch',
  },
  {
    id: '04',
    src: 'https://everai-duos.imgix.net/99a5f383-9ca4-49e8-987c-3800cf3c65d0.jpg?w=800',
    alt: 'Awesome watch',
  },
  {
    id: '05',
    src: 'https://everai-duos.imgix.net/89c29ddf-3b13-45b7-a3aa-5c34b0d270d4.jpg?w=800',
    alt: 'Awesome watch',
  },
  {
    id: '06',
    src: 'https://everai-duos.imgix.net/92442fc8-fff0-4fa4-a4ea-b622f9976ec9.jpg?w=800',
    alt: 'Awesome watch',
  },
]

export const products = [
  {
    id: '1',
    name: 'DUO 13',
    currency: 'USD',
    price: 1.99,
    flag: 'new',
    imageUrl:
      'https://everai-duos.imgix.net/92442fc8-fff0-4fa4-a4ea-b622f9976ec9.jpg?w=800',
    rating: 4,
    ratingCount: 1,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
  },
  {
    id: '2',
    name: 'DUO 2394',
    currency: 'USD',
    price: 0.99,
    salePrice: 179.99,
    flag: 'on-sale',
    imageUrl:
      'https://everai-duos.imgix.net/80c4adc6-9564-4884-a924-12bd83060e59.jpg?w=800',
    rating: 4,
    ratingCount: 12,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
  },
  {
    id: '3',
    name: 'DUO 1439',
    currency: 'USD',
    price: 0.19,
    imageUrl:
      'https://everai-duos.imgix.net/89c29ddf-3b13-45b7-a3aa-5c34b0d270d4.jpg?w=800',
    rating: 4,
    ratingCount: 12,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
  },
  {
    id: '4',
    name: 'DUO 23',
    currency: 'GBP',
    price: 0.99,
    imageUrl:
      'https://everai-duos.imgix.net/99a5f383-9ca4-49e8-987c-3800cf3c65d0.jpg?w=800',
    rating: 5,
    ratingCount: 1,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
  },
]

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export type Product = ElementType<typeof products>
export type ProductImage = ElementType<typeof images>