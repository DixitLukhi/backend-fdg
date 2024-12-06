import { StyleSheet } from 'atoms';

const styles = ({ textTypes, colors }) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderColor: colors.borderColor,
      borderBottomWidth: 0.2,
    },
    title: {
      ...textTypes.body_M_regular,
      marginLeft: 12,
    },
  });

export const styleVariables = ({ colors }) => ({
  iconColor: colors.icon_primary,
  iconSize: 20,
});
export default styles;
