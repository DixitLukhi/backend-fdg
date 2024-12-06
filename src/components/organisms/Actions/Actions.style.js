import { StyleSheet } from 'atoms';

const styles = ({ colors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      flex: 1,
    },
  });

export default styles;
