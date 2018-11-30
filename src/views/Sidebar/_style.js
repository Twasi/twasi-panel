export const getMenuStyle = () => ({
  display: 'inline-block',
  margin: '23px 32px 16px 0',
  boxShadow: 'none'
});

export const getMenuItemStyle = () => ({
  position: 'relative',
  borderRadius: 0,
  Opacity: 0.7,
  fontSize: 13
});

export const getHeaderMenuItem = () => ({
  ...getMenuItemStyle(),
  background: 'linear-gradient(135deg,#00aeae,#02d4d4)',
  fontSize: 18,
  fontWeight: '600',
  lineHeight: '48px',
  color: '#fff',
  marginLeft: 0,
  padding: '0px 16px 0px 16px',
  minHeight: 48,
  position: 'relative',
  textAlign: 'center',
  borderRadius: '4px 4px 0px 0px'
});

export const getActiveMenuItem = () => ({
  color: '#00aeae'
});
