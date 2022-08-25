import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://offingo.herokuapp.com/${src}?w=${width}&q=${quality || 75}`
}

export const MyImage = ({src}) => {
  return (
    <Image
      loader={myLoader}
      src={src}
      alt=""
      layout='fill'
    />
  )
}
