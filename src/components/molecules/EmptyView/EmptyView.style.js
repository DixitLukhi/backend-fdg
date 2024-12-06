import { StyleSheet } from 'atoms';

const styles = ({ colors, textTypes }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryBackgroundColor,
      marginTop: 12,
    },
    content: {
      ...textTypes.heading_S_medium,
    },
    button: {
      marginTop: 20,
      backgroundColor: colors.spr_clr_blue,
      padding: 16,
      paddingVertical: 8,
      borderRadius: 6,
      alignSelf: 'center',
    },
    refresh: {
      ...textTypes.body_S_medium,
      color: colors.spr_clr_white,
    },
  });

export default styles;
