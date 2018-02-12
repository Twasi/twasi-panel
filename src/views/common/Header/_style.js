import twasiGlitchBanner from '../resources/twasi_glitch_banner.png';

export const getHeaderStyle = () => ({
  backgroundImage: `url(${twasiGlitchBanner})`,
  backgroundSize: 'cover',
  height: 265,
  width: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  borderTop: '5px solid #00aeae',
  zIndex: -100
});

export const getAvatarStyle = () => ({
  width: 45,
  height: 45,
  borderRadius: '50%',
  border: '2px solid rgba(255, 255, 255, 0.8)'
});

export const getLogoStyle = () => ({
  color: '#fff',
  fontWeight: 700,
  fontSize: 23,
  display: 'flex'
});

export const getLogoDescriptionStyle = () => ({
  marginLeft: 10
});

export const getRankStyle = () => ({
  display: 'block',
  fontWeight: 400,
  fontSize: 18,
  lineHeight: '100%',
  marginTop: -3,
  color: 'rgba(255, 255, 255, 0.6)'
});
