import {
  VStack,
  Input,
  Button,
  Heading,
  useToast,
  FormControl,
  FormErrorMessage,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";

const SignUpPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/i;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Email must end in @gmail.com, @hotmail.com, etc.";
    }

    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
  if (!validate()) return;

  try {
    const { data } = await api.post("/auth/signup", form);

    toast({
      title: "Signup successful",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/login");
  } catch (err) {
    toast({
      title: "Signup Failed",
      description: err.response?.data?.message || err.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};

  const bgColor = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.100", "gray.900");

  return (
    <>
    <Flex justify="center" align="center" minH="90vh" bg={pageBg}>
      <Box
        bg={bgColor}
        p={10}
        rounded="md"
        boxShadow="lg"
        width={{ base: "90%", sm: "400px" }}
      >
        <VStack spacing={5}>
          <Heading size="lg">Sign Up</Heading>

          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="Email (e.g. yourname@gmail.com)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <Input
              type="password"
              placeholder="Password (min 8 characters)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Button colorScheme="blue" width="full" onClick={handleSignup}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Flex>
      <Box textAlign="center" mt={4} mb={10} color="gray.500">
        Made by Ali Maqsood &copy; 2025
      </Box>
    </>
  );
};

export default SignUpPage;
