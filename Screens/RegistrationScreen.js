import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const onRegistration = () => {
    Alert.alert("Credentials", `${name} +${email} + ${password}`);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View
          style={{ ...styles.form, marginBottom: isShowKeyboard ? 32 : 43 }}
        >
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Логин"
            style={styles.input}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <TextInput
            value={email}
            onChangeText={emailHandler}
            placeholder="Адрес электронной почты"
            secureTextEntry={true}
            style={styles.input}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Пароль"
            secureTextEntry={true}
            style={styles.input}
            onFocus={() => setIsShowKeyboard(true)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={onRegistration}
        >
          <Text style={styles.textBtn}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", width: 375, height: 549 },
  title: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  wrapper: {
    flex: 1,
  },
  form: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 43,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
  },
  btn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 51,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});

export default RegistrationScreen;
