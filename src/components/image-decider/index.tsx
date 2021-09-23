import { FC } from 'react'

type Prop = {
  name: string
}

export function selectImage (name: string) {
  if(name === 'iPhone XR'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/iphone_xr_plndho.png';

  if(name === 'iPhone X'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/X_czc6gp.png';

  if(name === 'iPhone 8 PLUS'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/iphone_8_plus_vcg4pu.png';

  if (name === 'iPhone 8'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380523/iphone_8_cqp2u4.png';

  if (name === 'iPhone 7 Plus'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380523/iphone_7_plus_spxku1.png';

  if(name === 'iPhone 7'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380523/iphone_7_prggve.png';

  if(name === 'iPhone 6S Plus'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380523/iphone_6s_plus_ipp8jv.png';

  if(name === 'iPhone 6S'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/iphone_6s_indrvp.png';

  if(name === 'iPhone 6 Plus'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380523/iphone_6_plus_kqkxn9.png';

  if(name === 'iPhone 6'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380523/iphone_6_ifyc0j.png';

  if(name === 'iPhone SE'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/iphone_se_bvuwae.png';

  if(name === 'iPhone XS Max'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/iphone_xs_max_dpzgjs.png';

  if(name === 'iPhone XS'.toLowerCase()) return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/iphone_xs_drbhkv.png';

  return 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380524/iphone_xs_drbhkv.png';
}

const ImageDecider: FC<Prop> = ({ name }) => {
  const src = selectImage(name);
  return (
    <img src={src} alt={name} height='120' width='120'style={{borderRadius: '2px'}}/>
  )
}

export default ImageDecider;
