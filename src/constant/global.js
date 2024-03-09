import { Dimensions, PixelRatio } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const guidelineBaseWidth = 375; // Width of the device on which you designed your layout

const scale = size => (screenWidth / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const GlobalStyles = {
  fontSize: {
    small: moderateScale(12),
    medium: moderateScale(16),
    large: moderateScale(20),
    // Add more font sizes as needed
  },
  height: {
    button: moderateScale(40),
    // Add more height values as needed
  },
  margin: {
    small: moderateScale(5),
    medium: moderateScale(10),
    large: moderateScale(20),
    // Add more margin values as needed
  },
  responsive: (value, type) => {
    switch (type) {
      case 'font':
        return moderateScale(value);
      case 'height':
      case 'width':
      case 'margin':
        return moderateScale(value);
      default:
        return value;
    }
  },
};

export default GlobalStyles;
export {moderateScale};