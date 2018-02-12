export const getMenuStyle = () => ({
  listStyle: 'none',
  paddingLeft: 0,
  margin: 0,
  /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), */
  backgroundColor: '#fff',
  marginRight: 60,
  marginBottom: 30,
  marginTop: 40,
  width: 210
});

export const getMenuItemStyle = () => ({
  position: 'relative',
  padding: 20,
  borderRadius: 0,
  Opacity: 0.9,
  fontSize: 13
});

export const getHeaderMenuItem = () => ({
  ...getMenuItemStyle(),
  backgroundColor: '#009688',
  fontSize: 14,
  lineHeight: '100%',
  color: '#fff'
});
