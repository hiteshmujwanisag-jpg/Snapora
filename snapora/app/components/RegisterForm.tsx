import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import API from "../utils/ApiInstance";
import { REGISTER_USER } from "../constant/apiUrls";
import { setItem } from "../utils/storage";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slice/authSlice";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post(REGISTER_USER, {
        username,
        password,
        email,
      });

      if (response?.data?.success) {
        await setItem("token", response.data.token);
        await setItem("user", JSON.stringify(response.data.user));

        dispatch(
          loginSuccess({ user: response.data.user, token: response.data.token })
        );

        router.replace("/(app)/(tabs)/home");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Failed");
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
            Username
          </FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="xl">
          <InputField
            className="placeholder:text-subtle"
            type="text"
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
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
          <FormControlLabelText className="text-xl">Email</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="xl">
          <InputField
            className="placeholder:text-subtle"
            type="text"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
            placeholder="Password"
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
          <ButtonText className="!font-dmSemi">Sign Up</ButtonText>
        </Button>
      </View>

      <View className="flex-row items-center gap-2 justify-center mt-2">
        <Text className="font-dmMedium">Already have an account?</Text>
        <Link href="/(auth)/login" className="underline font-dmBold">
          Login
        </Link>
      </View>
    </VStack>
  );
}
