import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import API from "../utils/ApiInstance";
import { LOGIN_USER } from "../constant/apiUrls";
import { setItem } from "../utils/storage";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slice/authSlice";

export default function LoginForm() {
  const [usernameoremail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post(LOGIN_USER, {
        usernameoremail,
        password,
      });
      console.log(response.data.success);
      if (response?.data?.success) {
        await setItem("token", response.data.token);
        await setItem("user", JSON.stringify(response.data.user));

        dispatch(
          loginSuccess({
            token: response.data.token,
            user: response.data.user,
          })
        );

        router.replace("/(app)/(tabs)/home");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("failed");
    }
  };

  return (
    <VStack className="mt-4 flex gap-3">
      <FormControl
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText className="text-xl">
            Username Or Email
          </FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="xl">
          <InputField
            className="placeholder:text-subtle "
            type="text"
            placeholder="Username or Email"
            value={usernameoremail}
            onChangeText={(text) => setUsernameEmail(text)}
          />
        </Input>
      </FormControl>
      <FormControl
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText className="text-xl">
            Password
          </FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="xl">
          <InputField
            className="placeholder:text-subtle"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <InputSlot className="px-3" onPress={togglePasswordVisibility}>
            <InputIcon
              as={showPassword ? Eye : EyeOff}
              className="text-black"
            />
          </InputSlot>
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>
      <View className="flex items-center gap-3 mt-3">
        <Button
          className="w-full !bg-primarySolid"
          size="xl"
          variant="outline"
          onPress={handleSubmit}
        >
          <ButtonText className="!font-dmSemi">Login</ButtonText>
        </Button>
      </View>
      <View className="flex-row items-center gap-2 justify-center mt-2">
        <Text className="font-dmMedium">Don't have an account?</Text>
        <Link href="/(auth)/register" className="underline font-dmBold">
          Sign Up
        </Link>
      </View>
    </VStack>
  );
}
