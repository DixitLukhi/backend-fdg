import { useMemo, memo } from 'react';
import { Text as RNText } from 'react-native';

import PropTypes from 'prop-types';

import useStyles from 'core/styles/hooks/useStyles';

import styles from './Text.style';

const Text = memo(({ style: propStyle, ...otherTextProps }) => {
  const themedStyles = useStyles(styles);
  const textStyle = useMemo(
    () => [themedStyles.text, propStyle],
    [propStyle, themedStyles.text],
  );
  return <RNText style={textStyle} {...otherTextProps} />;
});

Text.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Text.defaultProps = {
  style: EMPTY_OBJECT,
};

export default Text;
