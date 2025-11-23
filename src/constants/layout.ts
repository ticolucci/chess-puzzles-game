import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const BOARD_SIZE = Math.min(windowWidth - 32, 400);
export const SQUARE_SIZE = BOARD_SIZE / 8;
