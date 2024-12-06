import { memo } from 'react';
import { View as RNView } from 'react-native';

import PropTypes from 'prop-types';

const View = memo(({ style, ...otherViewProps }) => (
  <RNView style={style} {...otherViewProps} />
));

View.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

View.defaultProps = {
  style: EMPTY_OBJECT,
};

export default View;
