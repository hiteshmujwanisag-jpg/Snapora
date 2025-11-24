import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function LoginForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = () => {
    if (password.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <VStack className='mt-4'>
        <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500">
            Email is required !
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField
            type="password"
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500">
            At least 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <View className='flex items-center gap-3'>
      <Button
        className="w-full  mt-4 bg-main "
        size="md"
        variant="outline"
        onPress={handleSubmit}
      >
        <ButtonText className='!font-dmSemi'>Login</ButtonText>
      </Button>
      <Text className='font-dmSemi'>Or</Text>
      <Button
        className="w-full  bg-main "
        size="md"
        variant="outline"
        onPress={handleSubmit}
      >
        <ButtonText className='!font-dmSemi'>Sign Up</ButtonText>
      </Button>
      </View>
    </VStack>
  );
}
