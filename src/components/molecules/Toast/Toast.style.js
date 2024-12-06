import { StyleSheet } from 'atoms';
import withOpacity from 'core/styles/utils';

const styles = ({ colors, textTypes }) =>
  StyleSheet.create({
    container: {
      zIndex: 1,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 0,
      padding: 8,
      borderRadius: 8,
      flexDirection: 'row',
      shadowOpacity: 0.2,
      shadowColor: withOpacity(colors.shadowColor, 0.2),
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 0,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    message: {
      ...textTypes.body_M_bold,
      color: colors.spr_clr_white,
      marginLeft: 10,
    },
    toastLoading: {
      backgroundColor: colors.spr_clr_blue,
    },
    toastSuccess: {
      backgroundColor: colors.spr_clr_green,
    },
    toastError: {
      backgroundColor: colors.spr_clr_red,
    },
  });

export const styleVariables = ({ colors }) => ({
  iconSize: 15,
  iconColor: colors.spr_clr_white,
});

export const activityIndicatorConfig = ({ colors }) => ({
  activityIndicatorColor: colors.spr_clr_white,
});

export default styles;
