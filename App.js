import { StyleSheet, Text, View } from "react-native";
import { Svg, Defs, Circle, Rect, Mask } from "react-native-svg";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const CIRCLE_SIZE = 200;
const MINUTE_SIZE = 20;
const MINUTE_LAYER = 80;

const MINUTES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const rotationValue = useSharedValue(0);

  useEffect(() => {
    rotationValue.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.linear }),
      -1
    );
  }, []);

  const minutesStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: interpolate(rotationValue.value, [0, 1], [100, 300]) + "deg",
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, minutesStyle]}>
          {MINUTES.reverse().map((m, i) => {
            const dangle = 200 / MINUTES.length;
            const reqAngle = dangle * i;

            return (
              <Text
                key={m.toString()}
                style={[
                  styles.minute,
                  {
                    transform: [
                      { rotate: `${reqAngle}deg` },
                      { translateX: (CIRCLE_SIZE - MINUTE_LAYER) / 2 },
                      { translateY: (CIRCLE_SIZE - MINUTE_LAYER) / 2 },
                      // { rotate: `${reqAngle}deg` },

                      { rotate: `${45}deg` },
                    ],
                  },
                ]}
              >
                {m}
              </Text>
            );
          })}
        </Animated.View>
        <Svg
          height={CIRCLE_SIZE}
          width={CIRCLE_SIZE}
          style={{ position: "absolute" }}
        >
          <Defs>
            <Mask id="mask" x="0" y="0" height="100%" width="100%">
              <Circle r="50%" cx="50%" cy="50%" fill="#fff" />
              <Rect
                x={CIRCLE_SIZE - 105}
                y={CIRCLE_SIZE / 2 - 15}
                rx={15}
                height={30}
                width={100}
                fill="#000"
              />
            </Mask>
          </Defs>
          <Circle
            r="50%"
            cx="50%"
            cy="50%"
            fill="rgba(0, 0, 0, 0.5)"
            mask="url(#mask)"
            fill-opacity="0"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  circle: {
    flex: 1,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "black",
    // backgroundColor: "green"
  },
  minute: {
    height: MINUTE_SIZE,
    width: MINUTE_SIZE,
    fontSize: 20,
    // backgroundColor: "red",
    top: (CIRCLE_SIZE - MINUTE_SIZE) / 2,
    left: (CIRCLE_SIZE - MINUTE_SIZE) / 2,
    textAlign: "center",
    position: "absolute",
  },
});
