export const getMenuStyle = () => ({
  /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), */
  /* marginRight: 60,
  marginBottom: 30, */
  display: 'inline-block',
  margin: '32px 32px 16px 0'
});

export const getMenuItemStyle = () => ({
  position: 'relative',
  borderRadius: 0,
  Opacity: 0.9,
  fontSize: 13
});

export const getHeaderMenuItem = () => ({
  ...getMenuItemStyle(),
  backgroundColor: '#009688',
  fontSize: 14,
  lineHeight: '48px',
  color: '#fff',
  marginLeft: 0,
  padding: '0px 16px 0px 16px',
  minHeight: 48,
  position: 'relative'
});
