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
      const res = await fetch("http://localhost:5050/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Signup Failed",
          description: data.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Signup successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (err) {
      toast({
        title: "Network Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.100", "gray.900");

  return (
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
  );
};

export default SignUpPage;
