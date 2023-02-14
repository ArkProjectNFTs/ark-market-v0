import { Icon, IconButton, IconButtonProps, LightMode } from '@chakra-ui/react'
import { FiHeart } from 'react-icons/fi'

export const FavouriteButton = (props: IconButtonProps) => (
  <LightMode>
    <IconButton
      isRound
      bg="white"
      color="gray.900"
      size="sm"
      _hover={{ transform: 'scale(1.1)' }}
      sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
      transition="all 0.15s ease"
      icon={<Icon as={FiHeart} transition="all 0.15s ease" />}
      boxShadow="base"
      {...props}
    />
  </LightMode>
)