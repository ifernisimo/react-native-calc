import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native";

const App = () => {
  const [a, setA] = useState("0");
  const [b, setB] = useState(null);
  const [action, setAction] = useState(null);
  const [numFlag, setNumFlag] = useState(false);
  const [result, setResult] = useState(null);
  const [memory, setMemory] = useState(0);
  const [memoryFlag, setMemoryFlag] = useState(false);

  const setters = (value) => {
    const operations = ["+", "-", "/", "*", "="];

    const isNumb = RegExp(/^[0-9]+$/);

    if (operations.includes(value)) {
      methods(value);
    } else if (value.match(isNumb)) {
      digits(value);
    } else if (value === ".") {
      a[a.length - 1] !== "%" && formating(".");
      if (numFlag) {
        b[b.length - 1] !== "%" && formating(".");
      }
    } else if (value === "%") {
      if (a && a > 0) {
        a[a.length - 1] !== "." && formating("%");
        if (numFlag) {
          b[b.length - 1] !== "." && formating("%");
        }
      }
    } else if (value === "ac") {
      ac();
    } else if (value === "mc") {
      setMemory("0");
    } else if (value === "mr") {
      alert(memory);
      if (memory === 0) {
        setMemory(a);
      } else {
        setMemoryFlag(!memoryFlag);
      }
    } else if (value === "mMinus") {
      setMemory(Number(memory) - Number(a));
    } else if (value === "mPlus") {
      setMemory(Number(memory) + Number(a));
    } else if (value === "invert") {
      if (!numFlag) {
        a > 0 ? setA(-Math.abs(a)) : setA(Math.abs(a));
      } else {
        b > 0 ? setB(-Math.abs(b)) : setB(Math.abs(b));
      }
    }
  };

  const digits = (value) => {
    setMemoryFlag(false);
    if (!numFlag) {
      if (a[1] !== ".") {
        if (a[a.length - 1] !== "%") {
          a[0] === "0" ? setA(value) : setA(a + value);
        }
      } else {
        setA(a + value);
      }
    } else {
      if (!b) {
        !b ? setB(value) : setB(b + value);
      } else {
        if (b[b.length - 1] !== "%") {
          setB(b + value);
        }
      }
    }
  };

  const formating = (symbol) => {
    if (!numFlag) {
      String(a).indexOf(symbol) === -1 && setA(a + symbol);
    } else {
      String(b).indexOf(symbol) === -1 && setB(b + symbol);
    }
  };

  const percentToNormalValue = () => {
    if (checkPerc(a) === true && checkPerc(b) === false) {
      setA(Number(parseInt(a) / 100));
    } else if (checkPerc(a) === true && checkPerc(b) === true) {
      setA(Number(parseInt(a) / 100));
      setB(Number(parseInt(b) / 100));
    } else if (checkPerc(a) === false && checkPerc(b) === true) {
      setB((a / 100) * Number(parseInt(b)));
    }
  };

  const checkPerc = (num) => {
    return String(num).indexOf("%") === -1 ? false : true;
  };
  percentToNormalValue();
  const methods = (value) => {
    if (value !== "=") {
      setNumFlag(true);
      setAction(value);
    }

    const newA = Number(a);
    const newB = Number(b);

    if (a && action && b) {
      setAction(value);
      switch (action) {

        case "+": {

          setA(newA + newB);

          break;
        }

        case "-": {

          setA(newA - newB);

          break;
        }

        case "*": {

          setA(newA * newB);

          break;
        }

        case "/": {

          setA(newA / newB);

          break;
        }

        default:
          return 0;
      }
      setNumFlag(false);
      resetVar();
    }
  };

  const ac = () => {
    setA("0");
    setB(null);
    setAction(null);
    setNumFlag(false);
    setResult(null);
    setMemory(0);
    setMemoryFlag(false);
  };

  const resetVar = () => {
    setB(null);
    setAction(null);
    setResult(null);
  };

  return (
    <View style={styles.calc}>
      <View style={styles.output}>
        {memoryFlag && <Text style={styles.memo}>MEMORY</Text>}
        {memoryFlag === false ? (
          <View style={styles.output}>
            <Text style={styles.btnText}>{a}</Text>
            <Text style={styles.btnText}>{action}</Text>
            <Text style={styles.btnText}>{b}</Text>
            <Text style={styles.btnText}>{result}</Text>
          </View>
        ) : (
          <Text style={styles.btnText}>{memory}</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => setters("ac")}>
            <View style={[styles.key, styles.gray]}>
              <Text style={styles.btnText}>AC</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("invert")}>
            <View style={[styles.key, styles.gray]}>
              <Text style={styles.btnText}>+/-</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("%")}>
            <View style={[styles.key, styles.gray]}>
              <Text style={styles.btnText}>%</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("/")}>
            <View style={[styles.key, styles.orange]}>
              <Text style={styles.btnText}>/</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => setters("mc")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>mc</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("mr")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>mr</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("mMinus")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>m-</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("mPlus")}>
            <View style={[styles.key, styles.orange]}>
              <Text style={styles.btnText}>m+</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => setters("7")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>7</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("8")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>8</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("9")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>9</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("*")}>
            <View style={[styles.key, styles.orange]}>
              <Text style={styles.btnText}>*</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => setters("4")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>4</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("5")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>5</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("6")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>6</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("-")}>
            <View style={[styles.key, styles.orange]}>
              <Text style={styles.btnText}>-</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => setters("1")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>1</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("2")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>2</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("3")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>3</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("+")}>
            <View style={[styles.key, styles.orange]}>
              <Text style={styles.btnText}>+</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => setters("0")}>
            <View style={[styles.key, styles.dark_gray, styles.long_key]}>
              <Text style={styles.btnText}>0</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters(".")}>
            <View style={[styles.key, styles.dark_gray]}>
              <Text style={styles.btnText}>,</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setters("=")}>
            <View style={[styles.key, styles.orange]}>
              <Text style={styles.btnText}>=</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default App;
