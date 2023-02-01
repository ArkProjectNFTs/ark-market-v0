export const images = [
  {
    id: '01',
    src: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    alt: 'Awesome watch',
  },
  {
    id: '02',
    src: 'https://images.unsplash.com/photo-1451290337906-ac938fc89bce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1777&q=80',
    alt: 'Awesome watch',
  },
  {
    id: '03',
    src: 'https://images.unsplash.com/photo-1568010434570-74e9ba7126bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    alt: 'Awesome watch',
  },
  {
    id: '04',
    src: 'https://images.unsplash.com/photo-1569411032431-07598b0012c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    alt: 'Awesome watch',
  },
  {
    id: '05',
    src: 'https://images.unsplash.com/photo-1565440962783-f87efdea99fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80',
    alt: 'Awesome watch',
  },
  {
    id: '06',
    src: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    alt: 'Awesome watch',
  },
]

export const products = [
  {
    id: '1',
    name: 'Bamboo Tan',
    currency: 'USD',
    price: 199,
    flag: 'new',
    imageUrl:
      'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    rating: 4,
    ratingCount: 1,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
  },
  {
    id: '2',
    name: 'Iconic Turquoise',
    currency: 'USD',
    price: 199,
    salePrice: 179.99,
    flag: 'on-sale',
    imageUrl:
      'https://images.unsplash.com/photo-1509941943102-10c232535736?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    rating: 4,
    ratingCount: 12,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
  },
  {
    id: '3',
    name: 'Marble Leather',
    currency: 'USD',
    price: 199,
    imageUrl:
      'https://images.unsplash.com/photo-1564594985645-4427056e22e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    rating: 4,
    ratingCount: 12,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
  },
  {
    id: '4',
    name: 'Silve wolf',
    currency: 'GBP',
    price: 199,
    imageUrl:
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80',
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