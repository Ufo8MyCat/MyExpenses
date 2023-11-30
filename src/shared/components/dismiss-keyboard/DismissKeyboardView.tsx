import React from "react";
import { TouchableWithoutFeedback, Keyboard, ViewProps } from "react-native";

// Define the HOC type
type WithKeyboardDismissProps<T extends ViewProps> = T;

// Define the HOC function
function withKeyboardDismiss<T extends ViewProps>(
  WrappedComponent: React.ComponentType<T>,
) {
  return class WithKeyboardDismiss extends React.Component<
    WithKeyboardDismissProps<T>
  > {
    render() {
      // Extract the props of the wrapped component
      const { ...props } = this.props;

      const onPress = ()=> {
        console.log('heheheehe')
      }

      return (
        <TouchableWithoutFeedback onPress={onPress} accessible={false}>
          <WrappedComponent {...props} />
        </TouchableWithoutFeedback>
      );
    }
  };
}

export default withKeyboardDismiss;
