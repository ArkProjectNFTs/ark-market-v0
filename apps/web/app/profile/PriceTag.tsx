import { HStack, StackProps, Text, TextProps, useColorModeValue as mode } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PriceTagProps {
  currency: string
  price: number
  rootProps?: StackProps
  priceProps?: TextProps
}

export type FormatPriceOptions = { locale?: string; currency?: string }


export const PriceTag = (props: PriceTagProps) => {
  const { price, currency, rootProps, priceProps } = props
  return (
    <HStack spacing="1" {...rootProps}>
      <Price textProps={priceProps}>
        {price} {currency}
      </Price>
    </HStack>
  )
}

interface PriceProps {
  children?: ReactNode
  textProps?: TextProps
}

const Price = (props: PriceProps) => {
  const {  children, textProps } = props
  const defaultColor = mode('gray.700', 'gray.400')
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={defaultColor}
      {...textProps}
    >
      {children}
    </Text>
  )
}

const SalePrice = (props: TextProps) => (
  <Text as="span" fontWeight="semibold" color={mode('gray.800', 'gray.100')} {...props} />
)